'use strict';

/**
 * @ngdoc function
 * @name baabooApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the baabooApp
 */
angular.module('baabooApp')
  .controller('MainCtrl', function ($scope, $window ,$document, $timeout, $location, $anchorScroll, $rootScope) {
    $scope.anchorLink = function(anchor) {
      // set the location.hash to the id of
      // the element you wish to scroll to.
      $location.hash(anchor);
      console.log(anchor);

      // call $anchorScroll()
      $anchorScroll();
    };
    $scope.pageTransitionOpts = [{
      name: 'Scale up',
      'class': 'ainmate-scale-up'
    }, {
      name: 'Fade up',
      'class': 'animate-fade-up'
    }, {
      name: 'Slide in from right',
      'class': 'ainmate-slide-in-right'
    }, {
      name: 'Flip Y',
      'class': 'animate-flip-y'
    }];
    $scope.admin = {
      layout: 'wide',
      menu: 'vertical',
      fixedHeader: true,
      fixedSidebar: false,
      pageTransition: $scope.pageTransitionOpts[0]
    };
    angular.element($window).bind('load', function() {
      // angular.element('#btry-loader').fadeOut('slow');
    }); 

    function initParallax(){
      // $timeout(function() {
      //   $("[data-parallax]").each(function() {
      //       var t = $(this).attr("data-bleed");
      //       $(this).parallax({
      //           bleed: t,
      //           positionY: "center"
      //       })
      //   });
      //   $("[data-parallax]").each(function(t) {
      //       var i = "";
      //       $(this).hasClass("ken-burn") && (i = "ken-burn"),
      //       i.length > 0 && setTimeout(function() {
      //           $(".parallax-mirror:eq(" + (t - 1) + ")").addClass(i)
      //       }, 100)
      //   });

        
      // }, 1000);
      $(window).scroll(function() {
          var t = window.pageYOffset;
          $(".baaboo-has-background .baaboo-title-holder").css("margin-top", t / 2).css("opacity", 100 / t < 1 ? 100 / t : 1);
      });
    }

    jQuery(document).ready(function($){
      initParallax();
    });
    $rootScope.$on('$stateChangeSuccess', function(evt, current) {
      $(".parallax-mirror").remove();
    });

    // $(window).scrollTop() returns the position of the top of the page, and 
    // $(document).height() returns the position of the bottom of the page
    jQuery(window).scroll(function() {
        var scroll_top = jQuery(this).scrollTop(),
          window_height = jQuery(this).height(),
          offset_val = scroll_top > 0 ? scroll_top + window_height / 2 : 1;
        toggleToTop(offset_val < 500 ? "off" : "on");
    });

    function toggleToTop(val) {
        var el = jQuery("#edgtf-back-to-top");
        el.removeClass("off on");
        "on" === val ? el.addClass("on") : el.addClass("off");
    }
    jQuery("#edgtf-back-to-top").on("click", function(e) {
        e.preventDefault();
        jQuery("html, body").animate({ scrollTop: 0 }, $(window).scrollTop() / 3, "linear");
    }); 
  })

  .controller('HeaderCtrl', function($scope){
  	$scope.finishHeaderLoading = function() {
  	  var a = jQuery(".eltdf-side-menu-button-opener"),
          l = "eltdf-right-side-menu-opened";
      jQuery(".wrapper").prepend('<div class="eltdf-cover"/>');
      jQuery(".eltdf-side-menu-button-opener, .eltdf-close-side-menu").click(function(e) {
        console.log("sfaf");
        e.preventDefault();
        if (a.hasClass("opened")){
            a.removeClass("opened");
            jQuery("body").removeClass(l);
        }
        else {
          a.addClass("opened");
          jQuery("body").addClass(l);

          // click outside section "eltdf-side-menu" to close
          jQuery(".wrapper .eltdf-cover").click(function() {
            jQuery("body").removeClass("eltdf-right-side-menu-opened");
            a.removeClass("opened");
          });

          // press Esc to close
          jQuery(document).keyup(function(e) {
            if(27 === e.keyCode){
              a.removeClass("opened");
              jQuery("body").removeClass(l);
            }
          });
        }
      });
  	}; 
  }); 

  