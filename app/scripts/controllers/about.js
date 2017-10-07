'use strict';

/**
 * @ngdoc function
 * @name baabooApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the baabooApp
 */
angular.module('baabooApp')
  .controller('ContactCtrl', function ($scope, NgMap) {
  	$scope.points = [
        { 'name': 'Canberra', 'latitude': -35.282614, 'longitude': 149.127775 },
        { 'name': 'Melbourne', 'latitude': -37.815482, 'longitude': 144.983460 },
        { 'name': 'Sydney', 'latitude': -33.869614, 'longitude': 151.187451 }
    ];
    NgMap.getMap().then(function(map) {
      console.log(map.getCenter());
      console.log('markers', map.markers);
      console.log('shapes', map.shapes);
    });
  });
