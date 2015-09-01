
var Email = require('../models/email');
var moment = require('moment');

module.exports.saveEmail = function(req, res){
	
	var email = new Email(req.body);
	
	//make sure that there have been no more than 3 emails in the past minute
	Email.find( {date: { $gte : moment().add(-1, 'minutes')} }, function(error, result){
		//make sure that the email object here is okay
		if (email.email && email.email.length <= 100 && result.length <= 3){
			email.save(function(error, result){
				res.json(result);
			});
		} else {
			res.status(500).send('server could not save email');
		}		
	});

	
};