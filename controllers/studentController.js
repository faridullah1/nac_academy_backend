const { Student, validate } = require('../models/studentModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');

exports.getAllStudents = catchAsync(async (req, res, next) => {
	const features = new APIFeatures(Student.find(), req.query).filter().sort().limitFields().paginate();
	const students = await features.query;

	res.status(200).json({
		status: 'success',
		records: await Student.count(),
		data: {
			students
		}
	});
});

exports.getStudent = catchAsync(async (req, res, next) => {
	const student = await Student.findById(req.params.id);
	
	res.status(200).json({
		status: 'success',
		data: {
			student
		}
	});
});

exports.createStudent = catchAsync(async (req, res, next) => {
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
});

exports.updateStudent = catchAsync(async (req, res, next) => {
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
});

exports.deleteStudent = catchAsync(async (req, res, next) => {
	const student = await Student.findByIdAndDelete(req.params.id);

	res.status(204).json({
		status: 'success',
		data: {
			student
		}
	});
});