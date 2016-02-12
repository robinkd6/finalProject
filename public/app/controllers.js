var appCtrls = angular.module('AppCtrls', ['app']);
appCtrls.controller('PersonalityCtrl', ['$scope', '$http', 'UserService', function($scope, $http, UserService){
	var results;
	var big5s = [];
	var global5 = '';
	var mbti = '';
	$scope.big5s = big5s;
	$scope.needs = [];
	$scope.values = [];
	$scope.hide = true;
	$scope.hideAll = true;
	$scope.hideSaveMsg = true;

	$scope.showBig5 = function(){
		$scope.hideBig5 = false;
		$scope.hideNeeds = true;
		$scope.hideValues = true;
		$scope.hideSaveMsg = true;
	};

	$scope.showNeeds = function(){
		$scope.hideBig5 = true;
		$scope.hideNeeds = false;
		$scope.hideValues = true;
		$scope.hideSaveMsg = true;
	};

	$scope.showValues = function(){
		$scope.hideBig5 = true;
		$scope.hideNeeds = true;
		$scope.hideValues = false;
		$scope.hideSaveMsg = true;
	};

	$scope.wordCount = function(text) {
	    var s = text ? text.split(/\s+/) : 0; // it splits the text on space/tab/enter
	    return s ? s.length : '';
	};

	$scope.analyze = function(summary){
		var req = {
		  url: '/api/personality/analyze/' + summary
		}
		$http(req).then(function success(res) {
			if(res.data.tree){
				$scope.wordCount = res.data.word_count;
				results = JSON.stringify(res);
				reformat(res);
				
			} else if(res.data.error){
				$scope.hideAll = true;
				$scope.hideError = false;
				$scope.err = res.data.error;
			}
		});
	}

	var reformat = function(res){
		$scope.hideAll = false;
		$scope.hideNeeds = true;
		$scope.hideValues = true;
		$scope.hideError = true;
		var personality = res.data.tree.children[0].children[0].children;
		$scope.needs = res.data.tree.children[1].children[0].children;
		$scope.values = res.data.tree.children[2].children[0].children;

		// Rearrange traits to conform to Global 5 pattern
		big5s.push(personality[2]);
		big5s.push(personality[4]);
		big5s.push(personality[1]);
		big5s.push(personality[3]);
		big5s.push(personality[0]);

		// Mapping Big 5 to Global 5
		big5s.forEach(function(big5){
			if(big5.name === 'Extraversion' && big5.percentage * 100 >= 50){
				global5 = global5.concat('S');
			}
			else if(big5.name === 'Extraversion' && big5.percentage * 100 < 50){
				global5 = global5.concat('R');
			}
			else if(big5.name === 'Emotional range' && big5.percentage * 100 >= 50){
				global5 = global5.concat('L');
			}
			else if(big5.name === 'Emotional range' && big5.percentage * 100 < 50){
				global5 = global5.concat('C');
			}
			else if(big5.name === 'Conscientiousness' && big5.percentage * 100 >= 50){
				global5 = global5.concat('O');
			}
			else if(big5.name === 'Conscientiousness' && big5.percentage * 100 < 50){
				global5 = global5.concat('U');
			}
			else if(big5.name === 'Agreeableness' && big5.percentage * 100 >= 50){
				global5 = global5.concat('A');
			}
			else if(big5.name === 'Agreeableness' && big5.percentage * 100 < 50){
				global5 = global5.concat('E');
			}
			else if(big5.name === 'Openness' && big5.percentage * 100 >= 50){
				global5 = global5.concat('I');
			}
			else if(big5.name === 'Openness' && big5.percentage * 100 < 50){
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
	}

	$scope.saveResult = function(){
		$http.post('/api/personality/save', results)
		.then(function success(res){
			$scope.hideSaveMsg = false;
			$scope.alert = 'Your personality results had been saved successfully.';
		})
		.catch(function(res){
			$scope.hideSaveMsg = false;
			$scope.alert = 'There was an error saving your result, please try again later.';
		});
	}

	// profile page init load function
	$scope.getResult = function(){
		var req = {
			url: '/api/personality/' + 9
		}
		$http(req).then(function success(res) {
			var parsed = JSON.parse(res.data.data);
			reformat(parsed);
		})
		.catch(function(res){
			console.log(res);
		});
	}

}]);

appCtrls.controller('signupCtrl', ['$scope', '$http', 'UserService', function($scope, $http, UserService){
	$scope.firstName = null;
	$scope.lastName = null;
	$scope.email = null;
	$scope.password = null;

	$scope.signup = function(){
		var usrObj = {
			firstName: $scope.firstName,
			lastName: $scope.lastName,
			email: $scope.email,
			password: $scope.password
		}

		UserService.create(usrObj);
		console.log($scope);
	}
}]);
//login controller 
appCtrls.controller('loginCtrl', ['$scope', '$http', 'UserService', function($scope, $http, UserService) {
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


