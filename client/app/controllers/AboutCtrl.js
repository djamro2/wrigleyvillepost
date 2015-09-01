'use strict';

var controllers = controllers || angular.module('newarithmeticApp.controllers', []);

controllers.controller('AboutController', ['$scope', function($scope){

	var self = this;
	
	self.init = function(){
		$scope.isAbout = 'active';	
	};
	
	$scope.submitEmail = function(subscribeObj){
		$scope.emailSubmitted = true;	
	};
	
	self.init();
	
}]);