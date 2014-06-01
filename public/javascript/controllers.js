'use strict';

/* Controllers */
var scatterBrainControllers = angular.module('scatterBrainControllers', ['ngResource', 'scatterBrainAppServices']);

scatterBrainControllers.controller('SearchCtrl', ['$scope', '$resource', 'UserMovies', 'UserRestaurants', 'SharedValues',
  function($scope, $resource, UserMovies, UserRestaurants, SharedValues){
    $scope.category = SharedValues.getCurrentCategory();
    $scope.movies = SharedValues.getMovies();
    $scope.restaurants = SharedValues.getRestaurants();

    var restaurantsSearchResource = $resource("/restaurants", {},{ get: {method: 'get', isArray:true}});
    var moviesSearchResource = $resource("/movies", {},{ get: {method: 'get', isArray:true}});

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

    var setMovies = function(newMovies) {
      $scope.movies = newMovies;
      SharedValues.setMovies(newMovies);
    };

    var setRestaurants = function(newRestaurants) {
      $scope.restaurants = newRestaurants;
      SharedValues.setRestaurants(newRestaurants);
    };

    $scope.searchEntry = function searchEntry() {
      setRestaurants([]);
      setMovies([]);

      console.log("in searchEntry");
      switch($scope.category) {
        case 'restaurant':
          setRestaurants(restaurantsSearchResource.get({keyword: $scope.keyword, latitude: 49.285358, longitude: -123.114548}));
          break;
        case 'movie':
          setMovies(moviesSearchResource.get({keyword: $scope.keyword}));
          break;
        case 'book':
          break;
      }
    };

    $scope.selectTab = function selectTab(category){
      console.log("select tab " + category)
      $scope.category = category;
      SharedValues.setCurrentCategory(category);
    };

    $scope.isSelected = function isSelected(category){
      return $scope.category === category;
    };

    $scope.addMovie = function addMovie(movie_id){
      console.log("Attempt to add new movie: " + movie_id);
      var movie = new UserMovies({rotten_tomatoes_movie_id: movie_id});
      movie.$save();
    };

    $scope.addRestaurant = function addRestaurant(restaurant_id){
      console.log("Attempt to add new restaurant: " + restaurant_id);
      var restaurant = new UserRestaurants({yelp_business_id: restaurant_id});
      restaurant.$save();
    };

    $scope.refreshUserRestaurants = function refreshUserRestaurants() {
      console.log("Refreshing list of restaurants for current users");
      $scope.userRestaurants = UserRestaurants.query();
    };

    $scope.refreshUserMovies = function refreshUserMovies() {
      console.log("Refreshing list of movies for current users");
      $scope.userMovies = UserMovies.query();
    };

    $scope.refreshUserRestaurants();
    $scope.refreshUserMovies();
  }]);

scatterBrainControllers.controller('RestaurantDetailCtrl', ['$scope', '$routeParams', 'UserRestaurants', 'SharedValues',
  function($scope, $routeParams, UserRestaurants, SharedValues){
    $scope.restaurants = SharedValues.getRestaurants();
    $scope.restaurant_index = parseInt($routeParams.restaurant_index);
    $scope.restaurant = $scope.restaurants[$scope.restaurant_index];

    $scope.showNextRestaurant = function showNextRestaurant(){
      $scope.restaurant_index = ($scope.restaurant_index + 1) % $scope.restaurants.length;
      $scope.restaurant = $scope.restaurants[$scope.restaurant_index];
      console.log("Next restaurant index: " + $scope.restaurant_index);
    };

    $scope.showPreviousRestaurant = function showPreviousRestaurant(){
      $scope.restaurant_index = ($scope.restaurant_index - 1);
      if($scope.restaurant_index < 0)
      {
        $scope.restaurant_index = $scope.restaurants.length - 1;
      }
      $scope.restaurant = $scope.restaurants[$scope.restaurant_index];
      console.log("Previous restaurant index: " + $scope.restaurant_index);
    };
}]);

scatterBrainControllers.controller('MovieDetailCtrl', ['$scope', '$routeParams', 'UserMovies', 'SharedValues',
  function($scope, $routeParams, UserMovies, SharedValues){
    $scope.movies = SharedValues.getMovies();
    $scope.movie_index = parseInt($routeParams.movie_index);
    $scope.movie = $scope.movies[$scope.movie_index];

    $scope.showNextMovie = function showNextMovie(){
      $scope.movie_index = ($scope.movie_index + 1) % $scope.movies.length;
      $scope.movie = $scope.movies[$scope.movie_index];
      console.log("Next movie index: " + $scope.movie_index);
    };

    $scope.showPreviousMovie = function showPreviousMovie(){
      $scope.movie_index = ($scope.movie_index - 1);
      if($scope.movie_index < 0)
      {
        $scope.movie_index = $scope.movies.length - 1;
      }
      $scope.movie = $scope.movies[$scope.movie_index];
      console.log("Previous movie index: " + $scope.movie_index);
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
