const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
	fullName: {
		type: String,
		required: [true, 'Name is required.']
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
		type: String,
		required: [true, 'Experience is required.']
	},
	role: {
		type: String,
		enum: ['principle', 'teacher', 'admin', 'clerk'],
		default: 'teacher'
	},
	mobileNo: {
		type: String,
		require: [true, 'Phone is required.']
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