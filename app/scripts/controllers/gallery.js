'use strict';

/**
 * @ngdoc function
 * @name baabooApp.controller:GalleryCtrl
 * @description
 * # GalleryCtrl
 * Controller of the baabooApp
 */
angular.module('baabooApp')
  .controller('GalleryCtrl', function ($scope) {
  	var filters = [
      { filterId: 1, category: '', title:'all' },
      { filterId: 2, category: 'marketing', title:'marketing' },
      { filterId: 3, category: 'branding', title:'branding' },
      { filterId: 4, category: 'design', title:'design' },
      { filterId: 5, category: 'photo', title:'photograph' }];

    $scope.filters = filters;
    $scope.selected = 0;

    $scope.select= function(index) {
       $scope.selected = index; 
       $scope.myFilter = filters[index].category;
    };
    $scope.myFilter = '';
    $scope.galleryArr = [
      { num: 1, category: 'marketing', src: "1.jpg", description: 'Oscar is a decent man. He used to clean porches with pleasure. ', url_details: "details.html" },
      { num: 2, category: 'branding', src: "2.jpg", description: 'Oscar is a decent man. He used to clean porches with pleasure. ', url_details: "details.html" },
      { num: 3, category: 'design', src: "3.jpg", description: 'Oscar is a decent man. He used to clean porches with pleasure. ', url_details: "details.html" },
      { num: 4, category: 'photo', src: "4.jpg", description: 'Oscar is a decent man. He used to clean porches with pleasure. ', url_details: "details.html" },
      { num: 5, category: 'marketing', src: "5.jpg", description: 'Oscar is a decent man. He used to clean porches with pleasure. ', url_details: "details.html" },
      { num: 6, category: 'design', src: "6.jpg", description: 'Oscar is a decent man. He used to clean porches with pleasure. ', url_details: "details.html" },
      { num: 7, category: 'photo', src: "7.jpg", description: 'Oscar is a decent man. He used to clean porches with pleasure. ', url_details: "details.html" },
      { num: 8, category: 'marketing', src: "8.jpg", description: 'Oscar is a decent man. He used to clean porches with pleasure. ', url_details: "details.html" },
      { num: 9, category: 'design', src: "9.jpg", description: 'Oscar is a decent man. He used to clean porches with pleasure. ', url_details: "details.html"}];
  	
  });
