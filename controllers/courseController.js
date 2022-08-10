const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const { Course } = require('../models/courseModel');
const { Student } = require('../models/studentModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
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
		records: courses.length,
		data: {
			courses
		}
	});
});

exports.getCourse = catchAsync(async (req, res, next) => {
	const course = await Course.findById(req.params.id);
	
	if (!course) return next(new AppError('Course with the given ID was not found.', 404));

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

	if (!course) return next(new AppError('Course with the given ID was not found.', 404));

	res.status(200).json({
		status: 'success',
		data: {
			course
		}
	});
});

exports.deleteCourse = catchAsync(async (req, res, next) => {
	const students = await Student.find({ course: ObjectId(req.params.id)});
	if (students.length > 0) return next(new AppError('Can not delete this course, already have students.', 400));

	const course = await Course.findByIdAndDelete(req.params.id);

	if (!course) return next(new AppError('Course with the given ID was not found.', 404));

	res.status(204).json({
		status: 'success',
		data: {
			course: 'TESTING'
		}
	});
});