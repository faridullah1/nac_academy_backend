const { Course, validate } = require('../models/courseModel');
const Employee = require('../models/employeeModel');

exports.createCourse = async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error) {
			return res.status(400).json({
				status: 'fail',
				message: error.details[0].message
			});
		}

		const teacher = await Employee.findById(req.body.teacherId);
		if (!teacher) {
			return res.status(400).json({
				status: 'fail',
				message: 'Teacher with the given id was not found'
			});
		}


		const course = await Course.create({
			name: req.body.name,
			teacher: {
				fullName: teacher.fullName
			},
			price: req.body.price,
			duration: req.body.duration
		});

		res.status(201).json({
			status: 'success',
			data: {
				course
			}
		});
	}
	catch(error) {
		res.status(400).json({
			status: 'fail',
			message: error
		});
	}
};

exports.getAllCourses = async (req, res) => {
	try {
		const courses = await Course.find();

		res.status(200).json({
			status: 'success',
			records: courses.length,
			data: {
				courses
			}
		});
	}
	catch(error) {
		res.status(400).json({
			status: 'fail',
			message: error
		});
	}
};