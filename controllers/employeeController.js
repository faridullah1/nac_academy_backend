const Employee = require('../models/employeeModel');
const APIFeatures = require('../utils/apiFeatures');

exports.getAllEmployees = async (req, res) => {
	try {
		// Build Query
		const features = new APIFeatures(Employee.find(), req.query).filter().sort().limitFields().paginate();

		// Execute Query
		const employees = await features.query;
	
		res.status(200).json({
			status: 'success',
			records: employees.Count(),
			data: {
				employees
			}
		});
	}
	catch (err) {
		res.status(400).json({
			status: 'fail',
			message: err
		});
	}
}

exports.getEmployee = async (req, res) => {
	try {
		const employee = await Employee.findById(req.params.id);
	
		res.status(200).json({
			status: 'success',
			data: {
				employee
			}
		});
	}
	catch (err) {
		res.status(400).json({
			status: 'fail',
			message: err
		});
	}
}

exports.createEmployee = async (req, res) => {
	try {
		const employee = await Employee.create(req.body);

		res.status(201).json({
			status: 'success',
			data: {
				employee
			}
		});
	}
	catch(err) {
		res.status(400).json({
			status: 'fail',
			message: err
		})
	}
}

exports.updateEmployee = async (req, res) => {
	try {
		const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true
		});

		res.status(201).json({
			status: 'success',
			data: {
				employee
			}
		});
	}
	catch (error) {
		res.status(400).json({
			status: 'fail',
			message: error
		});
	}
}

exports.deleteEmployee = async (req, res) => {
	try {
		const employee = await Employee.findByIdAndDelete(req.params.id);

		res.status(204).json({
			status: 'success',
			data: {
				employee
			}
		});
	}
	catch (error) {
		res.status(400).json({
			status: 'fail',
			message: error
		});
	}
}