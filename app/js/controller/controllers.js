'use strict';

/* Controllers */

angular.module('snCodeAnalyserApp.controllers', ['snCodeAnalyserApp.services', 'ngCookies']).
  controller('homeCtrl', function ($scope) {
    console.log("hello from home");

  }).
  controller('loginCtrl', ['$scope', '$rootScope', '$location', 'snServices', '$cookies', function ($scope, $rootScope, $location, snServices, $cookies) {
    $scope.login = function () {
      console.log('from login ctrl');
      $rootScope.loggedIn = false;
      let userName = $scope.userName;
      let password = $scope.password;
      let instaceUrl = $scope.instanceUrl;
      snServices.login(instaceUrl, userName, password).then(function (response) {
        console.log(response.data.body.result[0].name);
        let userName = response.data.body.result[0].name;;
        $rootScope.userName = userName;
        $rootScope.loggedIn = true;
        $cookies.put('userName', userName)
        $location.path('/home');
        console.log('Response : ', JSON.stringify(response.data));
      });
    }
  }])
  .controller('dashboardCtrl', ['$scope', function ($scope) {

  }]);
