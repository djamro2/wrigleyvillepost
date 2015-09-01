/* global process */
/* global __dirname */

//packages
var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var csrf = require('csurf');
var milb = require('./server/milbData');
var local_codes = require('local_codes');

//local
var article_data = require('./server/data/articles');
var articleController = require('./server/controllers/ArticleController');

var app = express();
var hbs = exphbs.create({ /* config */ });

process.env.NODE_ENV="development";

if (process.env.NODE_ENV === "production")
{
  mongoose.connect('mongodb://' + local_codes.internal_ip + ':' + local_codes.data_port + '/wrigleyvillepost');
  var server = app.listen(local_codes.port, local_codes.internal_ip, function(){
  var host = server.address().address;
  var port = server.address().port;
  console.log('Wrigleyvillepost listening at http://%s:%s', host, port);
  });
} else if (process.env.NODE_ENV === "development")
{
  
  mongoose.connect('mongodb://localhost:27017/wrigleyvillepost');
  var server = app.listen(8000, function(){
  var host = server.address().address;
  var port = server.address().port;
  console.log('Wrigleyvillepost at http://%s:%s', host, port);
  });
}

//handlebars engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('client'));
app.use('/client', express.static(__dirname + '/client'));


//needs to be after middleware
require('./server/routes')(app);

//404 page, page not found, keep after routes require
app.get('*', function(req, res){
	  res.sendFile(__dirname + '/client/app/views/404.html');
});

//minor league bot
//'519333'//szczur

milb.scrapePlayer('519333', function(result){
	console.log(result);
});

var replaceAll = function(find, replace, str) {
  return str.replace(new RegExp(find, 'g'), replace);
};

