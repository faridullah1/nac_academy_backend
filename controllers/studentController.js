const { Student, validate } = require('../models/studentModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllStudents = catchAsync(async (req, res, next) => {
	const features = new APIFeatures(Student.find(), req.query).filter().sort().limitFields().paginate();
	const students = await features.query;

	res.status(200).json({
		status: 'success',
		records: await students.length,
		data: {
			students
		}
	});
});

exports.getStudent = catchAsync(async (req, res, next) => {
	const student = await Student.findById(req.params.id);

	if (!student) return next(new AppError('Student with the given ID was not found.', 404));
	
	res.status(200).json({
		status: 'success',
		data: {
			student
		}
	});
});

exports.createStudent = catchAsync(async (req, res, next) => {
	const { error } = validate(req.body);
	if (error) return next(new AppError(error.message, 400));

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

	if (!student) return next(new AppError('Student with the given ID was not found.', 404));

	res.status(200).json({
		status: 'success',
		data: {
			student
		}
	});
});

exports.deleteStudent = catchAsync(async (req, res, next) => {
	const student = await Student.findByIdAndDelete(req.params.id);

	if (!student) return next(new AppError('Student with the given ID was not found.', 404));

	res.status(204).json({
		status: 'success',
		data: {
			student
		}
	});
});