/* global __dirname */
/* global process */

var moment = require('moment');
var path = require('path');

var Comment = require('../models/comment');
var article_data = require('../data/articles');

module.exports.getArticleById = function(req, res){
		
		var path_orig, path_full;
		
		//handle the page correctly if it ends it .html
		if(String(req.params.id).indexOf('.html') > -1)
			path_orig = String(req.params.id).replace('.html', ''); 
		else 
			path_orig = String(req.params.id);
		  
		path_full = replaceAll('-', '_', path_orig);
		
		if(idExists(path_full)){
			
			Comment.find({articleRoute: path_orig}).sort('-date').limit(50)
				.exec(function(error, result){
				
				article_data.articles[path_full].comments = result;
				article_data.articles[path_full].amountOfComments = result.length;
				
				var _randomArticles = deepClone(article_data.articles);
				getThreeRandomArticles(_randomArticles, path_full);
							
				//get the most recent article available (this is assuming newest is first)
				for(var key in article_data.articles){
					if (article_data.articles[key].image && article_data.articles[key].og_title && key != path_full){
						article_data.articles[path_full].recentArticle = article_data.articles[key];
						break;
					}
				}
				
				if (process.env.NODE_ENV === "production"){
					article_data.articles[path_full].base_url = 'http://www.wrigleyvillepost.com';
					article_data.articles[path_full].isProduction = true;
				} else {
					article_data.articles[path_full].isProduction = false;  
				}
				
			    res.render('articles/' + path_orig, article_data.articles[path_full]);
			
			});
		
		} else {
			
			res.sendFile(path.resolve(__dirname + '/../../client/app/views/404.html'));
			
		} 
		
};

module.exports.getComments = function(req, res){
	
	Comment.find({}, function(error, results){
		res.json(results);
	});
	
};

module.exports.getCommentsByArticle = function(req, res){

	var route = req.params.id;
	
	Comment.find({articleRoute: route}, function(error, result){
		res.json(result);
	});
	
};

module.exports.saveComment = function(req, res){

	var comment = new Comment(req.body);
	
	comment.formattedDateTime = moment( new Date(comment.date)).format("hh:mma MM/DD/YYYY");
	
	Comment.find( {date: { $gte : moment().add(-1, 'minutes')} }, function(error, result){
		if (comment && 
			comment.nickname.length <= 50 && 
			comment.content.length <= 500 &&
			result.length <= 10){
			comment.save(function(error, result){
				res.json(result);
			});
		} else {
			res.status(500).send('server could not save email');
		}
	});
	
};

//a unique page to see all the recent comments on the page
module.exports.viewAllComments = function(req, res){
	
	var data = {
		title: 'all comments',
		layout: 'home-layout',
		isAbout: true
	}
	if (process.env.NODE_ENV === "production"){
	    data.base_url = 'http://www.wrigleyvillepost.com';
		data.isProduction = true;
	} else {
		data.isProduction = false;
	}
	
	Comment.find({}, function(error, result){
		data.comments = result;
		res.render('allcomments', data);
	});
	
};

//helper functions

var deepClone = function(obj){
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;	
}

var idExists = function(path){
	var result = false;
	for (var key in article_data.articles){
		if (article_data.articles[path]){
			result = true;
			break;
		}
	}	
	return result;
};

var replaceAll = function(find, replace, str) {
	return str.replace(new RegExp(find, 'g'), replace);
};

var getThreeRandomArticles = function(randomArt, path){
			
	//remove the current article
	delete randomArt[path];		
	
	//remove all the objexts with no images
	for(var key in randomArt){
		if(!randomArt[key].image){
			delete randomArt[key];
		}
	}
	
	while(Object.keys(randomArt).length > 3){
		
		var randomNumber = Math.random() * Object.keys(randomArt).length;
		randomNumber = Math.floor(randomNumber + 1); //randomNumber will between 1-6
		
		var x = 0;
		for(var key in randomArt){
			x++;
			if(x == randomNumber){
				delete randomArt[key];
			}
		}
		
	}
	
	//right now randomArticles is just 3 random articles
	
	var y = 0;
	for (var key in randomArt){
		y++;
		if( y == 1){
			article_data.articles[path].firstArticle = randomArt[key];
		} else if (y == 2){
			article_data.articles[path].secondArticle = randomArt[key];
		} else {
			article_data.articles[path].thirdArticle = randomArt[key];
		}
	}
	
	return randomArt;
	
}

