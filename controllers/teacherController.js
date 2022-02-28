const Teacher = require('../models/teacherModel');

exports.getAllTeachers = async (req, res) => {
	try {
		const teachers = await Teacher.find();
	
		res.status(200).json({
			status: 'success',
			records: teachers.length,
			data: {
				teachers
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

exports.createTeacher = async (req, res) => {
	try {
		const teacher = await Teacher.create(req.body);

		res.status(201).json({
			status: 'success',
			data: {
				teacher
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