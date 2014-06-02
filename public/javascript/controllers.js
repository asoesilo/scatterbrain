'use strict';

/* Controllers */
var scatterBrainControllers = angular.module('scatterBrainControllers', ['ngResource', 'ui.bootstrap', 'cgBusy', 'scatterBrainAppServices']);

scatterBrainControllers.controller('SearchCtrl', ['$scope', '$resource', '$modal', 'UserMovies', 'UserRestaurants', 'SharedValues',
  function($scope, $resource, $modal, UserMovies, UserRestaurants, SharedValues){
    $scope.category = SharedValues.getCurrentCategory();
    $scope.movies = SharedValues.getMovies();
    $scope.restaurants = SharedValues.getRestaurants();
    $scope.message = "";
    $scope.numUserItemsToShow = 4;
    $scope.start_restaurant_index = 0;
    $scope.start_movie_index = 0;
    $scope.detail_restaurant = null;

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
              $scope.refreshUserRestaurants();
              $scope.refreshUserMovies();
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

    var getCurrentDate = function() {
      var currentTime = new Date();
      var year = (parseInt(currentTime.getFullYear()) + 1).toString();
      var month = currentTime.getMonth();
      if(month < 10)
      {
        month = "0" + month;
      }
      var date = currentTime.getDay();
      if(date < 10)
      {
        date = "0" + date;
      }
      var hours = currentTime.getHours();
      if(hours < 10) {
        hours = "0" + hours;
      }
      var minutes = currentTime.getMinutes();
      if(minutes < 10) {
        minutes = "0" + minutes;
      }
      var seconds = currentTime.getSeconds();
      return year + "-" + month + "-" + date + "T" + hours + ":" + minutes + ":" + seconds + "Z";
    };

    $scope.searchEntry = function searchEntry() {
      setRestaurants([]);
      setMovies([]);

      console.log("in searchEntry");
      switch($scope.category) {
        case 'restaurant':
          $scope.message = "";
          $scope.searchPromiseMessage = "Searching for restaurants with '" + $scope.keyword + "'";
          $scope.searchPromise = restaurantsSearchResource.get({keyword: $scope.keyword, latitude: 49.285358, longitude: -123.114548})
            .$promise.then(
              function(newRestaurants) {
                if(newRestaurants.length > 0)
                {
                  $scope.message = "Search result for restaurants with '" + $scope.keyword + "'";
                  setRestaurants(newRestaurants);
                }
                else
                {
                  $scope.message = "No restaurants found with '" + $scope.keyword + "'";
                }
              }
            );
          break;
        case 'movie':
          $scope.message = "";
          $scope.searchPromiseMessage = "Searching for movies with '" + $scope.keyword + "'";
          $scope.searchPromise = moviesSearchResource.get({keyword: $scope.keyword})
            .$promise.then(
              function(newMovies) {
                if(newMovies.length > 0)
                {
                  $scope.message = "Search result for movies with '" + $scope.keyword + "'";
                  setMovies(newMovies);
                }
                else
                {
                  $scope.message = "No movies found with '" + $scope.keyword + "'";
                }
              }
            );
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

    $scope.addMovieToList = function addMovieToList(movie_index){
      var movie_id = $scope.movies[movie_index].id;
      console.log("Attempt to add new movie: " + movie_id);
      $scope.addMoviePromiseMessage = "Adding " + $scope.movies[movie_index].title + " to your list";
      var movie = new UserMovies({rotten_tomatoes_movie_id: movie_id});
      $scope.addMoviePromise = movie.$save(function(){
        $scope.movies[movie_index].created_at = getCurrentDate();
        $scope.addMovie($scope.movies[movie_index]);
        $scope.movies.splice(movie_index, 1);
      });
    };

    $scope.addRestaurantToList = function addRestaurantToList(restaurant_index){
      var restaurant_id = $scope.restaurants[restaurant_index].id;
      console.log("Attempt to add new restaurant: " + restaurant_id);
      $scope.addRestaurantPromiseMessage = "Adding " + $scope.restaurants[restaurant_index].name + " to your list";
      var restaurant = new UserRestaurants({yelp_business_id: restaurant_id});
      $scope.addRestaurantPromise = restaurant.$save(function(){
        $scope.restaurants[restaurant_index].created_at = getCurrentDate();
        $scope.addRestaurant($scope.restaurants[restaurant_index]);
        $scope.restaurants.splice(restaurant_index, 1);
      });
    };

    $scope.addRestaurant = function addRestaurant(restaurant) {
      console.log("Add restaurant to user's restaurant list: " + restaurant.id + " with creation date " + restaurant.created_at);
      $scope.userRestaurants.push(restaurant);
      $scope.start_restaurant_index = 0;
    };

    $scope.addMovie = function addMovie(movie) {
      console.log("Add movie to user's movie list: " + movie.id + " with creation date " + movie.created_at);
      $scope.userMovies.push(movie);
      $scope.start_movie_index = 0;
    };

    $scope.refreshUserRestaurants = function refreshUserRestaurants() {
      console.log("Refreshing list of restaurants for current users");
      $scope.retrieveRestaurantsPromiseMessage = "Please wait while we retrieve your restaurant list";
      $scope.retrieveRestaurantsPromise = UserRestaurants.query()
        .$promise.then(
          function(userRestaurants) {
            $scope.userRestaurants = userRestaurants;
          }
        );
    };

    $scope.refreshUserMovies = function refreshUserMovies() {
      console.log("Refreshing list of movies for current users");
      $scope.retrieveMoviesPromiseMessage = "Please wait while we retrieve your movie list";
      $scope.retrieveMoviesPromise = UserMovies.query()
        .$promise.then(
          function(userMovies) {
            $scope.userMovies = userMovies;
          }
        );
    };

    $scope.incrementUserRestaurantIndex = function incrementUserRestaurantIndex() {
      if(($scope.start_restaurant_index + $scope.numUserItemsToShow) < $scope.userRestaurants.length)
      {
        $scope.start_restaurant_index++; 
      }
    };

    $scope.decrementUserRestaurantIndex = function decrementUserRestaurantIndex() {
      if($scope.start_restaurant_index > 0)
      {
        $scope.start_restaurant_index--;
      }
    };

    $scope.incrementUserMovieIndex = function incrementUserMovieIndex() {
      if(($scope.start_movie_index + $scope.numUserItemsToShow) < $scope.userMovies.length)
      {
        $scope.start_movie_index++; 
      }
    };

    $scope.decrementUserMovieIndex = function decrementUserMovieIndex() {
      if($scope.start_movie_index > 0)
      {
        $scope.start_movie_index--;
      }
    };

    $scope.isRestaurantInScope = function isRestaurantInScope(index) {
      return (index >= $scope.start_restaurant_index) && (index < $scope.start_restaurant_index + $scope.numUserItemsToShow);
    };

    $scope.isMovieInScope = function isMovieInScope(index) {
      return (index >= $scope.start_movie_index) && (index < $scope.start_movie_index + $scope.numUserItemsToShow);
    };

    $scope.showRestaurantDetail = function showRestaurantDetail(restaurant_index) {
      console.log("Attempt to show modal for restaurant index: " + restaurant_index);
      $scope.restaurant_index = restaurant_index;
      $modal.open({
        templateUrl: 'restaurant-detail.html',
        controller: 'RestaurantDetailCtrl',
        size: 'lg',
        resolve: {
          restaurant_index: function() {
            return $scope.restaurant_index;
          }
        }
      });
    };

    $scope.showMovieDetail = function showMovieDetail(movie_index) {
      console.log("Attempt to show modal for movie index: " + movie_index);
      $scope.movie_index = movie_index;
      $modal.open({
        templateUrl: 'movie-detail.html',
        controller: 'MovieDetailCtrl',
        size: 'lg',
        resolve: {
          movie_index: function() {
            return $scope.movie_index;
          }
        }
      });
    };
  }]);

scatterBrainControllers.controller('RestaurantDetailCtrl', ['$scope', '$modalInstance', 'UserRestaurants', 'SharedValues', 'restaurant_index',
  function($scope, $modalInstance, UserRestaurants, SharedValues, restaurant_index){
    console.log("In restaurant detail controller");

    $scope.restaurants = SharedValues.getRestaurants();
    // $scope.restaurant_index = parseInt($routeParams.restaurant_index);
    $scope.restaurant_index = restaurant_index;
    $scope.restaurant = $scope.restaurants[$scope.restaurant_index];

    console.log("Showing information for restaurant index: " + restaurant_index);

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

    $scope.close = function close(){
      $modalInstance.dismiss();
    };
}]);

scatterBrainControllers.controller('MovieDetailCtrl', ['$scope', '$modalInstance', 'UserMovies', 'SharedValues', 'movie_index',
  function($scope, $modalInstance, UserMovies, SharedValues, movie_index){
    console.log("In movie detail controller");

    $scope.movies = SharedValues.getMovies();
    // $scope.movie_index = parseInt($routeParams.movie_index);
    $scope.movie_index = movie_index;
    $scope.movie = $scope.movies[$scope.movie_index];

    console.log("Showing information for movie index: " + movie_index);

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

    $scope.close = function close(){
      $modalInstance.dismiss();
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
