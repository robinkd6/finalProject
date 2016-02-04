var appCtrls = angular.module('AppCtrls', []);
appCtrls.controller('PersonalityCtrl', ['$scope', '$http', function($scope, $http){
	$scope.hide = true;
	$scope.analyze = function(){
		$scope.big5s = [];
		$scope.openness = [];
		$scope.conscientiousness = [];
		$scope.extraversion = [];
		$scope.agreeableness = [];
		$scope.neuroticism = [];
		var req = {
		  url: '/api/personality/analyze/'+$scope.summary
		}
		$http(req).then(function success(res) {
			console.log(res.data);
			if(Array.isArray(res.data)){
				$scope.hide = false;
				$scope.hideError = true;
				var personality = res.data[0].children[0].children;
				console.log(personality);
				for (var i = 0; i < personality.length; i ++) {
					$scope.big5s.push(personality[i]);
				} 
			} else if(!Array.isArray(res.data)){
				$scope.hide = true;
				$scope.hideError = false;
				$scope.err = res.data.error;
			}
		});
	}
}]);
