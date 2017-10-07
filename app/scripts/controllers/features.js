'use strict';

/**
 * @ngdoc function
 * @name baabooApp.controller:FeaturesCtrl
 * @description
 * # FeaturesCtrl
 * Controller of the baabooApp
 */
angular.module('baabooApp')
	.factory( 'myData', function() {
	  var data = [];
	  
	  // push some dummy data
	  for(var i = 0; i < 30; i++) {
	    data.push( { name: "item"+i } );
	  }
	  
	  return {
	    get: function(offset, limit) {
	      return data.slice( offset, offset+limit );
	    },
	    count: function() {
	      return data.length;
	    }
	  };
	})
  .controller('FeaturesCtrl', function ($scope, myData, $timeout, $rootScope) {
    $scope.isNavCollapsed = true;
   
    // $scope.data = [];
    // $scope.totalItems = myData.count();
    // $scope.numPerPage = 5;
    // $scope.currentPage = 1;

    // $scope.setPage = function () {
    //   $scope.data = myData.get( ($scope.currentPage - 1) * $scope.numPerPage, $scope.numPerPage );
    // };
    // $scope.$watch( 'currentPage', $scope.setPage );

    $scope.rate = 0;
    $scope.max = 10;
    $scope.isReadonly = false;
    $scope.hoveringOver = function(value) {
      $scope.overStar = value;
      $scope.percent = 100 * (value / $scope.max);
    };
    $scope.ratingStates = [
      {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
      {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
      {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
      {stateOn: 'glyphicon-heart'},
      {stateOff: 'glyphicon-off'}
    ];

    $scope.players= [
      {name:'Shaun Pollock',  matches:'400', avg:60},
      {name:'Lance Klusner',  matches:'210', avg:87},
      {name:'Alan Donald',    matches:'450', avg:21},
      {name:'Gary Kirsten',   matches:'370', avg:66},
      {name:'Harschel Gibbs', matches:'420', avg:77}];
    $scope.sortType     = 'name'; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order
    $scope.searchPlayer  = '';    // set the default search/filter term$scope.sortType = 'name'; // set the default sort type

    // var t = jQuery(".baaboo-tabs");
    jQuery(document).ready(function($){
      
      if(jQuery(".baaboo-tabs").length){
        $(".nav-stacked").each(function() {
            var tabEl = jQuery(".baaboo-tabs"),
              a = tabEl.find(".nav-tabs"),
              // d = a.find(".active"),
              o = tabEl.find(".baaboo-tabs-nav-line"),
              n = a.find("> li"),
              i = !1,
              s = function() {
                var e = jQuery(".nav-tabs").find(".active");
                jQuery(".baaboo-tabs-nav-line").css({
                  "height": e.outerHeight(),
                  "top": e.offset().top - jQuery(".nav-tabs").offset().top,
                  "opacity": 1
                });
            };
            console.log(jQuery(".nav-tabs").offset().top);
            s();
            $(".active").length && s(),
            n.each(function() {
                var t = jQuery(this),
                  d = t.outerHeight(),
                  n = a.offset().top,
                  s = t.offset().top - n;
                i || (o.css("top", s), i = !0);
                t.mouseenter(function() {
                    o.css("height", d);
                    o.css("top", s);
                });
            });
            a.mouseleave(function() {
                s();
            });
        });
      } 

      function InitProgressBars(el){

        el.length && el.each(function(){
          var selft = $(this),
            progressEl = selft.find(".baaboo-pb-content"),
            titleEl = $(this).find(".baaboo-pb-title-holder"),
            percent = progressEl.data("percentage");
          $(this).appear( function() {
            // this element is now inside browser viewport
            console.log("saf");
            animateProgessBar(titleEl, percent);
            progressEl.css("width", "0%").animate({ width: percent + "%"}, 500);
          });
        });
      }
      function animateProgessBar(el, percent){
        var titleEl = $(el).find(".baaboo-pb-percent");
        $(titleEl)
          .css("opacity", "1")
          .countTo({
            from: 0,
            to: percent,
            speed: 500,
            refreshInterval: 50
          })
          .addClass("baaboo-active")
          .animate({
            left: titleEl.data("position") + "%"
          }, 500);
      }
      InitProgressBars($('.baaboo-progress-bar'));
      
      function InitPieChart(el) {
          el.length && el.each(function() {
            var pieEl = $(this).children(".baaboo-pc-percentage"),
                barColorVal = pieEl.data("bar-color") || "#25abd1",
                trackColorVal = pieEl.data("track-color") || "#f7f7f7",
                sizeVal = pieEl.data("size") || 176;
                
            pieEl.appear(function() {
              animatePercent(pieEl),
              el.css("opacity", "1"),
              pieEl.easyPieChart({
                barColor: barColorVal,
                trackColor: trackColorVal,
                scaleColor: false,
                lineCap: "butt",
                lineWidth: 3,
                animate: 1500,
                size: sizeVal
              });
            });
          });
      }
      function animatePercent(el) {
          var percentEl = el.find(".baaboo-pc-percent");
          percentEl.countTo({
              from: 0,
              to: parseFloat(percentEl.text()),
              speed: 1500,
              refreshInterval: 50
          });
      }
      InitPieChart($(".baaboo-pie-chart-holder"));
    });
    
  });
