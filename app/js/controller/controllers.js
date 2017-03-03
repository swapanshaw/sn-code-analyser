'use strict';

/* Controllers */

angular.module('snCodeAnalyserApp.controllers', ['snCodeAnalyserApp.services', 'ngCookies']).
  controller('homeCtrl', ['$scope', '$rootScope', '$cookies', function ($scope, $rootScope, $cookies) {
    console.log($cookies.get('userName'));
    $rootScope.hasLoggedIn = isAutheticated($rootScope, $cookies);
    console.log("hello from home");

  }]).
  controller('loginCtrl', ['$scope', '$rootScope', '$location', 'snServices', '$cookies', function ($scope, $rootScope, $location, snServices, $cookies) {
    $scope.login = function () {
      console.log('from login ctrl');
      $scope.hasError = false;
      $rootScope.hasLoggedIn = false;
      let userName = $scope.userName;
      let password = $scope.password;
      let instaceUrl = $scope.instanceUrl;
      snServices.login(instaceUrl, userName, password).then(function (response) {
        if (response.data.statusCode == 200) {
          console.log('Response : ', JSON.stringify(response));
          let userName = response.data.body.result[0].name;;
          $rootScope.userName = userName;
          $rootScope.hasLoggedIn = true;
          $cookies.put('userName', userName)
          $location.path('/home');
        } else {
          console.log('Response : ', JSON.stringify(response));
          $scope.hasError = true;
          $scope.errorMsg = response.data.body.error.detail + ". "+ response.data.body.error.message;
        }
      });
    }

  }]).controller('logoutCtrl', ['$location', '$cookies', function($location, $cookies){
      console.log('logout');
      $cookies.remove('userName');
      $location.path("/home");
  }]).
  controller('dashboardCtrl', ['$scope', '$rootScope','$cookies', function ($scope, $rootScope, $cookies) {
    console.log('Daashboard Ctrl');
    $rootScope.hasLoggedIn = isAutheticated($rootScope, $cookies);
  }]);

/**
 * isAutheticated
 * Controller utililty method to check wether user session exists or not
 */
  var isAutheticated = function($rootScope, $cookies){
    let userName = $cookies.get('userName');
    if(userName) {
      $rootScope.userName = userName;
      return true;
    }else{
      return false;
    }
  }
