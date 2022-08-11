const Joi = require('joi');
const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
	fullName: {
		type: String,
		required: [true, 'Student name is required.'],
		minLength: 3,
		maxLength: 55
	},
	fatherName: {
		type: String,
		required: [true, 'Father name is required.'],
		minLength: 3,
		maxLength: 55
	},
	dateOfBirth: {
		type: Date,
		required: [true, 'Date of birth is required.']
	},
	photo: String,
	mobileNo: {
		type: String,
		required: [true, 'Mobile number is required.'],
		minLength: 11,
		maxLength: 11
	},
	cnic: {
		type: String,
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
		type: mongoose.Schema.ObjectId,
		ref: 'Course'
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

studentSchema.pre(/^find/, function(next) {
	this.populate({
		path: 'course',
		select: "name teacher"
	});

	next();
});

function validateStudent(course) {
	const schema = Joi.object({
		fullName: Joi.string().required().min(3).max(55),
		fatherName: Joi.string().required().min(3).max(55),
		dateOfBirth: Joi.date().required(),
		mobileNo: Joi.string().required().min(11).max(11),
		cnic: Joi.string().required().min(13).max(13),
		course: Joi.required(),
		photo: Joi.string().allow(null),
		address: Joi.string().allow(null)
	});

	return schema.validate(course);
}

const Student = mongoose.model('Student', studentSchema);

exports.Student = Student;
exports.validate = validateStudent;