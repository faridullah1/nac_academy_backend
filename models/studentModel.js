const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
	fullName: {
		type: String,
		required: [true, 'Student name is required.']
	},
	fatherName: {
		type: String,
		required: [true, 'Father name is required.']
	},
	dateOfBirth: {
		type: Date,
		required: [true, 'Date of birth is required.']
	},
	photo: String,
	mobileNo: {
		type: Number,
		required: [true, 'Mobile number is required.'],
		minLength: 11,
		maxLength: 11
	},
	cnic: {
		type: Number,
		required: [true, 'CNIC or B Form is required'],
		minLength: 13,
		maxLength: 13
	},
	address: {
		type: String,
		trim: true,
		minLength: 5,
		maxLength: 255
	},
	course: {
		type: String,
		required: [true, 'Course is required.']
	},
	dateOfAdmission: {
		type: Date,
		default: Date.now
	},
	admissionNumber: {
		type: Number,
		default: new Date().getTime()
	}
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;