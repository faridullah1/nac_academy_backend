const mongoose = require('mongoose');

const teacherSchema = mongoose.Schema({
	fullName: {
		type: String,
		required: [true, 'Teacher name is required.']
	},
	gender: {
		type: String,
		required: [true, 'Gender is required.'],
		enum: ['male', 'female']
	},
	qualification: {
		type: String,
		required: [true, 'qualification is required.']
	},
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;