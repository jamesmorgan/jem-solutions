'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function ContactCtrl() {

    // ViewModel
    var vm = this;

    vm.form = {};

}

controllersModule.controller('ContactCtrl', ContactCtrl);