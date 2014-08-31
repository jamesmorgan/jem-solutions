'use strict';

var angular = require('angular');

module.exports = angular.module('app.appVersion', []);

// Define the list of services here
require('./Version.js');
require('./AppVersion.js');