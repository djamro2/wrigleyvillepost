/* global process */

var article_data = require('../data/articles');

//all of this seems to be pretty repetive, any way I can make it more efficient??

module.exports.getHomePage = function(req, res){
	
	  var data = {
	    title: 'wrigleyvillepost',
	    tab: 'home',
	    layout: 'home-layout'
	  };
	  if (process.env.NODE_ENV === "production"){
	    data.base_url = 'http://www.wrigleyvillepost.com';
		data.isProduction = true;
	  } else {
		data.isProduction = false;
	  }
	  
	  //get articles to put in the page itself
	  data.articles = [];
	  var counter = 0;
	  for(var key in article_data.articles){
		  if (article_data.articles[key].tabs.indexOf("home/") > -1){
			  if (article_data.articles[key].og_title
				  && article_data.articles[key].image){
			  		data.articles.push(article_data.articles[key]);
			  		counter++;
			  	}
		  }
		  if(counter >= 20){
			  break;
		  }
	  }
	  
	  res.render('indexpage', data);
	
};

module.exports.getCubsnewsPage = function(req, res){
	  var data = {
	    title: 'wrigleyvillepost - cubs news',
	    tab: 'cubsnews',
	    layout: 'home-layout'
	  };
	  if (process.env.NODE_ENV === "production"){
	    data.base_url = 'http://www.wrigleyvillepost.com';
		data.isProduction = true;
	  } else {
		data.isProduction = false;
	  }
	  data.articles = [];
	  var counter = 0;
	  for(var key in article_data.articles){
		  if (article_data.articles[key].tabs.indexOf("cubsnews/") > -1){
			  if (article_data.articles[key].og_title
				  && article_data.articles[key].image){
			  		data.articles.push(article_data.articles[key]);
			  		counter++;
			  	}
		  }
		  if(counter >= 20){
			  break;
		  }
	  }
	  res.render('indexpage', data);
};

module.exports.getMlbPage = function(req, res){
	  var data = {
	    title: 'wrigleyvillepost - mlb',
	    tab: 'mlb',
	    layout: 'home-layout'
	  };
	  if (process.env.NODE_ENV === "production"){
	    data.base_url = 'http://www.wrigleyvillepost.com';
		data.isProduction = true;
	  } else {
		data.isProduction = false;
	  }
	  data.articles = [];
	  var counter = 0;
	  for(var key in article_data.articles){
		  if (article_data.articles[key].tabs.indexOf("mlb/") > -1){
			  data.articles.push(article_data.articles[key]);
			  counter++;
		  }
		  if(counter >= 20){
			  break;
		  }
	  }
	  res.render('indexpage', data);
};


module.exports.getMiscPage = function(req, res){
	  var data = {
	    title: 'wrigleyvillepost - misc',
	    tab: 'misc',
	    layout: 'home-layout'
	  };
	  if (process.env.NODE_ENV === "production"){
	    data.base_url = 'http://www.wrigleyvillepost.com';
		data.isProduction = true;
	  } else {
		data.isProduction = false;  
	  }
	  data.articles = [];
	  var counter = 0;
	  for(var key in article_data.articles){
		  if (article_data.articles[key].tabs.indexOf("misc/") > -1){
			  if (article_data.articles[key].og_title
				  && article_data.articles[key].image){
			  		data.articles.push(article_data.articles[key]);
			  		counter++;
			  	}
		  }
		  if(counter >= 20){
			  break;
		  }
	  }
	  res.render('indexpage', data);
};

module.exports.getAboutPage = function(req, res){
	  var data = {
	    title: 'about wrigleyvillepost',
	    tab: 'about',
	    layout: 'home-layout',
		isAbout: true
	  };
	  if (process.env.NODE_ENV === "production"){
	    data.base_url = 'http://www.wrigleyvillepost.com';
		data.isProduction = true;
	  } else {
		data.isProduction = false;  
	  }
	  res.render('about', data);
};
