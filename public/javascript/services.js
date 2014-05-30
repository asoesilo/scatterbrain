'use strict';

/* Services */

var scatterBrainServices = angular.module('scatterBrainAppServices', ['ngResource']);
scatterBrainServices.value('version', '0.1');

scatterBrainServices.factory('Restaurants', ['$resource',
  function($resource){
    // return $resource('http://localhost:3000/restaurants', {});
  }]);