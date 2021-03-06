'use strict';

var angular = require('angular');

// angular modules
require('angular-ui-router');
require('angular-messages');
require('firebase');
require('angularfire');
require('angular-bootstrap');
require('./templates');
require('./controllers/_index');
require('./services/_index');
require('./directives/_index');
require('./version/_index');

// create and bootstrap application
angular.element(document).ready(function () {

    var requires = [
        'ui.router',
        'firebase',
        'templates',
        'ngMessages',
        'ui.bootstrap',
        'app.controllers',
        'app.services',
        'app.directives',
        'app.appVersion'
    ];

    angular.module('app', requires);

    angular.module('app').constant('AppSettings', require('./constants'));

    angular.module('app').config(require('./routes'));

    angular.module('app').run(require('./on_run'));

    angular.bootstrap(document, ['app']);

});