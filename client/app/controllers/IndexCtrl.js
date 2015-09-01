/* global angular */
'use strict';

//var controllers = controllers || angular.module('newarithmeticApp.controllers', []);
angular.module('newarithmeticApp.controllers', [])
	.controller('IndexController', ['$scope', '$location', 'EmailService', '$timeout',
		function($scope, $location, EmailService, $timeout){
	
		var self = this;
		
		self.init = function(){
			//nothing right now	
			$scope.isHome = 'active';
		};
		
		self.checkIfUnderTimeLimit = function(array){
		
			var result = false;
			
			//5th save should be okay, 6th not
			if (array.length < 5){
				result = true;
			} else if (array[array.length - 5] <= moment().add(-1, 'minutes')){
				result = true;
			} else {
				result = false;
			}
			
			return result;
			
		};
		
		self.setAllTabsFalse = function(){
			$scope.homeTab = false;
			$scope.cubsnewsTab = false;
			$scope.mlbTab = false;
			$scope.miscTab = false;	
			$scope.aboutTab = false;
		};
		
		$scope.selectTab = function(val){
			self.setAllTabsFalse();
			switch(val){
				case 'home':
					$scope.homeTab = 'active'; break;
				case 'cubsnews':
					$scope.cubsnewsTab = 'active'; break;
				case 'mlb':
					$scope.mlbTab = 'active'; break;
				case 'misc':
					$scope.miscTab = 'active'; break;
				case 'about':
					$scope.aboutTab = 'active'; break;
				default:
					$scope.homeTab = 'active';
			}
		};
		
		$scope.submitEmail = function(subscribeObj){
			
			var underTimeLimit = self.checkIfUnderTimeLimit($scope.emailTimeArray);
			
			if (underTimeLimit){
			
				EmailService.save(subscribeObj, function(result){
					$scope.subscribe.email = '';
					$scope.subscribe.option = 'all';
					
					$scope.isError = false;
					$scope.emailSubmitted = true;
					
					$scope.emailTimeArray.push(moment());
					
					$timeout(function(){
						$scope.emailSubmitted = false;
					}, 1000);
					
				}, function(error){
					$scope.isError = true;
					$scope.emailSubmitted = false;
					$scope.isOverTimeLimit = false;
				});
			
			} else if (!underTimeLimit) {
				$scope.isError = false;
				$scope.emailSubmitted = false;
				$scope.isOverTimeLimit = true;
			}
			
		};
		
		self.init();
		
	}]);