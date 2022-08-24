const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const multer = require('multer');

const { Course, validate } = require('../models/courseModel');
const { Student } = require('../models/studentModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const uploadToS3 = require('../utils/uploadToS3');

const multerFilter = (req, file, cb) => {
	if (file.mimetype.startsWith('image')) {
		cb(null, true);
	} else {
		cb(new Error('Not an image! please upload only images.'), false);
	}
}

const upload = multer({
	dest: 'temp/',
	fileFilter: multerFilter,
});

exports.uploadImage = upload.single('image');

exports.createCourse = catchAsync(async (req, res, next) => {
	const { error } = validate(req.body);
	if (error) return next(new AppError(error.message, 400));

	if (req.file) {
		req.body.image = await uploadToS3(req.file, 'courses');
	}

	if (typeof req.body.outline === 'string') {
		req.body.outline = req.body.outline.split(',');
	}

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
	
	if (!course) return next(new AppError('Course with the given ID was not found.', 404));

	res.status(200).json({
		status: 'success',
		data: {
			course
		}
	});
});

exports.updateCourse = catchAsync(async (req, res, next) => {
	if (req.file) {
		req.body.image = await uploadToS3(req.file, 'courses');
	}

	if (typeof req.body.outline === 'string') {
		req.body.outline = req.body.outline.split(',');
	}

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