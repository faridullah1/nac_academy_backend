const Joi = require('joi');
const jwt = require('jsonwebtoken');
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
	},
	password: {
		type: String,
		require: [true, 'Password is required'],
		minlength: 10,
		maxlenght: 55
	},
	photo: String,
	createdAt: {
		type: Date,
		default: Date.now()
	}
});

userSchema.methods.generateToken = function() {
	return jwt.sign({ _id: this._id }, process.env.JWT_PRIVATE_KEY);
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