'use strict';

/* Directives */

angular.module('snCodeAnalyserApp.directives', [])
  .directive('appVersion', function (version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  });
