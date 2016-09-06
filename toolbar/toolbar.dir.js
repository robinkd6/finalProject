(function() {

	'use strict';

	angular
	.module('PersonalityApp')
	.directive('toolbar', toolbar);

	function toolbar() {
		return {
			templateUrl :'/toolbar/toolbar.tpl.html',
			controller: toolbarController,
			controllerAs: 'toolbar'
		};
	}

	function toolbarController(auth, store, $location) {

		var vm = this;
		vm.login = login;
		vm.logut = logut;
		vm.auth = auth;

		function login() {
			auth.signin({}, function(profile, token) {
				store.set('profile, profile');
				store.set('id_token', token);
				$location.path('/analyze');
			}, function(err) {
				console.log(err);
			});
		}

		function logout() {
			store.remove('profile');
			store.remove('id_token');
			auth.signout();
			$location.path('/')
		}
	}
})();