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


app.directive('appStores', function () {
  return {
    restrict: 'E',
    scope: {
      blueprint: '='
    },
    link: function ($scope, iElement, iAttrs) {
      console.log('link -- ');

      // iElement.on('click', function () {
      //   console.log('clicked' + $scope.blueprint.name)
      //   $scope.$emit('myEvent', $scope.blueprint);
      // })
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


app.directive('draggable', function () {
  return {
    scope: {
      blueprint: '='
    },

    link: function ($scope, element) {
      // this gives us the native JS object
      var el = element[0];

      el.draggable = true;

      el.addEventListener(
        'dragstart',
        function (e) {
          e.dataTransfer.effectAllowed = 'move';
          e.dataTransfer.setData('Text', this.id);
          this.classList.add('drag');
          return false;
        },
        false
      );

      el.addEventListener(
        'dragend',
        function (e) {
          this.classList.remove('drag');
          console.log('DRAGEED END' + $scope.blueprint.name)
          $scope.$emit('myEvent', $scope.blueprint);
          return false;
        },
        false
      );
    }
  }
});

app.directive('droppable', function () {
    return {
      scope: {
        drop: '&',
        bin: '='
      },
      link: function ($scope, element, iAttrs) {
        // again we need the native object
        var el = element[0];

        el.addEventListener(
          'dragover',
          function (e) {
            e.dataTransfer.dropEffect = 'move';
            // allows us to drop
            if (e.preventDefault) e.preventDefault();
            this.classList.add('over');
            return false;
          },
          false
        );

        el.addEventListener(
          'dragenter',
          function (e) {
            this.classList.add('over');
            return false;
          },
          false
        );

        el.addEventListener(
          'dragleave',
          function (e) {
            this.classList.remove('over');
            return false;
          },
          false
        );

        el.addEventListener(
          'drop',
          function (e) {
            // Stops some browsers from redirecting.
            if (e.stopPropagation) e.stopPropagation();
            this.classList.remove('over');
            return false;
          },
          false
        );
      }
    }
  })

  .directive('line', function () {

    var directiveDefinitionObject = {

      restrict: 'E',
      replace: false,
      scope: {
        data: '=',
        width: '@',
        height: '@'
      },
      link: function ($scope, element, attrs) {
        console.log('executing link function' + JSON.stringify($scope.data))
        //This is the accessor function we talked about above

        var lineFunction = d3.line
          .x(function (d) {
            console.log('---' + d.month)
            return (d.month * 25);
          })
          .y(function (d) {
            return ($scope.height - d.sales);
          }).interpolate("linear");

        //The SVG Container
        var svgContainer = d3.select(element[0]).append("svg")
          .attr("width", $scope.width)
          .attr("height", $scope.height);

        //The line SVG Path we draw
        var lineGraph = svgContainer.append("path")
          .attr("d", lineFunction($scope.data))
          .attr("stroke", "#ddd")
          .attr("stroke-width", 2)
          .attr("fill", "none");

        var level = svgContainer.selectAll('text')
          .data($scope.data)
          .enter()
          .append('text')
          .text(function (d) {
            return d.sales
          })
          .attr({
            x: function (d) {
              return d.month * 25
            },
            y: function (d) {
              return $scope.height - d.sales
            }
          })
      }
    };
    return directiveDefinitionObject;
  });