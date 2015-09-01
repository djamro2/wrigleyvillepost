var mongoose = require('mongoose');

module.exports = mongoose.model('Email', {
	option: String,
	email: String,
	date: {type: Date, default: Date.now }
});