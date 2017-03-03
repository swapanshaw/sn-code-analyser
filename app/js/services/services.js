'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('snCodeAnalyserApp.services', [])
  .service('snServices', ['$http', function ($http) {
    this.login = function (instaceUrl, userName, password) {
      let promise = $http({
        method: 'GET',
        url: '/api/login',
        headers: {
          'instanceurl': instaceUrl,
          'username': userName,
          'password': password
        }
      }).then(function sucess(response) {
        return response;
      },
        function error(err) {

        });

      return promise;
    }
  }]);
