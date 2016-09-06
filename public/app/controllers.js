var appCtrls = angular.module('AppCtrls', ['app']);
appCtrls.controller('PersonalityCtrl', ['$scope', '$http', 'UserService', function($scope, $http, UserService){
	var results;
	var big5s = [];
	var global5 = '';
	var mbti = '';
	$scope.big5s = big5s;
	$scope.needs = [];
	$scope.values = [];
	$scope.marathons = [];
	$scope.photography = [];
	$scope.hide = true;
	$scope.hideAll = true;
	$scope.hideSaveMsg = true;

	$scope.showBig5 = function(){
		$scope.hideBig5 = false;
		$scope.hideNeeds = true;
		$scope.hideValues = true;
		$scope.hideSum = true;
		$scope.hideSaveMsg = true;
	};

	$scope.showNeeds = function(){
		$scope.hideBig5 = true;
		$scope.hideNeeds = false;
		$scope.hideValues = true;
		$scope.hideSum = true;
		$scope.hideSaveMsg = true;
	};

	$scope.showValues = function(){
		$scope.hideBig5 = true;
		$scope.hideNeeds = true;
		$scope.hideValues = false;
		$scope.hideSum = true;
		$scope.hideSaveMsg = true;
	};

	$scope.showSum = function(){
		$scope.hideBig5 = true;
		$scope.hideNeeds = true;
		$scope.hideValues = true;
		$scope.hideSum = false;
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
		$scope.hideSum = true;
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
			personalityType = 'Mediator';
			rSummary = "INFP personalities are true idealists, always looking for the hint of good in even the worst of people and events, searching for ways to make things better.\
While they may be perceived as calm, reserved, or even shy, INFPs have an inner flame and passion that can truly shine. Comprising just 4% of the population, the risk of\
feeling misunderstood is unfortunately high for the INFP personality type – but when they find like-minded people to spend their time with, the harmony they feel will be a fountain of joy and inspiration.\
Few personality types are as poetic and kind-hearted as INFPs. Their altruism and vivid imagination allow INFPs to overcome many challenging obstacles, more often than not brightening the lives of those around them. \
INFPs' creativity is invaluable in many areas, including their own personal growth"
		}
		else if(global5 === 'RCUEI' || global5 === 'RLUEI' ) {
			mbti = 'INTP';
			personalityType = 'Logician';
			rSummary = "The INTP personality type is fairly rare, making up only three percent of the population, which is definitely a good thing for them, as there's nothing they'd be more unhappy about than being\
'common'. INTPs pride themselves on their inventiveness and creativity, their unique perspective and vigorous intellect. Usually known as the philosopher, the architect, or the dreamy professor, INTPs have\
 been responsible for many scientific discoveries throughout history. INTPs' intelligence and logical reasoning skills are a force to be reckoned with. Be it a minor debate or a life-changing decision, INTPs will find\
 it easy to entertain multiple ideas and keep a cool head. This allows INTPs to overcome many challenging obstacles – yet they can be easily tripped up in areas where careful and rational thinking is more of a liability than an asset.";
		}
		else if(global5 === 'RCOAI' || global5 === 'RLOAI' ) {
			mbti = 'INFJ';
			personalityType = 'Advocate';
			rSummary = "The INFJ personality type is very rare, making up less than one percent of the population, but they nonetheless leave their mark on the world. As Diplomats (NF), they have an inborn sense of idealism and morality,\
but what sets them apart is the accompanying Judging (J) trait – INFJs are not idle dreamers, but people capable of taking concrete steps to realize their goals and make a lasting positive impact. Few personality types are as sensitive and mysterious as INFJs.\
 Your imagination and empathy make you someone who not only cherishes their integrity and deeply held principles but, unlike many other idealistic types, is also capable of turning those ideals into plans, and executing them.";
		}
		else if(global5 === 'RCOEI' || global5 === 'RLOEI' ) {
			mbti = 'INTJ';
			personalityType = 'Architect';
			rSummary = "It’s lonely at the top, and being one of the rarest and most strategically capable personality types, INTJs know this all too well. INTJs form just two percent of the population, and women of this personality type are especially rare, forming just 0.8% of the population\
– it is often a challenge for them to find like-minded individuals who are able to keep up with their relentless intellectualism and chess-like maneuvering. People with the INTJ personality type are imaginative yet decisive, ambitious yet private, amazingly curious, but they do not squander their energy.\
Few personality types are as mysterious and controversial as INTJs. Possessing intellect and strategic thinking that allow them to overcome many challenging obstacles, INTJs have the ability to both develop and implement a plan for everything, including their own personal growth.";
		}
		else if(global5 === 'RCOEN' || global5 === 'RLOEN' ) {
			mbti = 'ISTJ';
			personalityType = 'Logistician';
			rSummary = "The ISTJ personality type is thought to be the most abundant, making up around 13% of the population. Their defining characteristics of integrity, practical logic and tireless dedication to duty make ISTJs a vital core to many families, as well as organizations that uphold\
traditions, rules and standards, such as law offices, regulatory bodies and military. People with the ISTJ personality type enjoy taking responsibility for their actions, and take pride in the work they do – when working towards a goal, ISTJs hold back none of their time and energy completing each relevant task with accuracy and patience.\
Few personality types are as practical and dedicated as ISTJs. Known for their reliability and hard work, ISTJs are good at creating and maintaining a secure and stable environment for themselves and their loved ones. ISTJs' dedication is invaluable in many areas, including their own personal growth.";
		}
		else if(global5 === 'RCOAN' || global5 === 'RLOAN' ) {
			mbti = 'ISFJ';
			personalityType = 'Defender';
			rSummary = "The ISFJ personality type is quite unique, as many of their qualities defy the definition of their individual traits. Though possessing the Feeling (F) trait, ISFJs have excellent analytical abilities; though Introverted (I), they have well-developed people skills and robust social relationships; and though they are a Judging (J) type,\
ISFJs are often receptive to change and new ideas. As with so many things, people with the ISFJ personality type are more than the sum of their parts, and it is the way they use these strengths that defines who they are.\
Few personality types are as practical and dedicated as ISFJs. Known for their reliability and altruism, ISFJs are good at creating and maintaining a secure and stable environment for themselves and their loved ones. ISFJs' dedication is invaluable in many areas, including their own personal growth."
		}
		else if(global5 === 'RCUEN' || global5 === 'RLUEN' ) {
			mbti = 'ISTP';
			personalityType = 'Virtuoso';
			rSummary = "ISTPs love to explore with their hands and their eyes, touching and examining the world around them with cool rationalism and spirited curiosity. People with this personality type are natural Makers, moving from project to project, building the useful and the superfluous for the fun of it, and\
learning from their environment as they go. Often mechanics and engineers, ISTPs find no greater joy than in getting their hands dirty pulling things apart and putting them back together, just a little bit better than they were before.\
Few personality types are as bold and practical as ISTPs. Known for their technical mastery and willingness to improvise, ISTPs are good at finding unique solutions to seemingly impossible challenges. ISTPs' desire to explore and learn new things is invaluable in many areas, including their own personal growth.";
		}
		else if(global5 === 'RCUAN' || global5 === 'RLUAN' ) {
			mbti = 'ISFP';
			personalityType = 'Adventurer';
			rSummary = "ISFP personality types are true artists, but not necessarily in the typical sense where they're out painting happy little trees. Often enough though, they are perfectly capable of this. Rather, it's that they use aesthetics, design and even their choices and\
actions to push the limits of social convention. ISFPs enjoy upsetting traditional expectations with experiments in beauty and behavior – chances are, they've expressed more than once the phrase 'Don't box me in!'\
Few personality types are as colorful and charming as ISFPs. Known for their kindness and artistic skills, ISFPs are great at finding exciting new things to explore and experience. ISFPs' creativity and down-to-earth attitude are invaluable in many areas, including their own personal growth."
		}
		else if(global5 === 'SCUAI' || global5 === 'SLUAI' ) {
			mbti = 'ENFP';
			personalityType = 'Campaigner';
			rSummary = "The ENFP personality is a true free spirit. Charming, independent, energetic and compassionate, the 7% of the population that they comprise can certainly be felt in any crowd.\
More than just sociable people-pleasers though, ENFPs, like all their Diplomat cousins, are shaped by their Intuitive (N) quality, allowing them to read between the lines with curiosity and energy. They tend to see life as a big, complex puzzle where everything is connected – \
but unlike Analysts, who tend to see that puzzle as a series of systemic machinations, ENFPs see it through a prism of emotion, compassion and mysticism, and are always looking for a deeper meaning.\
As they observe, forming new connections and ideas, ENFPs won't hold their tongues – they're excited about their findings, and share them with anyone who'll listen. This infectious enthusiasm has the dual benefit of giving ENFPs a chance to make more social connections, and of giving them a new source of information and experience, as they fit their new friends' opinions into their existing ideas.\
Few personality types are as creative and charismatic as ENFPs. Known for their idealism and enthusiasm, ENFPs are good at dealing with unexpected challenges and brightening the lives of those around them. ENFPs' imagination is invaluable in many areas, including their own personal growth."
		
		}
		else if(global5 === 'SCUEI' || global5 === 'SLUEI' ) {
			mbti = 'ENTP';
			personalityType = 'Debater';
			rSummary = "The ENTP personality type is the ultimate devil's advocate, thriving on the process of shredding arguments and beliefs and letting\
			the ribbons drift in the wind for all to see. Unlike their more determined Judging (J) counterparts, ENTPs don't do this because they are trying\
			 to achieve some deeper purpose or strategic goal, but for the simple reason that it's fun. No one loves the process of mental sparring more than ENTPs,\
			  as it gives them a chance to exercise their effortlessly quick wit, broad accumulated knowledge base, and capacity for connecting disparate ideas to prove their points.\
			  ENTPs intelligence, curiosity and sound reasoning skills are a force to be reckoned with. ENTPs will always be able to find just the right argument, the weakest chink in their\
			  opponent's armor, or the way out of a seemingly hopeless situation. Their fearsome debate skills and impressive knowledge allow ENTPs to overcome many challenges.;"
		}
		else if(global5 === 'SCOAI' || global5 === 'SLOAI' ) {
			mbti = 'ENFJ';
			personalityType = 'Protagonist';
			rSummary = "ENFJs are natural-born leaders, full of passion and charisma. Forming around two percent of the population, they are oftentimes our politicians, our coaches and our teachers,\
reaching out and inspiring others to achieve and to do good in the world. With a natural confidence that begets influence, ENFJs take a great deal of pride and joy in guiding others to work together to improve themselves and their community.\
Few personality types are as inspiring and charismatic as ENFJs. Their idealism and vision allow ENFJs\
to overcome many challenging obstacles, more often than not brightening the lives of those around them. ENFJs' imagination is invaluable in many areas, including their own personal growth."
		}
		else if(global5 === 'SCOEI' || global5 === 'SLOEI' ) {
			mbti = 'ENTJ';
			personalityType = 'Commander';
			rSummary = "ENTJs are natural-born leaders. People with this personality type embody the gifts of charisma and confidence, and project authority in a way that draws crowds together behind a common goal. \
But unlike their Feeling (F) counterpart, ENTJs are characterized by an often ruthless level of rationality, using their drive, determination and sharp minds to achieve whatever end they've set for themselves. \
Perhaps it is best that they make up only three percent of the population, lest they overwhelm the more timid and sensitive personality types that make up much of the rest of the world – but we have ENTJs to thank for many of the businesses and institutions we take for granted every day.\
ENTJs' intelligence, strong will and logical reasoning skills are a force to be reckoned with. Be it a minor obstacle or a seemingly impossible task, ENTJs will find a way – or make one. This fearsome determination and intellect allow ENTJs to overcome many challenges."

		}
		else if(global5 === 'SCOEN' || global5 === 'SLOEN' ) {
			mbti = 'ESTJ';
			personalityType = 'Executive';
			rSummary = "ESTJs are representatives of tradition and order, utilizing their understanding of what is right, wrong and socially acceptable to bring families and communities together. Embracing the values of honesty, dedication and dignity,\
			 people with the ESTJ personality type are valued for their clear advice and guidance, and they happily lead the way on difficult paths. Taking pride in bringing people together, ESTJs often take on roles as community organizers, working hard\
to bring everyone together in celebration of cherished local events, or in defense of the traditional values that hold families and communities together.\
Few personality types are as practical and strong-willed as ESTJs. Known for their reliability and administrative skills, ESTJs are good at creating and maintaining a secure and stable environment for themselves and their loved ones. ESTJs' dedication is invaluable in many areas, including their own personal growth."
		}
		else if(global5 === 'SCOAN' || global5 === 'SLOAN' ) {
			mbti = 'ESFJ';
			personalityType = 'Consul';
			rSummary = "People who share the ESFJ personality type are, for lack of a better word, popular. ESFJs are the cheerleaders and the quarterbacks, setting the tone, taking the spotlight and leading their teams forward to victory and fame. Later in life, \ ESFJs continue to enjoy supporting their friends and loved ones, organizing social gatherings and doing their best to make sure everyone is happy.";
		}
		else if(global5 === 'SCUEN' || global5 === 'SLUEN' ) {
			mbti = 'ESTP';
			personalityType = 'Entrepreneur';
			rSummary = "ESTP personality types always have an impact on their immediate surroundings – the best way to spot them at a party is to look for the whirling eddy of people flitting about them as they\
move from group to group. Laughing and entertaining with a blunt and earthy humor, ESTP personalities love to be the center of attention. If an audience member is asked to come on stage, ESTPs volunteer – \
or volunteer a shy friend. Theory, abstract concepts and plodding discussions about global issues and their implications don't keep ESTPs interested for long. ESTPs keep their conversation energetic, with a\
 good dose of intelligence, but they like to talk about what is – or better yet, to just go out and do it. ESTPs leap before they look, fixing their mistakes as they go, rather than sitting idle, preparing contingencies and escape clauses.\
 Few personality types are as charming and attractive as ESTPs. Known for their ability to improvise and focus completely on the present, ESTPs are great at finding exciting new things to explore and experience. ESTPs' creativity and down-to-earth attitude are invaluable in many areas, including their own personal growth."
		}
		else if(global5 === 'SCUAN' || global5 === 'SLUAN' ) {
			mbti = 'ESFP';
			personalityType = 'Entertainer';
			rSummary = "If anyone is to be found spontaneously breaking into song and dance, it is the ESFP personality type. ESFPs get caught up in the excitement of the moment, and want everyone else to feel that way, too. No other personality\
type is as generous with their time and energy as ESFPs when it comes to encouraging others, and no other personality type does it with such irresistible style.\
Few personality types are as charming and attractive as ESFPs. Known for their ability to improvise and focus completely on the present, ESFPs are great at finding exciting new things to explore and experience. ESFPs' energy,\
 enthusiasm and down-to-earth attitude are invaluable in many areas, including their own personal growth.";
		}

		$scope.mbti = mbti;
		$scope.personalityType = personalityType;
		$scope.rSummary = rSummary;
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
			url: '/api/personality/' + 1
		}
		$http(req).then(function success(res) {
			var parsed = JSON.parse(res.data.data);
			reformat(parsed);
		})
		.catch(function(res){
			console.log(res);
		});
	}

	$scope.getMarathonEvents = function(){
        var req = {
          url: "https://www.eventbriteapi.com/v3/events/search/?q=marathon&sort_by=date&venue.city=seattle&token=H7RQ4AALH3XDVOVNJGJJ"
        };
        $http(req).success(function(data){      
        console.log(data.events);  
            if(data){
                $scope.marathons = data.events;
            }else{
                $scope.marathons=[];
            }

        })
        .catch(function(data){
        	console.log("error");
        });
    }

  $scope.getPhotographyEvents = function(){
      var req = {
        url: "https://www.eventbriteapi.com/v3/events/search/?q=photography&sort_by=date&venue.city=seattle&token=H7RQ4AALH3XDVOVNJGJJ"
      };
      $http(req).success(function(data){      
      console.log(data.events);  
          if(data){
              $scope.photography = data.events;
          }else{
              $scope.photography=[];
          }

      })
      .catch(function(data){
      	console.log("error");
      });
  }

}]);



