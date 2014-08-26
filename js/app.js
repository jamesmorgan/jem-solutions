(function () {
    'use strict';

// 3rd Party Dependencies and Libs
    var dependencies = [
        'ngRoute',
        'ngMessages'
    ];

// Application Internal Dependencies
    var appDependencies = [
        'myApp.controllers',
        'myApp.services',
        'myApp.directives',
        'myApp.topMenu'
    ];

    angular.module('myApp',
        appDependencies.concat(dependencies)
    ).
        config(function ($routeProvider, $locationProvider) {
            $routeProvider.
                when('/', {
                    templateUrl: 'partials/home.html',
                    controller: 'HomeCtrl'
                }).
                when('/about', {
                    templateUrl: 'partials/about.html',
                    controller: 'AboutCtrl'
                }).
                when('/contact', {
                    templateUrl: 'partials/contact.html',
                    controller: 'ContactCtrl'
                }).
                otherwise({
                    redirectTo: '/'
                });
            $locationProvider.html5Mode(true);
        });

}());