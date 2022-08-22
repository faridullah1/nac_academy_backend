const mongoose = require('mongoose');
const Joi = require('joi');

const employeeSchema = mongoose.Schema({
	fullName: {
		type: String,
		required: [true, 'Name is required.'],
		minLength: 3,
		maxLength: 55
	},
	gender: {
		type: String,
		required: [true, 'Gender is required.'],
		enum: ['male', 'female']
	},
	qualification: {
		type: String,
		required: [true, 'Qualification is required.']
	},
	experience: {
		type: Number, // Year in number
		required: [true, 'Experience is required.']
	},
	role: {
		type: String,
		enum: ['principle', 'teacher', 'admin', 'clerk'],
		default: 'teacher'
	},
	mobileNo: {
		type: String,
		required: [true, 'mobileNo is required.'],
		minLength: 11,
		maxLength: 11
	},
	profileSummary: {
		type: String,
		required: [true, 'profileSummary is required.'],
		minLength: 10,
		maxLength: 255
	},
	email: String,
	photo: String,
	address: {
		type: String,
		trim: true,
		minLength: 5,
		maxLength: 255
	}
});

const Employee = mongoose.model('Employee', employeeSchema);

function validateEmployee(employee) {
	const schema = Joi.object({
		fullName: Joi.string().required().min(3).max(55),
		gender: Joi.string().required(),
		qualification: Joi.string().required(),
		experience: Joi.number().required().min(0).max(50),
		role: Joi.string(),
		mobileNo: Joi.string().required().min(11).max(11),
		profileSummary: Joi.string().required().min(10).max(255),
		email: Joi.string().email(),
		photo: Joi.string().allow(null),
		address: Joi.string().allow(null)
	});

	return schema.validate(employee);
}

exports.Employee = Employee;
exports.validate = validateEmployee;