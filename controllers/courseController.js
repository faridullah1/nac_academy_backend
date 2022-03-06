const { Course } = require('../models/courseModel');
const APIFeatures = require('../utils/apiFeatures');

exports.createCourse = async (req, res) => {
	try {
		const course = await Course.create(req.body);

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
		// Build Query
		const features = new APIFeatures(Course.find(), req.query).filter().sort().limitFields().paginate();

		// Execute Query
		const courses = await features.query;

		res.status(200).json({
			status: 'success',
			records: await Course.count(),
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

exports.getCourse = async (req, res) => {
	try {
		const course = await Course.findById(req.params.id);
	
		res.status(200).json({
			status: 'success',
			data: {
				course
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

exports.updateCourse = async (req, res) => {
	try {
		const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true
		});

		res.status(201).json({
			status: 'success',
			data: {
				course
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

exports.deleteCourse = async (req, res) => {
	try {
		const course = await Course.findByIdAndDelete(req.params.id);

		res.status(204).json({
			status: 'success',
			data: {
				course
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