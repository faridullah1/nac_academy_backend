const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const { Course } = require('../models/courseModel');
const Employee = require('../models/employeeModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllEmployees = catchAsync(async (req, res, next) => {
	// Build Query
	const features = new APIFeatures(Employee.find(), req.query).filter().sort().limitFields().paginate();

	// Execute Query
	const employees = await features.query;

	res.status(200).json({
		status: 'success',
		records: employees.length,
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
	const employee = await Employee.create(req.body);

	res.status(201).json({
		status: 'success',
		data: {
			employee
		}
	});
});

exports.updateEmployee = catchAsync(async (req, res, next) => {
	const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
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