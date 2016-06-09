this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
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

self.addEventListener('fetch', function(event) {
  if (event.request.url.indexOf('http') === -1) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        if (response) {
          return response;
        }

        return fetch(event.request).then(function(response) {
          caches.open('v1').then(function(cache) {
            cache.put(event.request, response);
          })
          .catch(undefined);

          return response;
        }).catch(undefined);
      })
    );
  }
});