const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
	role: {
		type: String,
		enum: [ 'user', 'guide', 'lead-guide', 'admin' ],
		default: 'user'
	},
	password: {
		type: String,
		required: [ true, 'Please provide a password' ],
		minlength: 8,
		select: false
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
	},
	passwordChangedAt: Date,
	passwordResetToken: String,
	passwordResetExpires: Date
});

userSchema.pre('save', async function(next) {
	// Only run this function is password was actually modified
	if (!this.isModified('password')) return next();

	// Hash the password with cost of 12
	this.password = await bcrypt.hash(this.password, 12);

	// Delete passwordConfirm field
	this.passwordConfirm = undefined;
	next();
});

userSchema.methods.correctPassword = async function(
	candidatePassword,
	userPassword
) {
	return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
	if (this.passwordChangedAt) {
		const changedTimestamp = parseInt(
			this.passwordChangedAt.getTime() / 1000,
			10
		);
		return JWTTimestamp < changedTimestamp;
	}
	// False means NOT changed
	return false;
};

userSchema.methods.createPasswordResetToken = function() {
	const resetToken = crypto.randomBytes(32).toString('hex');

	// Store encrypted token in database
	this.passwordResetToken = crypto
		.createHash('sha256')
		.update(resetToken)
		.digest('hex');

	console.log({ resetToken }, this.passwordResetToken);

	// Token expires in 10 minutes
	this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

	// Return plain, un-encrypted token and send it to user
	return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
