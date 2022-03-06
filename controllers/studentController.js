const { Student, validate } = require('../models/studentModel');
const APIFeatures = require('../utils/apiFeatures');

exports.getAllStudents = async (req, res) => {
	try {
		const features = new APIFeatures(Student.find(), req.query);
		const students = features.query;
	
		res.status(200).json({
			status: 'success',
			records: students.Count(),
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
		const { error } = validate(req.body);

		if (error) {
			return res.status(400).json({
				status: 'fail',
				message: error.details[0].message
			});
		}

		const student = await Student.create(req.body);

		res.status(201).json({
			status: 'success',
			data: {
				student
			}
		});
	}
	catch(error) {
		res.status(400).json({
			status: 'fail',
			message: error
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