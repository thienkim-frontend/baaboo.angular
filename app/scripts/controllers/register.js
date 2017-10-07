'use strict';

/**
 * @ngdoc function
 * @name baabooApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the baabooApp
 */
angular.module('baabooApp')
  .controller('RegisterCtrl', function ($scope, $http) {
    $scope.submit = function(){
	    angular.element('#register-frm input[type="submit"]').attr('disabled', true);
	    var data = {
	      'email': $scope.user.email,
	      'password': $scope.user.password
    	};
	    $http({
	      method  : 'POST',
	      url     : '/api/app_dev.php/customer',
	      data    : JSON.stringify(data)
	     })
	      .success(function(data, status, headers, config, statusText) {
	        if (data.customer) {
	          $scope.message = 'Your account has been successfully created. An email has been sent to you with detailed instructions on how to activate it.';
	          // reset form and disable error messages
	          angular.element('#register-frm')[0].reset();
	          $scope.myForm.$setPristine();
	          $scope.myForm.$setUntouched();
	        }else{
	          $scope.message = 'Error:'+ data.message;
	          console.log(status + headers + config + statusText);
	        }
	      })
	      .error(function(response) {
	        console.log(response.message);
	      });
		};
  });
