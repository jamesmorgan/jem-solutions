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

    this.menuClass = function (page) {
        var currentRoute = $location.path().substring(1) || 'home';
        return page === currentRoute ? 'active' : '';
    };

}

controllersModule.controller('NavMenuCtrl', NavMenuCtrl);