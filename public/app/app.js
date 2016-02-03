var app = angular.module('PersonalityApp', ['ngRoute', 'AppCtrls']);

//console.log('Inside the angular script', app);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'app/views/analyze.html',
    controller: 'PersonalityCtrl'
  })
  .when('/home', {
  	templateUrl: 'app/views/home.html'
  })
  .otherwise({
    templateUrl: 'app/views/404.html'
  });
  $locationProvider.html5Mode(true);
  //$locationProvider.html5Mode(false).hashPrefix("!");
}]);
