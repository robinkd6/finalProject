var appCtrls = angular.module('AppCtrls', []);
appCtrls.controller('PersonalityCtrl', ['$scope', '$http', function($scope, $http){
	// $scope.$watch(function(){
	// 	return $scope.summary;
	// }, function(oldVal,newVal){
	// 	console.log($scope.summary);
	// })
	$scope.analyze = function(){
		var req = {
		  url: '/api/personality/analyze/'+$scope.summary
		}
		$http(req).then(function success(res) {
			console.log(res);
		});
	}

}]);
