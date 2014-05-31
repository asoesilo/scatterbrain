'use strict';

/* App Module */

var scatterBrainApp = angular.module('scatterBrainApp', [
  'ngRoute',
  'scatterBrainControllers', 
  'scatterBrainAppServices',
  ]);

scatterBrainApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/search', {
        templateUrl: '/partials/search.html',
        controller: 'SearchCtrl'
      }).
      when('/restaurant/:restaurant_index', {
        templateUrl: '/partials/restaurant-detail.html',
        controller: 'RestaurantDetailCtrl'
      }).
      when('/movie/:movie_index', {
        templateUrl: '/partials/movie-detail.html',
        controller: 'MovieDetailCtrl'
      }).
      otherwise({
        redirectTo: '/search'
      });
  }]);


// var phonecatApp = angular.module('phonecatApp', [
//   'ngRoute',
//   'phonecatControllers',
//   'phonecatFilters'
// ]);

// phonecatApp.config(['$routeProvider',
//   function($routeProvider) {
//     $routeProvider.
//       when('/phones', {
//         templateUrl: 'partials/phone-list.html',
//         controller: 'PhoneListCtrl'
//       }).
//       when('/phones/:phoneId', {
//         templateUrl: 'partials/phone-detail.html',
//         controller: 'PhoneDetailCtrl'
//       }).
//       otherwise({
//         redirectTo: '/phones'
//       });
//   }]);
