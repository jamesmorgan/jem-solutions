'use strict';

/**
 * @ngInject
 */
function Routes($stateProvider, $urlRouterProvider) {

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
            title: 'About'
        })
        .state('Contact', {
            url: '/contact',
            controller: 'ContactCtrl as contact',
            templateUrl: 'partials/contact.html',
            title: 'Contact'
        });

    $urlRouterProvider.otherwise('/');

}

module.exports = Routes;
