'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function NavMenuCtrl($location) {

    // ViewModel
    var vm = this;
    vm.menuLinks = [
        {link: '#/', text: 'Home'},
        {link: '#/about', text: 'About'},
        {link: 'http://www.morgan-design.com', text: 'Blog', external: true},
        {link: '#/contact', text: 'Contact'}
    ];

    this.isActive = function (page) {
        var currentRoute = $location.path().substring(1) || 'home';
        return (page || "").indexOf(currentRoute) != -1;
    };

}

controllersModule.controller('NavMenuCtrl', NavMenuCtrl);