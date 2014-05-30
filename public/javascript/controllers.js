'use strict';

/* Controllers */
var scatterBrainControllers = angular.module('scatterBrainControllers', ['ngResource']);

scatterBrainControllers.controller('SearchCtrl', ['$scope', '$resource', //'Restaurants',
  function($scope, $resource){//, Restaurants) {
    $scope.name = "hello";
    $scope.category = 'movie';

    var restaurantsResource = $resource("/restaurants", {},{ get: {method: 'get', isArray:true}});
    var moviesResource = $resource("/movies", {},{ get: {method: 'get', isArray:true}});

    var getLoginStatus = function getLoginStatus() {
      var loginResource = $resource("/login/status");
      loginResource.get({}, 
          function(response) { 
            $scope.isLoggedIn = response.isLoggedIn;
            if($scope.isLoggedIn)
            {
              console.log("Logged in");
            }
            else
            {
              console.log("Not logged in");
            }
          }
        );
    };

    getLoginStatus();

    $scope.searchEntry = function searchEntry() {
      $scope.restaurants = []
      $scope.movies = []
      console.log("in searchEntry");
      // console.log("Local storage:" + $localStorage);
      console.log("Scope storage:" + $scope.$storage);
      switch($scope.category) {
        case 'restaurant':
          $scope.restaurants = restaurantsResource.get({keyword: $scope.keyword, latitude: 49.285358, longitude: -123.114548});
          break;
        case 'movie':
          $scope.movies = moviesResource.get({keyword: $scope.keyword});
          break;
        case 'book':
          break;
      }
    };

    $scope.selectTab = function selectTab(category){
      console.log("select tab " + category)
      $scope.category = category;
    };

    $scope.isSelected = function isSelected(category){
      return $scope.category === category;
    };

    $scope.addMovie = function addMovie(movie_id){
      var resource = $resource("/movies/new");
      resource.save({id: movie_id});
    };

    $scope.addRestaurant = function addRestaurant(restaurant_id){
      var resource = $resource("/restaurants/new");
      resource.save({id: restaurant_id});
    };
  }]);



// var phonecatControllers = angular.module('phonecatControllers', []);

// phonecatControllers.controller('PhoneListCtrl', ['$scope', '$http',
//   function($scope, $http) {
//     $http.get('phones/phones.json').success(function(data) {
//       $scope.phones = data;
//     });

//     $scope.orderProp = 'age';
//   }]);

// phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', '$http',
//   function($scope, $routeParams, $http) {
//     $http.get('phones/' + $routeParams.phoneId + '.json').success(function(data) {
//       $scope.phone = data;
//     });
//   }]);
