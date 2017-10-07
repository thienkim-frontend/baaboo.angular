'use strict';

/**
 * @ngdoc directive
 * @name baabooApp.directive:directive
 * @description
 * # directive
 */
angular.module('baabooApp')
  .directive('onFinishRender', function () {
      return {
          restrict: 'A',
          link: function (scope) {
              if (scope.$last === true) {
                scope.$emit('ngRepeatFinished');
              }
          }
      };
  })

  //Carousel general management
  .directive('owlCarouselItem', function () {
    return {
      restrict: 'EA',
      link: function (scope, element, attr) {
        scope.$on('ngRepeatFinished', function() {
           angular.element(element).owlCarousel({
            nav:true,
            items: 3,
            margin: 15,
            pagination:false,
            navText: ["<i class='ion-ios-arrow-left'></i>","<i class='ion-ios-arrow-right'></i>"],
          });
        });
      }
    };
  })
  .directive('owlCarouselThumbnail', function ($timeout) {
    return {
      restrict: 'EA',
      link: function (scope, element, attr) {
        scope.$on('ngRepeatFinished', function() {
        console.log($("element"));
            var $sync1 = $(".main-carousel"),
                $sync2 = $(".thumbs-carousel"),
                flag = false,
                duration = 300;

            $sync1
              .owlCarousel({
                items: 1,
                nav: false,
                dots: false,
              })
              .on('changed.owl.carousel', function (e) {
                if (!flag) {
                  flag = true;
                  $sync2.trigger('to.owl.carousel', [e.item.index, duration, true]);
                  flag = false;
                }
              });
            $timeout(function(){
              $sync2
                .owlCarousel({
                  margin: 5,
                  items: 4,
                  nav: true,
                  navText: ["<i class='ion-ios-arrow-left'></i>","<i class='ion-ios-arrow-right'></i>"],
                  // dots: false
                })
                .on('click', '.owl-item', function () {
                  $sync1.trigger('to.owl.carousel', [$(this).index(), duration, true]);
                })
                .on('changed.owl.carousel', function (e) {
                  if (!flag) {
                    flag = true;    
                    $sync1.trigger('to.owl.carousel', [e.item.index, duration, true]);
                    flag = false;
                  }
                });
            }, 0);
            
        });
      }
    };
  })

  .directive("slider", function($timeout) {
    return {
      restrict: 'E',
      require: 'ngModel',
      link: function(scope, elem, attrs, ctrl) {
        var $min = parseInt(attrs.min),
            $max = parseInt(attrs.max),
            $step = parseFloat(attrs.step);
            
        scope.sliderRanges = {
         min: $min,
         max: $max
        };
        jQuery(elem).slider({
          range: true,
          values: [ $min, $max],
          min: $min,
          max: $max,
          step: $step,
          slide: function(event, ui) {
            scope.$apply(function() {
              ctrl.$setViewValue(ui);
            });
            ctrl.$render = function() {
              $(elem).slider("value", ctrl.$viewValue);
            };
            console.log("min" +$min);
          },
          stop: function( event, ui ) {
            $timeout(function() {
              scope.sliderRanges.min = $(elem).slider("values", 0);
              scope.sliderRanges.max = $(elem).slider("values", 1);
            });
          }
        });
      }
    }
  })

  .directive('customClick', function() {
      return {
        link: function(scope, element, attrs) {
          angular.element(element).click(function(){
            angular.element(this).find('i').removeClass('ion-ios-cart').addClass('ion-checkmark-round');
            // console.log("clicked");
          }); 
        }
      }
  });