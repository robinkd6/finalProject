angular.module('app').directive("footer", function() {
  return {
  	restrict: 'A',
    templateUrl: 'views/partials/footer.html',
    scope: true,
    transclude : false,
    controller: 'FooterController'
  };
});

