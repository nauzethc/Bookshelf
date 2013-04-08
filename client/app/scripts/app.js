'use strict';

var Bookshelf = angular.module('Bookshelf', ['ngResource', 'ui.bootstrap'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/books', {
        templateUrl: 'views/books.html',
        controller: 'BooksCtrl'
      })
      .when('/covers', {
        templateUrl: 'views/covers.html',
        controller: 'CoversCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

Bookshelf.config(['$httpProvider', function($httpProvider) {
    delete $httpProvider.defaults.headers.common["X-Requested-With"]
}]);
