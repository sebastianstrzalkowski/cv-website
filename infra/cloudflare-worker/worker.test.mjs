// Run: node --test infra/cloudflare-worker/worker.test.mjs
import assert from 'node:assert/strict';
import { beforeEach, test } from 'node:test';
import worker, { contactSection, markdownPathFor, prefersMarkdown } from './src/worker.js';

const SITE = 'https://sebastian.i-can-do.it';
const CV_MD = '# Sebastian\n\nIntro\n\n## Contact\n\n- Email: a@b.c\n- X: https://x.com/x\n\n## Experience\n\nStuff\n';

// Fake origin: what CloudFront + S3 would answer.
const ORIGIN = {
  '/': ['<!DOCTYPE html><html>en</html>', 'text/html; charset=utf-8'],
  '/index.md': [CV_MD, 'text/markdown; charset=utf-8'],
  '/pl/index.md': ['# Sebastian (PL)\n', 'text/markdown; charset=utf-8'],
  '/llms.txt': ['# llms\n', 'text/plain; charset=utf-8'],
};
let originCalls;
beforeEach(() => {
  originCalls = [];
  globalThis.fetch = async (input) => {
    const url = new URL(typeof input === 'string' ? input : input.url);
    originCalls.push(url.pathname);
    const hit = ORIGIN[url.pathname];
    if (!hit) return new Response('<html>404</html>', { status: 404, headers: { 'content-type': 'text/html; charset=utf-8' } });
    return new Response(hit[0], { headers: { 'content-type': hit[1], vary: 'Accept-Encoding' } });
  };
});

const get = (path, headers = {}) => worker.fetch(new Request(`${SITE}${path}`, { headers }));
const rpc = (body, headers = {}) =>
  worker.fetch(
    new Request(`${SITE}/mcp`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', accept: 'application/json, text/event-stream', ...headers },
      body: JSON.stringify(body),
    })
  );

test('prefersMarkdown follows q-values and order', () => {
  assert.equal(prefersMarkdown('text/markdown'), true);
  assert.equal(prefersMarkdown('text/markdown, text/html;q=0.9'), true);
  assert.equal(prefersMarkdown('text/html, text/markdown'), false);
  assert.equal(prefersMarkdown('text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'), false);
  assert.equal(prefersMarkdown('*/*'), false);
  assert.equal(prefersMarkdown(null), false);
  assert.equal(prefersMarkdown('text/markdown;q=0'), false);
});

test('markdownPathFor maps pages only', () => {
  assert.equal(markdownPathFor('/'), '/index.md');
  assert.equal(markdownPathFor('/pl/privacy/'), '/pl/privacy/index.md');
  assert.equal(markdownPathFor('/index.html'), '/index.md');
  assert.equal(markdownPathFor('/favicon.ico'), null);
});

test('homepage with Accept: text/markdown returns the Markdown twin', async () => {
  const res = await get('/', { accept: 'text/markdown' });
  assert.equal(res.status, 200);
  assert.match(res.headers.get('content-type'), /^text\/markdown/);
  assert.match(res.headers.get('vary'), /Accept/);
  assert.equal(await res.text(), CV_MD);
});

test('homepage for a browser stays HTML and gains Vary: Accept and a Markdown link', async () => {
  const res = await get('/', { accept: 'text/html,*/*;q=0.8' });
  assert.match(res.headers.get('content-type'), /^text\/html/);
  assert.equal(res.headers.get('vary'), 'Accept-Encoding, Accept');
  assert.match(res.headers.get('link'), /index\.md>; rel="alternate"; type="text\/markdown"/);
  assert.match(await res.text(), /<html>/);
});

test('missing page with Accept: text/markdown is a Markdown 404', async () => {
  const res = await get('/nope', { accept: 'text/markdown' });
  assert.equal(res.status, 404);
  assert.match(res.headers.get('content-type'), /^text\/markdown/);
  const body = await res.text();
  assert.match(body, /# 404 Not Found/);
  assert.match(body, /llms\.txt/);
});

test('missing page for a browser keeps the HTML 404', async () => {
  const res = await get('/nope', { accept: 'text/html' });
  assert.equal(res.status, 404);
  assert.match(res.headers.get('content-type'), /^text\/html/);
});

test('non-page assets pass through untouched', async () => {
  const res = await get('/llms.txt', { accept: 'text/markdown' });
  assert.equal(res.headers.get('content-type'), 'text/plain; charset=utf-8');
  assert.equal(res.headers.get('vary'), 'Accept-Encoding');
});

test('MCP initialize negotiates the protocol version', async () => {
  const res = await rpc({ jsonrpc: '2.0', id: 1, method: 'initialize', params: { protocolVersion: '2025-06-18', capabilities: {}, clientInfo: { name: 't', version: '1' } } });
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.result.protocolVersion, '2025-06-18');
  assert.equal(body.result.serverInfo.name, 'sebastian-strzalkowski-cv');
  assert.ok(body.result.capabilities.tools);

  const unknown = await (await rpc({ jsonrpc: '2.0', id: 2, method: 'initialize', params: { protocolVersion: '1999-01-01' } })).json();
  assert.equal(unknown.result.protocolVersion, '2025-11-25');
});

test('MCP notification gets 202 and no body', async () => {
  const res = await rpc({ jsonrpc: '2.0', method: 'notifications/initialized' });
  assert.equal(res.status, 202);
  assert.equal(await res.text(), '');
});

test('MCP tools/list and tools/call', async () => {
  const list = await (await rpc({ jsonrpc: '2.0', id: 3, method: 'tools/list' })).json();
  assert.deepEqual(list.result.tools.map((t) => t.name), ['get_cv', 'get_contact']);

  const cv = await (await rpc({ jsonrpc: '2.0', id: 4, method: 'tools/call', params: { name: 'get_cv', arguments: { language: 'pl' } } })).json();
  assert.equal(cv.result.content[0].text, '# Sebastian (PL)\n');

  const contact = await (await rpc({ jsonrpc: '2.0', id: 5, method: 'tools/call', params: { name: 'get_contact', arguments: {} } })).json();
  assert.match(contact.result.content[0].text, /Email: a@b\.c/);
  assert.doesNotMatch(contact.result.content[0].text, /Experience/);

  const bad = await (await rpc({ jsonrpc: '2.0', id: 6, method: 'tools/call', params: { name: 'get_cv', arguments: { language: 'de' } } })).json();
  assert.equal(bad.result.isError, true);

  const unknown = await (await rpc({ jsonrpc: '2.0', id: 7, method: 'tools/call', params: { name: 'nope' } })).json();
  assert.equal(unknown.error.code, -32602);
});

test('MCP errors: unknown method, parse error, GET', async () => {
  const unknown = await (await rpc({ jsonrpc: '2.0', id: 8, method: 'foo/bar' })).json();
  assert.equal(unknown.error.code, -32601);

  const parse = await worker.fetch(new Request(`${SITE}/mcp`, { method: 'POST', body: '{oops' }));
  assert.equal(parse.status, 400);
  assert.equal((await parse.json()).error.code, -32700);

  const getRes = await get('/mcp');
  assert.equal(getRes.status, 405);
  assert.equal(getRes.headers.get('allow'), 'POST, OPTIONS');
});

test('MCP resources/read fetches from the origin', async () => {
  const res = await (await rpc({ jsonrpc: '2.0', id: 9, method: 'resources/read', params: { uri: `${SITE}/llms.txt` } })).json();
  assert.equal(res.result.contents[0].text, '# llms\n');
});

test('discovery documents', async () => {
  const card = await get('/mcp/server-card');
  assert.match(card.headers.get('content-type'), /application\/mcp-server-card\+json/);
  assert.equal((await card.json()).remotes[0].url, `${SITE}/mcp`);

  const wellKnown = await get('/.well-known/mcp/server-card.json');
  assert.equal(wellKnown.status, 200);

  const catalog = await (await get('/.well-known/ai-catalog.json')).json();
  assert.equal(catalog.entries[0].url, `${SITE}/mcp/server-card`);
});

test('contactSection stops at the next heading or the end', () => {
  assert.equal(contactSection(CV_MD), '- Email: a@b.c\n- X: https://x.com/x');
  assert.equal(contactSection('## Contact\n\n- only\n'), '- only');
});
