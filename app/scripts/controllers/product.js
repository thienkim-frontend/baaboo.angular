'use strict';

/**
 * @ngdoc function
 * @name baabooApp.controller:ProductCtrl
 * @description
 * # ProductCtrl
 * Controller of the baabooApp
 */
angular.module('baabooApp')
  .controller('ProductCtrl', ProductController);
  
  function ProductController($scope, $stateParams, $filter, $state, getProductData, getCategoryData, $rootScope) {
      $scope.categoryList = getCategoryData;
      $scope.guitarVariable = getProductData;

      /* PRODUCT SINGLE */
      $scope.rate = 0;
      $scope.max = 10;
      $scope.isReadonly = false;
      $scope.hoveringOver = function(value) {
        $scope.overStar = value;
        $scope.percent = 100 * (value / $scope.max);
      };

      if($stateParams.guitarID){
        for (var i=0, len=$scope.guitarVariable.length; i<len; i++){
          var proName = $filter('removeVnUnicode')($scope.guitarVariable[i].name);
          // console.log($scope.guitarVariable[i]);
          if(proName === $stateParams.guitarID){
            $scope.whichGuitar = i;
          }
        }
        $scope.currentPro = $scope.guitarVariable[$scope.whichGuitar];
        // set page title depend on product
        $state.current.meta.title = $scope.currentPro.name;
        $scope.categoryPro = getCategoryBreadcrum($scope.categoryList, $scope.currentPro.categories);

        var preIndex, nextIndex;
        ($scope.whichGuitar > 0) ? preIndex = Number($scope.whichGuitar)-1 : preIndex = $scope.guitarVariable.length-1;
        ($scope.whichGuitar < $scope.guitarVariable.length-1) ? nextIndex = Number($scope.whichGuitar)+1 : nextIndex = 0;
        $scope.prevGuitar = $scope.guitarVariable[preIndex].name;
        $scope.nextGuitar = $scope.guitarVariable[nextIndex].name;
      }

      /* PRODUCT CATEGORY */
      if($stateParams.idCategory){
        var currentCategory = getIdCategory($stateParams.idCategory);
        $scope.categoryArr = getProCategory(currentCategory.id);

        $scope.totalItems = $scope.guitarVariable.length;
        $scope.viewby = "6";
        $scope.numPerPage = $scope.viewby;
        $scope.currentPage = 1;

        $scope.myFilter = '';
        $scope.selected = 0;
        $scope.select= function(index) {
           $scope.selected = index; 
           $scope.myFilter = $scope.categoryList[index].id;
           $scope.categoryArr = getProCategory($scope.myFilter);
           $scope.myCategory = $scope.categoryList[index].name;
           $scope.setPage();
        };

        $scope.setPage = function () {
          var offset = parseInt(($scope.currentPage - 1) * $scope.numPerPage),
              limit = parseInt($scope.numPerPage);
          $scope.guitarVariable = $scope.categoryArr.slice( offset, offset + limit );
          $scope.totalItems = $scope.categoryArr.length;
           console.log("sa" + $scope.guitarVariable);
        };

        $scope.setItemsPerPage = function(num) {
          $scope.numPerPage = num;
          $scope.currentPage = 1; //reset to first page
          $scope.setPage();
        };
        $scope.$watch( 'currentPage', $scope.setPage );

        
      }

      function getIdCategory(url){
        var el;
        jQuery.each($scope.categoryList, function(index, val) {
          if(val.slug === url) {
            el = val;
          }
        });
        return el;
      }

      function getProCategory(idCategory){
        var filteredPro;
        if (idCategory !== undefined){
          function filterCategory(){
            var filteredArr = [];
            jQuery.each(getProductData, function(index, item) {
              var match = false;
              jQuery.each(item.categories, function(index, val) {
                // console.log("lll" + idCategory+ " val:"+ val +  " "+(val == idCategory));
                  if(val === idCategory) match = true;
              });
              if (match === true) filteredArr.push(item);
            });
            return filteredArr;
          }
          filteredPro = filterCategory();
          $scope.totalItems = filteredPro.length;
        }else{
          filteredPro = getProductData;
        }
        return filteredPro;
      }   

      /* PRODUCT CART */
      $scope.quantity = 1;
      $scope.addToCart = function(product, quantity) {
        $rootScope.$broadcast("callAddToCartFn", {amount: quantity, proDetail : product});
      };

      InitCountdown($(".edgtf-countdown"));
       $scope.groups = [
        {
          title:'DESCRIPTION',
          content:'Our Kaiser Roll topped with cheese, garlic butter and freshly chopped herbs. Baked in a paper tray for easy reheating',
          open: true
        },
        {
          title:'ADDITIONAL INFORMATION',
          content:'Weight 1 kg, Dimensions  150 x 90 x 90 cm',
          open:false
        },
        {
          title:'REVIEWS (1)',
          content:'Content C',
          open:false
        }];
  }

  function getCategoryBreadcrum (el, id){
    var categoryName;
    jQuery(el).each(function(index, el){
      for (var i = id.length - 1; i >= 0; i--) {
        if (el.id === id[i])  {
          categoryName = el;
        }
      }
    });
    return categoryName;
  }

   function InitCountdown(el) {
      el.length && el.each(function() {
          var self = $(this),
          t = self.data("year"),
          a = self.data("month"),
          d = self.data("day"),
          o = self.data("hour"),
          n = self.data("minute"),
          i = self.data("timezone"),
          s = self.data("month-label"),
          r = self.data("day-label"),
          l = self.data("hour-label"),
          f = self.data("minute-label"),
          g = self.data("second-label"),
          u = self.data("digit-size"),
          p = self.data("label-size");
          new Date().getMonth() !== a && (a -= 1);
          self.countdown({
              until: new Date(t,a,d,o,n,44),
              labels: ["Years", s, "Weeks", r, l, f, g],
              format: "ODHMS",
              timezone: i,
              padZeroes: !0,
              onTick: function(){
                self.find(".countdown-amount").css({
                    "font-size": u + "px",
                    "line-height": u + "px"
                }),
                self.find(".countdown-period").css({
                    "font-size": p + "px"
                });
              }
          });
      });
  }
    
  ProductController.resolve = {
    getCategoryData: ['GetDataService', function (GetDataService) {
      // Return our Service call, that returns a Promise
      return GetDataService.getData('scripts/json/product.category.json');
    }],
    getProductData: ['GetDataService', function (GetDataService) {
      // Return our Service call, that returns a Promise
      return GetDataService.getData('scripts/json/product.details.json');
    }]
  };