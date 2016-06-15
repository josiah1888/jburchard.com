this.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open('v1').then(function (cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/images/intro.svg',
        '/images/josiah-burchard.jpg',
        '/images/semo.png',
        '/images/vintage-software.gif',
        '/images/panaceas-cloud.jpg',
        '/lib/js/all.js',
        '/lib/fonts/fontawesome-webfont.eot?v=4.6.3',
        '/lib/fonts/fontawesome-webfont.svg?v=4.6.3',
        '/lib/fonts/fontawesome-webfont.woff?v=4.6.3',
        '/lib/fonts/fontawesome-webfont.woff2?v=4.6.3',
        '/lib/fonts/fontawesome-webfont.ttf?v=4.6.3'
      ]);
    }).catch(undefined)
  );
});

this.addEventListener('fetch', function (event) {
  if (event.request.url.indexOf('https://www.google-analytics.com/collect') === -1) {
    // Doesn't get a well formatted response
    event.respondWith(
      caches.match(event.request).then(function (response) {
        if (response) {
          fetchForCache(event.request);
          return response;
        } else {
          return fetchForCache(event.request);
        }
      }).catch(undefined)
    );
  }
});

function fetchForCache(request) {
  return fetch(request)
    .then(function (response) {
      return updateCache(request, response);
    })
    .catch(undefined);
}

function updateCache(request, response) {
  caches.open('v1')
    .then(function (cache) {
      cache.put(request, response);
    });

  return response;
}