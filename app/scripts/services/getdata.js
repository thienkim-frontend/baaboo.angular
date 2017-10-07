'use strict';

/**
 * @ngdoc service
 * @name baabooApp.getData
 * @description
 * # getData
 * Service in the baabooApp.
 */
angular.module('baabooApp')
  .factory('GetDataService', function($http){
    function getData(url) {
      return $http.get(url).then(function (response) {
        console.log('There are ' + response.data.results.length + ' items in file json');
        return response.data.results;
      });
    }
    return {
      getData: getData
    };
  });
  