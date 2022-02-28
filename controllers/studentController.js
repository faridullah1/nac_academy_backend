const Student = require('../models/studentModel');

exports.getAllStudents = async (req, res) => {
	try {
		const queryObj = { ...req.query };
		const excludedFields = ['sort', 'page', 'limit', 'fields'];
		excludedFields.forEach(el => delete queryObj[el]);

		let queryStr = JSON.stringify(queryObj);
		queryStr = queryStr.replace(/\b(regex)\b/g, match => `$${match}`);

		const students = await Student.find(JSON.parse(queryStr));
	
		res.status(200).json({
			status: 'success',
			records: students.length,
			data: {
				students
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

exports.getStudent = async (req, res) => {
	try {
		const student = await Student.findById(req.params.id);
	
		res.status(200).json({
			status: 'success',
			data: {
				student
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

exports.createStudent = async (req, res) => {
	try {
		const student = await Student.create(req.body);

		res.status(201).json({
			status: 'success',
			data: {
				student
			}
		});
	}
	catch(err) {
		res.status(400).json({
			status: 'fail',
			message: err
		});
	}
}

exports.updateStudent = async (req, res) => {
	try {
		const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true
		});

		res.status(201).json({
			status: 'success',
			data: {
				student
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

exports.deleteStudent = async (req, res) => {
	try {
		const student = await Student.findByIdAndDelete(req.params.id);

		res.status(204).json({
			status: 'success',
			data: {
				student
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