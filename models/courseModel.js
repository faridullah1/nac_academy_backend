const mongoose = require('mongoose');
const Joi = require('joi');

const courseSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Course name is required'],
		minLength: 3,
		maxLength: 55
	},
	teacher: {
		type: mongoose.Schema.ObjectId,
		ref: 'Employee'
	},
	price: {
		type: Number,
		required: [true, 'price is required'],
		min: 0
	},
	duration: {
		type: String,
		required: [true, 'duration is required'],
	}
});

courseSchema.pre(/^find/, function(next) {
	this.populate({
		path: 'teacher',
		select: "fullName"
	});

	next();
})

function validateCourse(course) {
	const schema = Joi.object({
		name: Joi.string().required().min(3).max(55),
		price: Joi.number().required().min(0),
		duration: Joi.string().required()
	});

	return schema.validate(course);
}

const Course = mongoose.model('Course', courseSchema);

exports.Course = Course;
exports.courseSchema = courseSchema;
exports.validate = validateCourse;