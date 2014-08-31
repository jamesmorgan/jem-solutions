'use strict';

var versionModule = require('./_index.js');

/**
 * @ngInject
 */
function appVersion(version) {
    return function (scope, elm, attrs) {
        elm.text(version);
    };
}

versionModule.directive('appVersion', appVersion);