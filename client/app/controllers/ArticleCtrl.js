/* global angular */
/* global moment */
'use strict';

angular.module('newarithmeticApp.controllers', [])
	.controller('ArticleController', ['$scope', '$resource', 'CommentService', 'EmailService', '$timeout',
		function($scope, $resource, CommentService, EmailService, $timeout){
		
		var self = this;
		$scope.allComments = [];
		
		$scope.commentTimeArray = [];
		$scope.emailTimeArray = [];
		
		self.init = function(){
			$scope.isHome = '';
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
		
		$scope.submitComment = function(_comment){
			
			var underTimeLimit = self.checkIfUnderTimeLimit($scope.commentTimeArray);
			
			if (underTimeLimit &&
				_comment && 
				_comment.nickname.length < 51 && 
				_comment.content.length < 501) {
			
				CommentService.save(_comment, function(result){
					$scope.commentSaved = true;
					
					$scope.comment.content = '';
					$scope.comment.nickname = '';
					
					$scope.allComments.unshift(result);
					
					$scope.amountOfComments++;
					$scope.commentTimeArray.push(moment());
					
					$scope.errorMessage = false;
				}, function(error){
					$scope.commentSaved = false;
					$scope.erorrMessage = 'the server could not save the comment';
				});
			
			} else if (_comment.nickname.length > 50){
				$scope.commentSaved = false;
				$scope.errorMessage = 'nickname must be less than 50 characters, is: ' + _comment.nickname.length;
			} else if (_comment.content.length > 500) {
				$scope.commentSaved = false;
				$scope.errorMessage = 'comment content must be less than 500 characters, is ' + _comment.content.length;
			} else if (!underTimeLimit){
				$scope.commentSaved = false;
				$scope.errorMessage = 'you have submitted too many comments recently';
		    } else {
				$scope.commentSaved = false;
				$scope.errorMessage = 'there was a problem saving the comment';
			}
			
		};
		
		$scope.getFormattedDate = function(date){
			return moment(new Date(date)).format("hh:mma MM/DD/YYYY");	
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