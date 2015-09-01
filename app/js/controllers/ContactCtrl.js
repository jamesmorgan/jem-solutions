'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function ContactCtrl() {

    // ViewModel
    var vm = this;

    vm.title = 'Test Title';
    vm.number = 1234;

    vm.form = {

    }

}

controllersModule.controller('ContactCtrl', ContactCtrl);