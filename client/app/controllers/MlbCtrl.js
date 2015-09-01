'use strict';

var controllers = controllers || angular.module('newarithmeticApp.controllers', []);

controllers.controller('MlbController', ['$scope', function($scope){

	var self = this;
	
	self.init = function(){
		$scope.isMlb = 'active';	
	};
	
	$scope.submitEmail = function(subscribeObj){
		$scope.emailSubmitted = true;	
	};
	
	self.init();
	
}]);