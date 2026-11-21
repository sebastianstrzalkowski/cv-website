# Edge infrastructure

Request path: **Cloudflare** (zone `i-can-do.it`, proxied) → **CloudFront** (`E3IBBG5UTPIXN0`) → **S3** (`portfolio-prod-cdn-origin`).
The GitHub workflow deploys only the S3 content. The two edge pieces below are deployed by hand.

## `cloudflare-worker/`: agent gateway

Worker `cv-agent-gateway` on route `sebastian.i-can-do.it/*`:

- `Accept: text/markdown` on a page (`/`, `/pl/`, `/privacy/`, `/pl/privacy/`) returns its `index.md` with `Vary: Accept`;
  browsers keep getting HTML, which now also carries `Vary: Accept` and a `Link: rel="alternate"; type="text/markdown"` header.
- 404 for a Markdown request returns a Markdown body that links to the CV, `llms.txt` and the sitemap.
- `/mcp`: read-only MCP server (Streamable HTTP, stateless, no auth). Tools `get_cv` and `get_contact`, resources for the Markdown CVs.
- `/mcp/server-card`, `/.well-known/mcp/server-card.json`, `/.well-known/ai-catalog.json`: discovery.

All CV content is read from the origin at request time, so a site deploy never needs a Worker deploy.

```sh
node --test infra/cloudflare-worker/worker.test.mjs   # tests with a fake origin
cd infra/cloudflare-worker && npx wrangler deploy       # deploy (or upload via the Cloudflare API)
```

Check after deploy:

```sh
curl -sI -H 'Accept: text/markdown' https://sebastian.i-can-do.it/            # text/markdown, Vary: Accept
curl -s  -H 'Accept: text/markdown' https://sebastian.i-can-do.it/missing     # Markdown 404
curl -s  -X POST https://sebastian.i-can-do.it/mcp -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
```

## `cloudfront/viewer-request.js`: URL routing

CloudFront Function `portfolio-prod-viewer-request`: 301 for page directories without the trailing slash and for old `?lng=` links,
and `…/` → `…/index.html` (the S3 REST origin has no index documents).

```sh
ETAG=$(aws --profile sebastian-priv cloudfront describe-function --name portfolio-prod-viewer-request --query ETag --output text)
aws --profile sebastian-priv cloudfront update-function --name portfolio-prod-viewer-request --if-match "$ETAG" \
  --function-config Comment="Language URLs and directory index for sebastian.i-can-do.it",Runtime=cloudfront-js-2.0 \
  --function-code fileb://infra/cloudfront/viewer-request.js
ETAG=$(aws --profile sebastian-priv cloudfront describe-function --name portfolio-prod-viewer-request --query ETag --output text)
aws --profile sebastian-priv cloudfront publish-function --name portfolio-prod-viewer-request --if-match "$ETAG"
```

When adding a new page directory, add it to `DIRECTORIES` in the function and publish it.
