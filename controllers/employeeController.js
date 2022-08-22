const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const multer = require('multer');

const { Course } = require('../models/courseModel');
const { Employee, validate } = require('../models/employeeModel');
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

exports.uploadPhoto = upload.single('photo');

exports.getAllEmployees = catchAsync(async (req, res, next) => {
	// Build Query
	const features = new APIFeatures(Employee.find(), req.query).filter().sort().limitFields().paginate();

	// Execute Query
	const employees = await features.query;

	res.status(200).json({
		status: 'success',
		records: await Employee.count(),
		data: {
			employees
		}
	});
});

exports.getEmployee = catchAsync(async (req, res, next) => {
	const employee = await Employee.findById(req.params.id);

	if (!employee) return next(new AppError('Employee with the given ID was not found.', 404));
	
	res.status(200).json({
		status: 'success',
		data: {
			employee
		}
	});
});

exports.createEmployee = catchAsync(async (req, res, next) => {
	const { error } = validate(req.body);
	if (error) return next(new AppError(error.message, 400));

	if (req.file) {
		req.body.photo = await uploadToS3(req.file, 'employees');
	}

	const employee = await Employee.create({
		fullName: req.body.fullName,
		gender: req.body.gender,
		qualification: req.body.qualification,
		experience: req.body.experience,
		role: req.body.role,
		mobileNo: req.body.mobileNo,
		profileSummary: req.body.profileSummary,
		email: req.body.email,
		photo: req.body.photo,
		address: req.body.address
	});

	res.status(201).json({
		status: 'success',
		data: {
			employee
		}
	});
});

exports.updateEmployee = catchAsync(async (req, res, next) => {
	if (req.file) {
		req.body.photo = await uploadToS3(req.file, 'employees');
	}

	const employee = await Employee.findByIdAndUpdate(req.params.id, {
		fullName: req.body.fullName,
		gender: req.body.gender,
		qualification: req.body.qualification,
		experience: req.body.experience,
		role: req.body.role,
		mobileNo: req.body.mobileNo,
		profileSummary: req.body.profileSummary,
		email: req.body.email,
		photo: req.body.photo,
		address: req.body.address
	}, {
		new: true,
		runValidators: true
	});

	if (!employee) return next(new AppError('Employee with the given ID was not found.', 404));

	res.status(200).json({
		status: 'success',
		data: {
			employee
		}
	});
});

exports.deleteEmployee = catchAsync(async (req, res, next) => {
	const courses = await Course.find({ teacher: ObjectId(req.params.id)});

	console.log('No of courses =', courses.length);

	if (courses.length > 0) return next(new AppError('Can not delete this teacher, already have courses.', 400));

	const employee = await Employee.findByIdAndDelete(req.params.id);

	if (!employee) return next(new AppError('Employee with the given ID was not found.', 404));

	res.status(204).json({
		status: 'success',
		data: {
			employee
		}
	});
});