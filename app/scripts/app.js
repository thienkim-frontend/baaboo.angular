'use strict';

/**
 * @ngdoc overview
 * @name baabooApp
 * @description
 * # baabooApp
 *
 * Main module of the application.
 */
angular
  .module('baabooApp', [
    'ngAnimate',
    'ngMessages',
    'ngSanitize',
    'ui.router',
    'ui.bootstrap',
    'ngMap'
  ])

  // https://github.com/angular-ui/ui-router/wiki/multiple-named-views
  .config(function($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider, $qProvider) {
    // temporary fix for “Possibly unhandled rejection” error
    $qProvider.errorOnUnhandledRejections(false);

    var productType = {
      encode: function(str) { return str && str.replace(/ /g, '-').toLowerCase(); },
      decode: function(str) { return str && str.replace(/-/g, ' ').toLowerCase(); },
      is: angular.isString,
      pattern: /[^/]+/
    };
    $urlMatcherFactoryProvider.type('product', productType);

    
    $stateProvider
      .state('home', { 
        url: '/', 
        templateUrl: 'views/home.html', 
        controller: 'MainCtrl',
        meta: {
          title: 'Home',
          description: 'This is my home page description lorem ipsum.'
        },
        ncyBreadcrumb: {
          label: 'Home page'
        }
      })
      .state('product', { 
        url: '/product', 
        templateUrl: 'views/product/product.list.html', 
        controller: 'ProductCtrl',
        // controllerAs: 'proCtrl',
        resolve: ProductController.resolve,
        meta: {
          title: 'Product'
        }
      })
      .state('productDetail', { 
        url: '/details/{guitarID:product}', 
        views: {
          '': {
            template:'<div class="productWrapper" ui-view="infoPro"/>' +
            '<div class="related-proWrapper" ui-view="relatedPro"/>',
            controller: 'ProductCtrl',
          },
          'infoPro@productDetail': { templateUrl: 'views/product/product.details.html', controller: 'ProductCtrl' },
          'relatedPro@productDetail': { templateUrl: 'views/product/product.related.html', controller: 'ProductCtrl' }
        },
        resolve: ProductController.resolve,
        meta: {
          title: 'Product details'
        }
      })
      .state('category', { 
        url: '/category/:idCategory', 
        templateUrl: 'views/product/product.category.html', 
        controller: 'ProductCtrl',
        resolve: ProductController.resolve,
        meta: {
          title: 'category'
        }
      })
      .state('price', { 
        url: '/price', 
        templateUrl: 'views/price.html', 
        controller: 'PriceCtrl',
        meta: {
          title: 'Price'
        }
      })
      .state('contact', { 
        url: '/contact', 
        templateUrl: 'views/contact.html', 
        controller: 'ContactCtrl',
        meta: {
          title: 'Contact'
        }
      })
      .state('team', { 
        url: '/team', 
        templateUrl: 'views/team.html', 
        controller: 'FeaturesCtrl',
        meta: {
          title: 'Team'
        }
      })
      .state('about', { 
        url: '/about', 
        templateUrl: 'views/about.html', 
        controller: 'FeaturesCtrl',
        meta: {
          title: 'About'
        }
      })
      .state('gallery', { 
        url: '/gallery', 
        templateUrl: 'views/gallery.html', 
        controller: 'GalleryCtrl',
        meta: {
          title: 'Gallery'
        }
      })
      .state('features', { 
        url: '/features', 
        templateUrl: 'views/features.html', 
        controller: 'FeaturesCtrl',
        meta: {
          title: 'Features'
        }
      })
      .state('404', { 
        url: '/404', 
        templateUrl: '404.html', 
        controller: 'MainCtrl',
        meta: {
          title: '404'
        }
      });

    // the known route, with missing '/' - let's create alias
    $urlRouterProvider.when('', '/');

    // $urlRouterProvider.otherwise('/404');
    // Redirect any unmatched url to 404 view (without change location.hash)
    $urlRouterProvider.otherwise(function($injector) {
        var $state = $injector.get('$state');
        $state.go('404', null, {
            location: false
        });

    });
    //check browser support
    // if(window.history && window.history.pushState){
    //   //$locationProvider.html5Mode(true); will cause an error $location in HTML5 mode requires a  tag to be present! Unless you set baseUrl tag after head tag like so: <head> <base href='/'>
    //   // to know more about setting base URL visit: https://docs.angularjs.org/error/$location/nobase
    //   // if you don't wish to set base URL then use this
    //   $locationProvider.html5Mode({
    //     enabled: true,
    //     requireBase: false
    //   });
    // }
  })

  // Adds state change hooks; logs to console.
  .run(function($rootScope, $state, $location, $timeout, $window) {
    $rootScope.$state = $state;
    $rootScope.$location = $location;
    
    function message(to, toP, from, fromP) { 
      return from.name  + angular.toJson(fromP) + ' -> ' + to.name + angular.toJson(toP);
    }
    
    // $rootScope.$on('$stateChangeStart',   function(evt, toState, toParams, fromState, fromParams) { });
    $rootScope.$on('$stateChangeSuccess', function(evt, current) {
      if (current.hasOwnProperty('meta')) { 
        // $timeout(function() {
          $window.document.title = current.meta.title + " | Baaboo App";
        // });
      }
    });
    $rootScope.$on('$stateChangeError',   function(evt, to, toP, from, fromP, err) { console.log('Error:   ' + message(to, toP, from, fromP) + evt, err); });
  });

