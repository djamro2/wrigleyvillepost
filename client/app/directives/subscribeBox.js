'use strict';

var directives = directives || angular.module('newarithmeticApp.directives', []);

directives.directive('subscribeBox', function(){
	return {
	    restrict: 'AE',
	    templateUrl: '/client/app/views/partials/subscribebox.html'
    };
});