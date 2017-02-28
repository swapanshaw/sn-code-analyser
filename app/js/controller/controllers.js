'use strict';

/* Controllers */

angular.module('snCodeAnalyserApp.controllers', []).
  controller('snCodeAnalyserAppCtrl', function ($scope, $http) {

    $http({
      method: 'GET',
      url: '/api/name'
    }).
      success(function (data, status, headers, config) {
        $scope.name = data.name;
      }).
      error(function (data, status, headers, config) {
        $scope.name = 'Error!';
      });

  }).
  controller('homeCtrl', function ($scope) {
    console.log("hello from home");

  }).
  controller('loginCtrl', function ($scope) {
    console.log('from login ctrl');
  });
