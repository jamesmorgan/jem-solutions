'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
    controller('HomeCtrl', function ($scope) {

    }).
    controller('AboutCtrl', function ($scope) {

    }).
    controller('ContactCtrl', function ($scope) {

    });

angular.module('myApp.topMenu', []).
    controller('NavMenuCtrl', function ($scope, $location) {
        this.headText = '...';

        this.menuLinks = [
            {link: 'home', text: 'Home'},
            {link: 'about', text: 'About'},
            {link: 'contact', text: 'Contact'}
        ];

        this.menuClass = function (page) {
            var currentRoute = $location.path().substring(1) || 'home';
            return page === currentRoute ? 'active' : '';
        };
    });