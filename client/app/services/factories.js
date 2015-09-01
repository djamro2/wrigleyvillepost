/* global angular */
var factories = factories || angular.module('newarithemticApp.factories', []);

factories.factory('CommentService', function($resource){
	return $resource('/api/comment/:id', {id: '@Id'}, {
		update: {method: 'PUT'},
		getCommentsByArticle: {
			method: 'GET',
			url: '/api/commentsByArticle/:id',
			params: {id: '@Id'},
			isArray: true
		}
	});
});

factories.factory('EmailService', function($resource){
	return $resource('/api/email', {}, {
		update: {method: 'PUT'}
	});
});