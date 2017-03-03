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
