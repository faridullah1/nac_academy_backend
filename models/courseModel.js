const mongoose = require('mongoose');
const Joi = require('joi');

const courseSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Course name is required'],
		minLength: 3,
		maxLength: 55,
		trim: true
	},
	teacher: {
		type: mongoose.Schema.ObjectId,
		ref: 'Employee'
	},
	price: {
		type: Number,
		required: [true, 'price is required'],
		min: 0,
		max: 50000
	},
	duration: {
		type: String,
		required: [true, 'duration is required'],
		trim: true
	},
	description: {
		type: String,
		required: [true, 'description is required'],
		trim: true,
		minLength: 10,
		maxLength: 1000
	},
	outline: {
		type: [String],
		required: [true, 'outline is required'],
	},
	audience: {
		type: String,
		required: [true, 'audience is required'],
		trim: true,
		minLength: 10,
		maxLength: 500
	},
	image: String
});

courseSchema.pre(/^find/, function(next) {
	this.populate({
		path: 'teacher',
		select: "fullName photo profileSummary"
	});

	next();
})

function validateCourse(course) {
	const schema = Joi.object({
		name: Joi.string().required().min(3).max(55),
		teacher: Joi.string().required(),
		price: Joi.number().required().min(0).max(50000),
		duration: Joi.string().required(),
		description: Joi.string().required().min(10).max(1000),
		outline: Joi.required(),
		audience: Joi.string().required().min(10).max(500),
		image: Joi.string()
	});

	return schema.validate(course);
}

const Course = mongoose.model('Course', courseSchema);

exports.Course = Course;
exports.courseSchema = courseSchema;
exports.validate = validateCourse;