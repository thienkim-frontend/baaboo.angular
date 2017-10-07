'use strict';

/**
 * @ngdoc function
 * @name baabooApp.controller:CartCtrl
 * @description
 * # CartCtrl
 * Controller of the baabooApp
 */
angular.module('baabooApp')
  .controller('CartCtrl', function ($scope, $rootScope) {
    $scope.dictricts = [
       {dictrictId: 1, dictrictName: 'Quận 1'},
       {dictrictId: 2, dictrictName: 'Quận Phú Nhuận'},
       {dictrictId: 3, dictrictName: 'Quận Gò Vấp'}
    ];
    $scope.format = 'dd-MM-yyyy';
    $scope.popup1 = {
      opened: false
    };
    // Disable weekend selection
    function disabled(data) {
     var date = data.date,
       mode = data.mode;
     return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }
    $scope.open1 = function() {
      $scope.popup1.opened = true;
    };
    $scope.dateOptions = {
       dateDisabled: disabled,
       formatYear: 'yy',
       maxDate: new Date(2017, 12, 30),
       minDate: new Date(),
       startingDay: 1
     };

    $rootScope.totalItem = 0;
    var $this = this;
    $this.proArr = [];
    $this.sumArr = [];
    $rootScope.$on('callAddToCartFn', function(event, data){
      console.log('add cart' + data.amount + data.proDetail);
      var found = false;
      $this.proArr.forEach(function (item) {
        if (item.id === data.proDetail.id) {
          item.quantity++;
          found = true;
        }
      });
      if (!found) {
        if(data.amount){
          $this.proArr.push(angular.extend({quantity: data.amount}, data.proDetail));
          console.log( $this.proArr);
          $rootScope.totalItem = $this.getTotalCartItem();
          return;
        }
        $this.proArr.push(angular.extend({quantity: 1}, data.proDetail));
      }
      $rootScope.totalItem++;
    });
    
    $this.getTotalCartItem= function(){
      var total = 0;
      $this.proArr.forEach(function (product) {
        total += product.quantity;
      });
      return total;
    };

    $scope.totalItem = $this.getTotalCartItem();

    $this.gettotalEachProduct = function(product){
      return product.price * product.quantity;
    };

    $this.getCartPrice = function () {
      var total = 0;
      $this.proArr.forEach(function (product) {
        total += product.price * product.quantity;
      });
      return total;
    };

    $this.increaseItemAmount = function(item) {
      item.quantity++;
      $rootScope.totalItem++;
    };

    $this.decreaseItemAmount = function(item) {
      item.quantity--;
      if (item.quantity <= 1) {
        item.quantity = 1;
      }
      $rootScope.totalItem--;
    };

    $this.removeFromCart = function(item) {
      var itemIndex = $this.proArr.indexOf(item);
      if (itemIndex > -1) {
          $this.proArr.splice(itemIndex, 1);
          $rootScope.totalItem = $this.getTotalCartItem();
      }
    };
  });
