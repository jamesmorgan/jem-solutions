'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function ContactCtrl($window, $firebaseArray) {

    var ref = $firebaseArray(new $window.Firebase('https://jem-solutions.firebaseio.com/contact-form/incoming-queue'));

    // ViewModel
    var vm = this;

    vm.form = {
        subject: 'JEM Solutions Site Contact Form',
        datetime: Date.now()
    };

    this.sendEmail = function () {
        ref.$add(vm.form)
            .then(function () {
                vm.form = {
                    subject: 'JEM Solutions Site Contact Form',
                    datetime: Date.now()
                };
                alert('Message sent, I will reply as soon as I can');
            });
    };

}

controllersModule.controller('ContactCtrl', ContactCtrl);