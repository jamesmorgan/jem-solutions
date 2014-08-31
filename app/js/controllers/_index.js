'use strict';

var angular = require('angular');

module.exports = angular.module('app.controllers', []);

// Define the list of controllers here
require('./HomeCtrl.js');
require('./AboutCtrl.js');
require('./ContactCtrl.js');
require('./NavMenuCtrl.js');