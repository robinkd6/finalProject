var appCtrls = angular.module('AppCtrls', []);
appCtrls.controller('PersonalityCtrl', ['$scope', '$http', function($scope, $http){
	// $scope.hikes = [];
	// $scope.hikesTrimmed = [];
	// $scope.searchTerm = '';
	// $scope.results = [];

	// var searchHikes = function(){
	// 	if($scope.hikes.indexOf($scope.searchTerm) !=-1 && $scope.searchTerm != ''){
	// 		$scope.hikes.forEach(function(hike){
	// 			$scope.results.push(hike);
	// 		})
	// 	};
	// }
	$scope.$watch(function(){
		return $scope.summary;
	}, function(oldVal,newVal){
		console.log($scope.summary);
	})

	//  var req = {
	//     url: /api/personality/analyze/'+$scope.summary,
	//     method: 'GET',
	//     params: {
	//       key: 'a757f393826253f1dc087832b0083fda38ef2c8149f2cd7913d877d8f74a3f11'
	//     }
	//  }

	// $http(req).then(function success(res) {
	// 	res.data.forEach(function(hike){
	// 		var endIndex = hike.description.indexOf('<');

	// 		var newName = hike.description.substring(0, endIndex - 1);
	// 		$scope.hikesTrimmed.push(hike);
	// 	});
	// }, function error(res) {
	// 	console.log(res);
	// });

}]);
