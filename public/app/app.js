var app = angular.module('PersonalityApp', ['ngRoute', 'AppCtrls', 'auth0', 'angular-storage', 'angular-jwt']);

//console.log('Inside the angular script', app);


app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider, $httpProvider, jwtInterceptorProvider) {
  

  $routeProvider
  .when('/', {
    templateUrl: 'app/views/home.html'
  })
  .when('/analyze', {
  	templateUrl: 'app/views/analyze.html',
    controller: 'PersonalityCtrl'
  })
  .when('/about', {
    templateUrl: 'app/views/about.html',
  })
  .when('/profile', {
    templateUrl: 'app/views/profile.html',
    controller: 'PersonalityCtrl'
  })
  .when('/signup', {
    templateUrl: 'app/views/signup.html',
    controller: 'signupCtrl'
  })
  .when('/login', {
    templateUrl: 'app/views/login.html',
    controller: 'loginCtrl'
  })

  .otherwise({
    templateUrl: 'app/views/404.html'
  });
  $locationProvider.html5Mode(true);
  //$locationProvider.html5Mode(false).hashPrefix("!");
}]);

