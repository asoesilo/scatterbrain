'use strict';

/* Services */

var scatterBrainServices = angular.module('scatterBrainAppServices', ['ngResource']);
scatterBrainServices.value('version', '0.1');

scatterBrainServices.service('UserRestaurants', ['$resource',
  function($resource){
    return $resource('/user/restaurants', {});
  }]);

scatterBrainServices.service('UserMovies', ['$resource', function($resource) {
  return $resource('/user/movies', {});
}]);

scatterBrainServices.service('SharedValues', function(){
  var currentCategory = 'movie';
  var restaurants = [];
  var movies = [];

  return {
    getRestaurants: function() {
      return restaurants;
    },
    getMovies: function() {
      return movies;
    },
    getCurrentCategory: function() {
      return currentCategory;
    },
    setRestaurants: function(newRestaurants) {
      restaurants = newRestaurants;
    },
    setMovies: function(newMovies) {
      movies = newMovies;
    },
    setCurrentCategory: function(category) {
      currentCategory = category;
    }
  };
});