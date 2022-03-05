const Employee = require('../models/employeeModel');

exports.getAllEmployees = async (req, res) => {
	try {
		// Build Query
		const queryObj = { ...req.query };
		const excludedFields = ['sort', 'page', 'limit', 'fields'];
		excludedFields.forEach(el => delete queryObj[el]);

		let queryStr = JSON.stringify(queryObj);
		queryStr = queryStr.replace(/\b(regex)\b/g, match => `$${match}`);

		const query = Employee.find(JSON.parse(queryStr));

		// Execute Query
		const employees = await query;
	
		res.status(200).json({
			status: 'success',
			records: employees.length,
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