var app = angular.module('PersonalityApp', ['ngRoute', 'AppCtrls']);

//console.log('Inside the angular script', app);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'app/views/home.html',
    controller: 'PersonalityCtrl'
  })
  .when('/analyze', {
  	templateUrl: 'app/views/analyze.html'
  })
  .when('/signup', {
    templateUrl: 'app/views/signup.html',
    controller: 'signupCtrl'
  })
  .when('/login', {
    templateUrl: 'app/views/login.html'
  })
  .otherwise({
    templateUrl: 'app/views/404.html'
  });
  $locationProvider.html5Mode(true);
  //$locationProvider.html5Mode(false).hashPrefix("!");
}]);
