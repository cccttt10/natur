const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [ true, 'Please tell us your name' ]
	},
	email: {
		type: String,
		required: [ true, 'Please provide your email' ],
		unique: true,
		lowercase: true,
		validate: [
			validator.isEmail,
			'Please provide a valid email'
		]
	},
	photo: String,
	password: {
		type: String,
		required: [ true, 'Please provide a password' ],
		minlength: 8
	},
	passwordConfirm: {
		type: String,
		required: [ true, 'Please confirm your password' ],
		validate: {
			// IMPORTANT
			// This only works on CREATE and SAVE!!!
			// Therefore, use create or save when we want to update
			validator: function(passwordConfirm) {
				return passwordConfirm === this.password;
			},
			message: 'Passwords are not the same'
		}
	}
});

const User = mongoose.model('User', userSchema);

module.exports = User;
