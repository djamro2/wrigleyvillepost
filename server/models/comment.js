var mongoose = require('mongoose');

module.exports = mongoose.model('Comment', {
	content: String,
	nickname: String,
	articleRoute: String,
	formattedDateTime: String,
	date: {type: Date, default: Date.now }
});