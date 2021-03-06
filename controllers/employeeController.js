const Employee = require('../models/employeeModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');

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

	res.status(200).json({
		status: 'success',
		data: {
			employee
		}
	});
});

exports.deleteEmployee = catchAsync(async (req, res, next) => {
	const employee = await Employee.findByIdAndDelete(req.params.id);

	res.status(204).json({
		status: 'success',
		data: {
			employee
		}
	});
});