var app = angular.module('WatsonApp', ['ngRoute', 'WatsonCtrls']);

//console.log('Inside the angular script', app);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
  .when('/analyze', {
    templateUrl: 'app/views/analyze.html',
    controller: 'WatsonCtrl'
  })
  .otherwise({
    templateUrl: 'app/views/404.html'
  });

  $locationProvider.html5Mode(true);
  //$locationProvider.html5Mode(false).hashPrefix("!");
}]);