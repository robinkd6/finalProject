var appCtrls = angular.module('AppCtrls', []);
appCtrls.controller('PersonalityCtrl', ['$scope', '$http', function($scope, $http){
	$scope.hide = true;

	$scope.analyze = function(){
		var big5s = [];
		$scope.big5s = big5s;
		$scope.needs = [];
		$scope.values = [];

		var req = {
		  url: '/api/personality/analyze/'+$scope.summary
		}
		$http(req).then(function success(res) {
			if(Array.isArray(res.data)){
				var global5 = '';
				var mbti = '';
				$scope.hide = false;
				$scope.hideError = true;
				var personality = res.data[0].children[0].children;
				$scope.needs = res.data[1].children[0].children;
				$scope.values = res.data[2].children[0].children;

				// Rearrange traits to conform to Global 5 pattern
				big5s.push(personality[2]);
				big5s.push(personality[4]);
				big5s.push(personality[1]);
				big5s.push(personality[3]);
				big5s.push(personality[0]);

				// Mapping Big 5 to Global 5
				big5s.forEach(function(big5){
					if(big5.name === 'Extraversion' && big5.percentage >= 50){
						global5 = global5.concat('S');
					}
					else if(big5.name === 'Extraversion' && big5.percentage < 50){
						global5 = global5.concat('R');
					}
					else if(big5.name === 'Emotional range' && big5.percentage >= 50){
						global5 = global5.concat('L');
					}
					else if(big5.name === 'Emotional range' && big5.percentage < 50){
						global5 = global5.concat('C');
					}
					else if(big5.name === 'Conscientiousness' && big5.percentage >= 50){
						global5 = global5.concat('O');
					}
					else if(big5.name === 'Conscientiousness' && big5.percentage < 50){
						global5 = global5.concat('U');
					}
					else if(big5.name === 'Agreeableness' && big5.percentage >= 50){
						global5 = global5.concat('A');
					}
					else if(big5.name === 'Agreeableness' && big5.percentage < 50){
						global5 = global5.concat('E');
					}
					else if(big5.name === 'Openness' && big5.percentage >= 50){
						global5 = global5.concat('I');
					}
					else if(big5.name === 'Openness' && big5.percentage < 50){
						global5 = global5.concat('N');
					}
				});

				$scope.global5 = global5;
				
				// Mapping Global 5 to Myers Briggs
				if(global5 === 'RCUAI' || global5 === 'RLUAI' ) {
					mbti = 'INFP';
				}
				else if(global5 === 'RCUEI' || global5 === 'RLUEI' ) {
					mbti = 'INTP';
				}
				else if(global5 === 'RCOAI' || global5 === 'RLOAI' ) {
					mbti = 'INFJ';
				}
				else if(global5 === 'RCOEI' || global5 === 'RLOEI' ) {
					mbti = 'INTJ';
				}
				else if(global5 === 'RCOEN' || global5 === 'RLOEN' ) {
					mbti = 'ISTJ';
				}
				else if(global5 === 'RCOAN' || global5 === 'RLOAN' ) {
					mbti = 'ISFJ';
				}
				else if(global5 === 'RCUEN' || global5 === 'RLUEN' ) {
					mbti = 'ISTP';
				}
				else if(global5 === 'RCUAN' || global5 === 'RLUAN' ) {
					mbti = 'ISFP';
				}
				else if(global5 === 'SCUAI' || global5 === 'SLUAI' ) {
					mbti = 'ENFP';
				}
				else if(global5 === 'SCUEI' || global5 === 'SLUEI' ) {
					mbti = 'ENTP';
				}
				else if(global5 === 'SCOAI' || global5 === 'SLOAI' ) {
					mbti = 'ENFJ';
				}
				else if(global5 === 'SCOEI' || global5 === 'SLOEI' ) {
					mbti = 'ENTJ';
				}
				else if(global5 === 'SCOEN' || global5 === 'SLOEN' ) {
					mbti = 'ESTJ';
				}
				else if(global5 === 'SCOAN' || global5 === 'SLOAN' ) {
					mbti = 'ESFJ';
				}
				else if(global5 === 'SCUEN' || global5 === 'SLUEN' ) {
					mbti = 'ESTP';
				}
				else if(global5 === 'SCUAN' || global5 === 'SLUAN' ) {
					mbti = 'ESFP';
				}

				$scope.mbti = mbti;

			} else if(!Array.isArray(res.data)){
				$scope.hide = true;
				$scope.hideError = false;
				$scope.err = res.data.error;
			}
		});
	}
}]);

appCtrls.controller('signupCtrl', ['$scope', '$http', function($scope, $http){
	$scope.firstName = null;
	$scope.lastName = null;
	$scope.email = null;
	$scope.password = null;

	$scope.signup = function(){
		console.log($scope);
	}
}]);
//login controller 
appCtrls.controller('loginCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.user = {};
    $scope.loginUser=function()
    {
        var username=$scope.user.name;
        var password=$scope.user.password;
        if(username=="" && password=="")
        {
            page.setUser($scope.user);
            $location.path( "/home" );
        }
        else
        {
            $scope.message="Error";
            $scope.messagecolor="alert alert-danger";
        }
    };
}]);
