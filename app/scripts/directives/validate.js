'use strict';

/**
 * @ngdoc directive
 * @name baabooApp.directive:validate
 * @description
 * # validate
 */
angular.module('baabooApp')
  .directive('isAvailable', function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, elm, attrs, ngModel) {
        var usernames = ['Jim', 'John', 'Jill', 'Jackie'];
        ngModel.$parsers.push(function(value) {
          if(!value || value.length === 0) return;
          ngModel.$setValidity('isAvailable', usernames.indexOf(value) === -1); 
          console.log(value);
          return value;
        });
      }
    };
  })

  .directive('customEmail', function() {
    var emailRegexp = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@example\.com$/i;
    return {
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {
        // only apply the validator if ngModel is present and Angular has added the email validator
        if (ctrl && ctrl.$validators.email) {
        // this will overwrite the default Angular email validator
        ctrl.$validators.email = function(modelValue) {
          return ctrl.$isEmpty(modelValue) || emailRegexp.test(modelValue);
        };
        }
      }
    };
  })

  .directive('passwordVerify', function() {
    return {
      restrict: 'A', 
      require: '?ngModel', // get a hold of NgModelController
      link: function(scope, elem, attrs, ngModel) {
        // watch own value and re-validate on change
        scope.$watch(attrs.ngModel, function() {
          validate();
        });

        // observe the other value and re-validate on change
        attrs.$observe('passwordVerify', function() {
          validate();
        });

        var validate = function() {
          ngModel.$setValidity('passwordVerify', ngModel.$viewValue === attrs.passwordVerify);
        };
      }
    };
  })

  .directive('isName', function() {
    return {
      require : 'ngModel',
      link : function(scope, element, attrs, ngModel) {
        ngModel.$parsers.push(function(value) {
          if(!value || value.length === 0) return;
          ngModel.$setValidity('isName', /^[a-zA-Z](\s{0,1}[a-zA-Z])*[^\s]$/.test(value));   
          return value;
        });
      }
    };
  })

  .directive('isPhone', function() {
    return {
      require : 'ngModel',
      link : function(scope, element, attrs, ngModel) {
        ngModel.$parsers.push(function(value) {
          if(!value || value.length === 0) return;
          ngModel.$setValidity('isPhone', /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(value)); 
          // ngModel.$setValidity('isPhone', /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/.test(value)); 
          return value;
        });
      }
    };
  })
  // (123) 456-7890
  // 123-456-7890
  // 123.456.7890
  // 1234567890
  // +31636363634
  // 075-63546725
  
  .directive('isSpecialChar', function() {
    return {
      require : 'ngModel',
      link : function(scope, element, attrs, ngModel) {
        ngModel.$parsers.push(function(value) {
          if(!value || value.length === 0) return;
          ngModel.$setValidity('isSpecialChar', /[^A-Za-z0-9 ]/i.test(value)); 
          return value;
        });
      }
    };
  });
