/* global process */
/* global __dirname */

var moment = require('moment');

var ArticleController = require('./controllers/ArticleController');
var EmailController = require('./controllers/EmailController');
var IndexController = require('./controllers/IndexController');
var Comment = require('./models/comment');
var article_data = require('./data/articles');

module.exports = function(app, article_data){
	
	//routing for the different home pages
	app.get('/', IndexController.getHomePage);
	
	app.get('/home', IndexController.getHomePage);
	
	app.get('/cubsnews', IndexController.getCubsnewsPage);
	
	app.get('/mlb', IndexController.getMlbPage);
	
	app.get('/misc', IndexController.getMiscPage);
	
	app.get('/about', IndexController.getAboutPage);
	
	//routing for the articles
	app.get('/views/articles/:id', ArticleController.getArticleById);
	
	app.post('/api/comment', ArticleController.saveComment);
	
	app.get('/api/comment', ArticleController.getComments);
	
	app.get('/api/commentsByArticle/:id', ArticleController.getCommentsByArticle);
	
	app.get('/view/allComments', ArticleController.viewAllComments);
	
	app.post('/api/email', EmailController.saveEmail)

}