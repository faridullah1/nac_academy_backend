const mongoose = require('mongoose');
const Joi = require('joi');

const userQuerySchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, 'User name is required'],
		minlength: 3,
		maxlenght: 55
	},
	email: {
		type: String,
		required: [true, 'Email is required'],
		minlength: 10,
		maxlenght: 255,
		unique: true,
	},
	phone: {
		type: String,
		required: [true, 'phone is required'],
		minlength: 11,
		maxlenght: 11,
		unique: true
	},
	comments: {
		type: String,
		required: [true, 'comments are required'],
		minlength: 10,
		maxlenght: 1000,
		trim: true
	}
});


function validateUserQuery(query) {
	const schema = Joi.object({
		name: Joi.string().min(3).max(55).required(),
		email: Joi.string().min(10).max(255).email().required(),
		phone: Joi.string().min(11).max(11).required(),
		comments: Joi.string().min(10).max(1000).required(),
	});

	return schema.validate(query);
}

const UserQuery = mongoose.model('UserQuery', userQuerySchema);

exports.UserQuery = UserQuery;
exports.validate = validateUserQuery;