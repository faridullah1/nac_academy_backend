const Employee = require('../models/employeeModel');

exports.getAllEmployees = async (req, res) => {
	try {
		const employees = await Employee.find();
	
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