(function() {
    'use strict';

    angular
        .module('jburchard', ['ngRoute'])
        .config(config);

    config.$inject = ['$locationProvider', '$routeProvider'];
    function config($locationProvider, $routeProvider) {
        $locationProvider.html5Mode(true);

        $routeProvider
            .when('/about',
            {
                templateUrl: 'views/about.html'
            })
            .when('/gulp',
            {
                templateUrl: 'views/gulp.html'
            })
            .otherwise(
            {
                redirectTo: '/about.html'
            });
    }
}());