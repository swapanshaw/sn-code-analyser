'use strict';

// Declare app level module which depends on filters, and services

var app = angular.module('snCodeAnalyserApp', ['ngRoute', 'snCodeAnalyserApp.controllers']);

app.config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/login', {
      templateUrl: '../pages/login.html',
      controller: 'loginCtrl'
    }).
    when('/logout', {
      templateUrl: '../pages/login.html',
      controller: 'logoutCtrl'
    }).
    when('/dashboard', {
      templateUrl: '../pages/dashboard.html',
      controller: 'dashboardCtrl'
    }).
    when('/', {
      templateUrl: '../pages/home.html',
      controller: 'homeCtrl'
    }).
    otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
});


app.directive('appStores', function() {
  return {
    restrict: 'E',
    scope: {
      blueprint: '='
    },
    link: function($scope, iElement, iAttrs) {
      console.log('link -- ');

      iElement.on('click', function(){
        console.log('clicked' + $scope.blueprint.name)
        $scope.$emit('myEvent',$scope.blueprint);
      })
    },

    template: `
        <div class="blueprint-container">
          <div class="row" ng-click="show()">
            <div class="col-sm-6"><img src={{blueprint.imgUrl}} alt="Avatar" width="100%"> </div>
            <div class="col-sm-6"><p class="content">{{blueprint.name}}</p>
          </div>
        </div>
      `
  }
});