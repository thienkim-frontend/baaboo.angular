'use strict';

/**
 * @ngdoc function
 * @name baabooApp.controller:PriceCtrl
 * @description
 * # PriceCtrl
 * Controller of the baabooApp
 */
angular.module('baabooApp')
  .controller('PriceCtrl', function () {
    console.log('imagesLoaded');
    menusCarousel();
    menuMeals();

  });

  function menusCarousel() {
    if ( jQuery('.menus').length ) {
      jQuery('.menus').imagesLoaded(function(){
        console.log('imagesLoaded');
        jQuery('.menus').find('.menu-carousel').owlCarousel({
          singleItem: true,
          items: 1,
          nav: true,
          mouseDrag: false,
          navSpeed: 1000,
          autoHeight: false,
          animateIn: 'fadeInRight',
          animateOut: 'fadeOutRight',
          navContainer: '.menu-carousel-nav',
          navText: ['<span></span>', '<span></span>']
        });
      });
    }
  }

  function menuMeals(){
    var menuCarousel = jQuery('.menus').find('.menu-carousel');
    if ( jQuery('.menu-meals').length ) {
      var menuMeals = jQuery('.menu-meals');
      menuMeals.owlCarousel({
        items: 1,
        nav: false,
        mouseDrag: false,
        touchDrag: false,
        navText: ['<span></span>', '<span></span>']
      });

      menuMeals.find('.owl-item').on('click', function() {
        var $this = jQuery(this);
        $this.addClass('active').siblings().removeClass('active');
        menuCarousel.trigger('to.owl.carousel', $this.index());
      });

      menuCarousel.on('changed.owl.carousel', function(event) {
        var activeMenu = event.item.index;
        console.log(activeMenu);
        menuMeals.find('.owl-item:nth-child('+ (activeMenu + 1) + ')' ).addClass('active').siblings().removeClass('active');
      });
    }

  }