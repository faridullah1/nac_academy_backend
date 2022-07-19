const { Course } = require('../models/courseModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');

exports.createCourse = catchAsync(async (req, res, next) => {
	const course = await Course.create(req.body);

	res.status(201).json({
		status: 'success',
		data: {
			course
		}
	});
});

exports.getAllCourses = catchAsync(async (req, res, next) => {
	// Build Query
	const features = new APIFeatures(Course.find(), req.query).filter().sort().limitFields().paginate();

	// Execute Query
	const courses = await features.query;

	res.status(200).json({
		status: 'success',
		records: await Course.count(),
		data: {
			courses
		}
	});
});

exports.getCourse = catchAsync(async (req, res, next) => {
	const course = await Course.findById(req.params.id);
	
	res.status(200).json({
		status: 'success',
		data: {
			course
		}
	});
});

exports.updateCourse = catchAsync(async (req, res, next) => {
	const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true
	});

	res.status(200).json({
		status: 'success',
		data: {
			course
		}
	});
});

exports.deleteCourse = catchAsync(async (req, res, next) => {
	const course = await Course.findByIdAndDelete(req.params.id);

	res.status(204).json({
		status: 'success',
		data: {
			course
		}
	});
});