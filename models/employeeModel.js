const mongoose = require('mongoose');

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

module.exports = Employee;