'use strict';

var controllers = controllers || angular.module('newarithmeticApp.controllers', []);

controllers.controller('MiscController', ['$scope', function($scope){

	var self = this;
	
	self.init = function(){
		$scope.isMisc = 'active';	
	};
	
	$scope.submitEmail = function(subscribeObj){
		$scope.emailSubmitted = true;	
	};
	
	self.init();
	
}]);