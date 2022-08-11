const { UserQuery, validate } = require('../models/userQueryModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createQuery = catchAsync(async (req, res, next) => {
	const { error } = validate(req.body);
	if (error) return next(new AppError(error.message, 400))

	const userQuery = new UserQuery({
		name: req.body.name,
		email: req.body.email,
		phone: req.body.phone,
		comments: req.body.comments
	});

	await userQuery.save();

	res.status(201).json({
		status: 'success',
		data: {
			userQuery
		}
	});
});

exports.getAllQueries = catchAsync(async (req, res, next) => {
	// Build Query
	const features = new APIFeatures(UserQuery.find(), req.query).filter().sort('-_id').limitFields().paginate();

	// Execute Query
	const queries = await features.query;

	res.status(200).json({
		status: 'success',
		records: await UserQuery.count(),
		data: {
			queries
		}
	});
});

exports.getQuery = catchAsync(async (req, res, next) => {
	const query = await UserQuery.findById(req.params.id);

	if (!query) return next(new AppError('User query with the given ID was not found.', 404))

	res.status(200).json({
		status: 'success',
		data: {
			query
		}
	});
});


exports.deleteQuery = catchAsync(async (req, res, next) => {
	const query = await UserQuery.findByIdAndDelete(req.params.id);

	if (!query) return next(new AppError('User query with the given ID was not found.', 404))

	res.status(204).json({
		status: 'success',
		data: {
			query
		}
	});
});