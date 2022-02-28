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
	gender: {
		type: String,
		required: [true, 'Gender is required.'],
		enum: ['male', 'female']
	},
	address: {
		type: String,
		trim: true,
	},
	mobileNo: {
		type: String,
		required: [true, 'Mobile number is required.']
	},
	dateOfJoining: {
		type: Date,
		default: Date.now
	},
	course: {
		type: String,
		required: [true, 'Course is required.']
	},
	teacher: {
		type: String,
		required: [true, 'Teacher is required.']
	}
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;