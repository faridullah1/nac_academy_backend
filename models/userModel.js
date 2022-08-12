const Joi = require('joi');
const jwt = require('jsonwebtoken');
const bycrpt = require('bcrypt');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, 'title is required'],
		minLength: 5,
		maxLength: 55,
	},
	email: {
		type: String,
		required: [true, 'Email is required'],
		minlength: 10,
		maxlenght: 255,
		unique: true,
		lowercase: true
	},
	password: {
		type: String,
		require: [true, 'Password is required'],
		minlength: 10,
		maxlenght: 55,
		select: false
	},
	photo: String,
	createdAt: {
		type: Date,
		default: Date.now()
	}
});

userSchema.pre('save', async function(next) {
	// Only run this function if password is modified;
	if (!this.isModified('password')) return next();

	// Hash the password with cost of 12;
	this.password = await bycrpt.hash(this.password, 12);

	next();
});

userSchema.methods.generateToken = function() {
	return jwt.sign({ _id: this._id }, process.env.JWT_PRIVATE_KEY, {
		expiresIn: process.env.JWT_EXPIRES_IN
	});
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
	const schema = Joi.object({
		name: Joi.string().min(5).max(55).required(),
		email: Joi.string().min(10).max(255).email().required(),
		password: Joi.string().min(10).max(55).required(),
		photo: Joi.string().allow(null),
	});

	return schema.validate(user);
}

exports.validate = validateUser;
exports.User = User;