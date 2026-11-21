// sebastian.i-can-do.it: language URLs on a static S3 origin.
// CloudFront Function "portfolio-prod-viewer-request" (viewer request, distribution E3IBBG5UTPIXN0).
// Deploy: see infra/README.md.
// - page directories without the trailing slash ("/pl", "/privacy", "/pl/privacy") -> 301 with it
// - "?lng=pl|en" (old links) -> 301 to the language URL
// - any path ending in "/" serves that directory's index.html (S3 REST origin has no index documents)
var DIRECTORIES = { '/pl': true, '/privacy': true, '/pl/privacy': true };

function handler(event) {
  var request = event.request;
  var uri = request.uri;
  var lng = request.querystring.lng && request.querystring.lng.value;

  var redirect = function (location) {
    return {
      statusCode: 301,
      statusDescription: 'Moved Permanently',
      headers: { location: { value: location }, 'cache-control': { value: 'max-age=3600' } }
    };
  };

  if (lng === 'pl' && uri !== '/pl/') return redirect('/pl/');
  if (lng === 'en' && uri !== '/') return redirect('/');
  if (DIRECTORIES[uri]) return redirect(uri + '/');
  if (uri.endsWith('/')) request.uri = uri + 'index.html';
  return request;
}
