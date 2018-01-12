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
  }])
    .factory('bluePrintsService', function() {
  return {
    getEmployeebyName: function(name) {
      
      var bluePrintArr = [
          {
            name: "F5 load balncer",
            description : "f5 load balncer for webapp",
            imgUrl: 'https://media.istockphoto.com/photos/the-spokane-river-centennial-trail-picture-id512597572',
            category: 'LB'
          },
          {
            name: "web app server",
            description : "Webapp server",
            imgUrl: 'https://media.istockphoto.com/photos/the-spokane-river-centennial-trail-picture-id512597572',
            category: 'WS'
          },
          {
            name: "Apache Tomcat",
            description : "Tomcate App Server",
            imgUrl: 'https://media.istockphoto.com/photos/the-spokane-river-centennial-trail-picture-id512597572',
            category: 'AS'
          },
          {
            name: "Mongo DB",
            description : "Mongo Db no sql databse",
            imgUrl: 'https://media.istockphoto.com/photos/the-spokane-river-centennial-trail-picture-id512597572',
            category: 'DB'
          },
          {
            name: "Postgress",
            description : "Mongo Db no sql databse",
            imgUrl: 'https://media.istockphoto.com/photos/the-spokane-river-centennial-trail-picture-id512597572',
            category: 'DB'
          },
          {
            name: "Cassandra",
            description : "Cassandra Database",
            imgUrl: 'https://media.istockphoto.com/photos/the-spokane-river-centennial-trail-picture-id512597572',
            category: 'DB'
          },
          {
            name: "MySql",
            description : "Mongo Db no sql databse",
            imgUrl: 'https://media.istockphoto.com/photos/the-spokane-river-centennial-trail-picture-id512597572',
            category: 'DB'
          },
          {
            name: "Hadoop",
            description : "Hadoop",
            imgUrl: 'https://media.istockphoto.com/photos/the-spokane-river-centennial-trail-picture-id512597572',
            category: 'HADOOP'
          },
          {
            name: "Apache Spart",
            description : "Apache Spark",
            imgUrl: 'https://media.istockphoto.com/photos/the-spokane-river-centennial-trail-picture-id512597572',
            category: 'SPARK'
          },
          {
            name: "Php",
            description : "Php",
            imgUrl: 'https://media.istockphoto.com/photos/the-spokane-river-centennial-trail-picture-id512597572',
            category: 'PHP'
          }
        ];
      return bluePrintArr
    }
  }
});
