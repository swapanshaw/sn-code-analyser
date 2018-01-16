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
        $scope.errorMsg = response.data.body.error.detail + ". " + response.data.body.error.message;
      }
    });
  }

}]).controller('logoutCtrl', ['$location', '$cookies', function ($location, $cookies) {
  console.log('logout');
  $cookies.remove('userName');
  $location.path("/home");
}]).
controller('dashboardCtrl', ['$scope', 'bluePrintsService', function ($scope, bluePrintsService) {
  console.log('Daashboard Ctrl');
  $scope.blueprints = bluePrintsService.getEmployeebyName($scope.name)

  $scope.$on('myEvent', function (event, data) {
    switch (data.category) {
      case "LB":
        $scope.lb = data;
        break;
      case "WS":
        $scope.ws = data;
        break;
      case "AS":
        $scope.as = data;
        break;
      case "DB":
        $scope.db = data;
        break;
      default:
        break;
    }

    $scope.$apply();
  });

  $scope.handleDrop = function (item, bin) {
    //$scope.em
  }

  $scope.tabIndex = 0;
  //$scope.showTab();
  $scope.showTab = function (tabIndex) {
    $scope.tabIndex = tabIndex;
    var data = {
      date: ['2013-01-04 22:23:00', '2013-02-04 22:23:00', '2013-03-04 22:23:00', '2013-04-04 22:23:00'],
      close: [10, 30, 6, 25],
    }
    plotLine(data);
  }

}]);


function plotLine(d) {

  var data = {
    labels: d.date,
    datasets: [{
        label: "TeamA Score",
        data: d.close,
        backgroundColor: "blue",
        borderColor: "lightblue",
        fill: false,
        lineTension: 0,
        radius: 5
      },
      {
        label: "TeamB Score",
        data: [20, 35, 40, 60, 50],
        backgroundColor: "green",
        borderColor: "lightgreen",
        fill: false,
        lineTension: 0,
        radius: 5
      }
    ]
  };
  //options
  var options = {
    responsive: true,
    title: {
      display: true,
      position: "top",
      text: "Line Graph",
      fontSize: 18,
      fontColor: "#111"
    },
    legend: {
      display: true,
      position: "bottom",
      labels: {
        fontColor: "#333",
        fontSize: 16
      }
    }
  };

  var stackedLine = new Chart(document.getElementById("line-chart"), {
    type: 'line',
    data: data,
    options: options
  });
}

/**
 * isAutheticated
 * Controller utililty method to check wether user session exists or not
 */
var isAutheticated = function ($rootScope, $cookies) {
  let userName = $cookies.get('userName');
  if (userName) {
    $rootScope.userName = userName;
    return true;
  } else {
    return false;
  }
}