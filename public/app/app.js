var app = angular.module('MyApp', ['satellizer']);
 app.config(function($authProvider) {
  	$authProvider.facebook ({
  		clientID: '1264972500185214',
			clientSecret: '9a64096e02523e71a97b14665c68511f',
			callbackURL: 'http://127.0.0.1:1337/auth/facebook/callback'
  	});
  	}