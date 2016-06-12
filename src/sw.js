this.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open('v1').then(function (cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/app.css',
        '/app.js',
        '/images/intro.svg',
        '/images/josiah-burchard.jpg',
        '/images/semo.png',
        '/images/vintage-software.gif',
        '/images/panaceas-cloud.jpg',
        '/lib/js/jquery.min.js',
        '/lib/js/jquery.scrollex.min.js',
        '/lib/js/jquery.scrolly.min.js',
        '/lib/js/main.js',
        '/lib/js/util.js',
        '/lib/js/skel.min.js'
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