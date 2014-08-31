'use strict';

/**
 * @ngInject
 */
function Routes($stateProvider, $locationProvider, $urlRouterProvider) {

    $locationProvider.html5Mode(true);

    $stateProvider
        .state('Home', {
            url: '/',
            controller: 'HomeCtrl as home',
            templateUrl: 'partials/home.html',
            title: 'Home'
        })
        .state('About', {
            url: '/about',
            controller: 'AboutCtrl as about',
            templateUrl: 'partials/about.html',
            title: 'Home'
        })
        .state('Contact', {
            url: '/contact',
            controller: 'ContactCtrl as contact',
            templateUrl: 'partials/contact.html',
            title: 'Home'
        });

    $urlRouterProvider.otherwise('/');

}

module.exports = Routes;
