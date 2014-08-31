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

}

controllersModule.controller('ContactCtrl', ContactCtrl);