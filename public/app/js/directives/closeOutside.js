'use strict';

angular
  .module('app')
  .directive('closeOutside', closeOutside);

function closeOutside($document) {

  return {
    restrict: 'A',
    transclude: true,
    scope: {
      'close': '&'
    },
    template: "<div ng-transclude></div>",
    link: function (scope, element) {

      function handler(event) {
        if (!element[0].contains(event.target)) {
          scope.$apply(scope.close());
        }
      }

      // close dialog with click outside
      $document.on('click', handler);

      // close dialog with ESC key
      $document.on("keydown", function (event) {
        if (event.keyCode == 27) {
          scope.$apply(scope.close());
        }
      });

      scope.$on('$destroy', function () {
        $document.off('click', handler);
      });

    }
  };
}