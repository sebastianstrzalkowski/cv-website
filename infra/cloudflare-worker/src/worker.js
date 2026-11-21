// Cloudflare Worker in front of sebastian.i-can-do.it (route sebastian.i-can-do.it/*).
// The site itself stays static on CloudFront + S3; this Worker only adds what agents need:
//   1. Markdown content negotiation: `Accept: text/markdown` on a page returns its Markdown twin
//      (/ -> /index.md, /pl/ -> /pl/index.md, /privacy/ -> /privacy/index.md ...), with Vary: Accept.
//   2. A Markdown body for 404s when the client asked for Markdown (status stays 404).
//   3. A read-only MCP server at /mcp (Streamable HTTP, stateless, JSON responses, no auth),
//      plus its server card and the domain's AI catalog for discovery.
// Fetches to the Worker's own zone go straight to the origin, so the Markdown always comes from
// the files the build published; nothing about the CV is duplicated here.

const SITE = 'https://sebastian.i-can-do.it';
const NAME = 'Sebastian Strzałkowski';

const SERVER_INFO = { name: 'sebastian-strzalkowski-cv', title: `${NAME} CV`, version: '1.0.0' };
const SUPPORTED_PROTOCOLS = ['2025-11-25', '2025-06-18', '2025-03-26'];

const CORS = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, OPTIONS',
  'access-control-allow-headers': 'content-type, accept, mcp-protocol-version, mcp-session-id, last-event-id',
  'access-control-expose-headers': 'mcp-protocol-version',
};

// --- Content negotiation -------------------------------------------------------------------

// Highest q per media type, plus the order the client listed them in (first wins a tie).
const parseAccept = (header) =>
  (header || '')
    .split(',')
    .map((part, index) => {
      const [type, ...params] = part.trim().toLowerCase().split(';');
      const q = params.map((p) => p.trim()).find((p) => p.startsWith('q='));
      const quality = q ? Number.parseFloat(q.slice(2)) : 1;
      return { type: type.trim(), q: Number.isNaN(quality) ? 0 : quality, index };
    })
    .filter((entry) => entry.type);

const best = (entries, types) =>
  entries
    .filter((entry) => types.includes(entry.type))
    .reduce((top, entry) => (!top || entry.q > top.q ? entry : top), null);

// Markdown only when the client names it and prefers it to HTML. Browsers never send text/markdown,
// so they keep getting HTML; "*/*" alone keeps HTML too.
export const prefersMarkdown = (acceptHeader) => {
  const entries = parseAccept(acceptHeader);
  const markdown = best(entries, ['text/markdown', 'text/x-markdown']);
  if (!markdown || markdown.q <= 0) return false;
  const html = best(entries, ['text/html', 'application/xhtml+xml']);
  if (!html) return true;
  return markdown.q > html.q || (markdown.q === html.q && markdown.index < html.index);
};

// Page URL -> its Markdown file, or null when the path is not a page.
export const markdownPathFor = (pathname) => {
  if (pathname.endsWith('/')) return `${pathname}index.md`;
  if (pathname.endsWith('/index.html')) return pathname.replace(/index\.html$/, 'index.md');
  return null;
};

const appendVary = (headers, value) => {
  const current = headers.get('vary');
  const parts = (current || '').split(',').map((part) => part.trim().toLowerCase()).filter(Boolean);
  if (!parts.includes(value.toLowerCase())) headers.set('vary', current ? `${current}, ${value}` : value);
};

const notFoundMarkdown = (pathname) => `# 404 Not Found

There is no page at \`${pathname.replace(/`/g, '')}\` on sebastian.i-can-do.it.

This is the personal CV site of ${NAME}. Try one of these instead:

- [CV in English (Markdown)](${SITE}/index.md)
- [CV po polsku (Markdown)](${SITE}/pl/index.md)
- [CV (PDF)](${SITE}/CV_Sebastian_Strzalkowski.pdf)
- [Index for agents (llms.txt)](${SITE}/llms.txt)
- [Sitemap](${SITE}/sitemap.xml)
- [MCP server](${SITE}/mcp)
`;

const markdownResponse = (body, status, method, extraHeaders = {}) =>
  new Response(method === 'HEAD' ? null : body, {
    status,
    headers: {
      'content-type': 'text/markdown; charset=utf-8',
      'cache-control': 'no-cache',
      vary: 'Accept',
      'x-content-type-options': 'nosniff',
      ...extraHeaders,
    },
  });

const handlePage = async (request, url) => {
  const isRead = request.method === 'GET' || request.method === 'HEAD';
  const wantsMarkdown = isRead && prefersMarkdown(request.headers.get('accept'));
  const markdownPath = markdownPathFor(url.pathname);

  if (wantsMarkdown && markdownPath) {
    const origin = await fetch(`${SITE}${markdownPath}`, { headers: { accept: 'text/markdown' } });
    if (origin.ok) {
      return markdownResponse(await origin.text(), 200, request.method, {
        link: `<${SITE}${url.pathname}>; rel="canonical"`,
      });
    }
  }

  const response = await fetch(request);

  if (response.status === 404 && wantsMarkdown) {
    return markdownResponse(notFoundMarkdown(url.pathname), 404, request.method);
  }

  const type = response.headers.get('content-type') || '';
  if (!type.startsWith('text/html')) return response;

  // HTML pages vary on Accept now; pages with a Markdown twin also advertise it.
  const patched = new Response(response.body, response);
  appendVary(patched.headers, 'Accept');
  if (markdownPath && response.ok) {
    patched.headers.append('link', `<${SITE}${markdownPath}>; rel="alternate"; type="text/markdown"`);
  }
  return patched;
};

// --- MCP -----------------------------------------------------------------------------------

const TOOLS = [
  {
    name: 'get_cv',
    title: 'Get CV',
    description: `Full CV of ${NAME} as Markdown: current role, experience, projects, conference talks, trainings, education, technologies and contact details. Use it to answer questions about his background or to check facts before recommending or contacting him.`,
    inputSchema: {
      type: 'object',
      properties: {
        language: { type: 'string', enum: ['en', 'pl'], default: 'en', description: 'en = English, pl = Polish.' },
      },
      additionalProperties: false,
    },
    annotations: { title: 'Get CV', readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  },
  {
    name: 'get_contact',
    title: 'Get contact details',
    description: `How to reach ${NAME}: email, LinkedIn, GitHub, X and Telegram, plus links to the website and PDF CV. Email is the preferred channel for job, speaking and collaboration inquiries.`,
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
    annotations: { title: 'Get contact details', readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  },
];

const RESOURCES = [
  { uri: `${SITE}/index.md`, name: 'cv-en', title: 'CV (English)', mimeType: 'text/markdown' },
  { uri: `${SITE}/pl/index.md`, name: 'cv-pl', title: 'CV (Polish)', mimeType: 'text/markdown' },
  { uri: `${SITE}/llms.txt`, name: 'llms-txt', title: 'Site index for agents', mimeType: 'text/plain' },
];

const INSTRUCTIONS = `Read-only access to the CV of ${NAME}, Senior DLT Engineer & Blockchain Architect in Warsaw. Call get_cv for his background and get_contact for how to reach him. Draft messages for the user to send; this server cannot send anything.`;

class RpcError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }
}

const fetchText = async (path) => {
  const response = await fetch(`${SITE}${path}`, { headers: { accept: 'text/markdown, text/plain' } });
  if (!response.ok) throw new RpcError(-32603, `Could not load ${path} (HTTP ${response.status})`);
  return response.text();
};

// The "## Contact" section of the English Markdown CV.
export const contactSection = (markdown) => {
  const match = markdown.match(/^## Contact\n([\s\S]*?)(?=^## |(?![\s\S]))/m);
  return match ? match[1].trim() : '';
};

const callTool = async (name, args = {}) => {
  if (name === 'get_cv') {
    const language = args.language ?? 'en';
    if (!['en', 'pl'].includes(language)) {
      return { isError: true, content: [{ type: 'text', text: 'language must be "en" or "pl".' }] };
    }
    const text = await fetchText(language === 'pl' ? '/pl/index.md' : '/index.md');
    return { content: [{ type: 'text', text }] };
  }
  if (name === 'get_contact') {
    const contact = contactSection(await fetchText('/index.md'));
    const text = [
      `# Contact: ${NAME}`,
      '',
      contact,
      `- Website: ${SITE}/`,
      `- CV (PDF): ${SITE}/CV_Sebastian_Strzalkowski.pdf`,
      '',
      'Email is the preferred channel. Location: Warsaw, Poland. Languages: Polish, English.',
    ].join('\n');
    return { content: [{ type: 'text', text }] };
  }
  throw new RpcError(-32602, `Unknown tool: ${name}`);
};

const dispatch = async (message) => {
  const { method, params = {} } = message;
  switch (method) {
    case 'initialize': {
      const requested = params.protocolVersion;
      return {
        protocolVersion: SUPPORTED_PROTOCOLS.includes(requested) ? requested : SUPPORTED_PROTOCOLS[0],
        capabilities: { tools: { listChanged: false }, resources: { listChanged: false } },
        serverInfo: SERVER_INFO,
        instructions: INSTRUCTIONS,
      };
    }
    case 'ping':
      return {};
    case 'tools/list':
      return { tools: TOOLS };
    case 'tools/call':
      return callTool(params.name, params.arguments);
    case 'resources/list':
      return { resources: RESOURCES };
    case 'resources/templates/list':
      return { resourceTemplates: [] };
    case 'prompts/list':
      return { prompts: [] };
    case 'resources/read': {
      const resource = RESOURCES.find((r) => r.uri === params.uri);
      if (!resource) throw new RpcError(-32002, `Resource not found: ${params.uri}`);
      const text = await fetchText(new URL(resource.uri).pathname);
      return { contents: [{ uri: resource.uri, mimeType: resource.mimeType, text }] };
    }
    default:
      throw new RpcError(-32601, `Method not found: ${method}`);
  }
};

const handleMessage = async (message) => {
  const invalid = (id) => ({ jsonrpc: '2.0', id, error: { code: -32600, message: 'Invalid Request' } });
  if (!message || typeof message !== 'object') return invalid(null);
  if (!('method' in message)) return null; // a response from the client: nothing to answer
  if (message.jsonrpc !== '2.0' || typeof message.method !== 'string') return invalid(message.id ?? null);
  if (!('id' in message) || message.id === null) return null; // notification: no reply
  try {
    return { jsonrpc: '2.0', id: message.id, result: await dispatch(message) };
  } catch (error) {
    const code = error instanceof RpcError ? error.code : -32603;
    return { jsonrpc: '2.0', id: message.id, error: { code, message: error.message || 'Internal error' } };
  }
};

const json = (body, status = 200, headers = {}) =>
  new Response(JSON.stringify(body, null, 2), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...CORS, ...headers },
  });

const handleMcp = async (request) => {
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: { ...CORS, 'access-control-max-age': '86400' } });
  if (request.method !== 'POST') {
    // Stateless server: no SSE stream to open (GET) and no session to end (DELETE).
    return json(
      { error: 'Use POST with a JSON-RPC message (MCP Streamable HTTP).', server_card: `${SITE}/mcp/server-card` },
      405,
      { allow: 'POST, OPTIONS' }
    );
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ jsonrpc: '2.0', id: null, error: { code: -32700, message: 'Parse error' } }, 400);
  }

  const batch = Array.isArray(payload);
  const replies = (await Promise.all((batch ? payload : [payload]).map(handleMessage))).filter(Boolean);
  if (replies.length === 0) return new Response(null, { status: 202, headers: CORS });

  const isInitialize = !batch && payload.method === 'initialize';
  const version = isInitialize ? replies[0].result?.protocolVersion : request.headers.get('mcp-protocol-version');
  return json(batch ? replies : replies[0], 200, version ? { 'mcp-protocol-version': version } : {});
};

// --- Discovery documents -------------------------------------------------------------------

const SERVER_CARD = {
  $schema: 'https://static.modelcontextprotocol.io/schemas/v1/server-card.schema.json',
  name: 'it.i-can-do.sebastian/cv',
  title: SERVER_INFO.title,
  description: `Read-only CV of ${NAME}, Senior DLT Engineer & Blockchain Architect: experience, projects, talks and contact details.`,
  version: SERVER_INFO.version,
  websiteUrl: `${SITE}/`,
  remotes: [{ type: 'streamable-http', url: `${SITE}/mcp`, supportedProtocolVersions: SUPPORTED_PROTOCOLS }],
};

const AI_CATALOG = {
  specVersion: '1.0',
  entries: [
    {
      identifier: 'urn:air:sebastian.i-can-do.it:mcp:cv',
      type: 'application/mcp-server-card+json',
      url: `${SITE}/mcp/server-card`,
    },
  ],
};

const discovery = (request, body, contentType) => {
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });
  return new Response(request.method === 'HEAD' ? null : JSON.stringify(body, null, 2), {
    headers: { 'content-type': contentType, 'cache-control': 'public, max-age=3600', ...CORS },
  });
};

export default {
  async fetch(request) {
    const url = new URL(request.url);
    switch (url.pathname) {
      case '/mcp':
        return handleMcp(request);
      case '/mcp/server-card':
      case '/.well-known/mcp/server-card.json':
        return discovery(request, SERVER_CARD, 'application/mcp-server-card+json; charset=utf-8');
      case '/.well-known/ai-catalog.json':
        return discovery(request, AI_CATALOG, 'application/ai-catalog+json; charset=utf-8');
      default:
        return handlePage(request, url);
    }
  },
};
