const bycrpt = require('bcrypt');
const { User, validate } = require('../models/userModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');

exports.createUser = catchAsync(async (req, res, next) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.message);

	let user = await User.findOne({ email: req.body.email });
	if (user) return res.status(400).send('User already exists.');

	user = new User({
		name: req.body.name,
		email: req.body.email,
	});

	const salt = await bycrpt.genSalt(10);
	user.password = await bycrpt.hash(req.body.password, salt);

	await user.save();

	const token = user.generateToken()

	res.status(201).json({
		status: 'success',
		data: {
			token
		}
	});
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
	// Build Query
	const features = new APIFeatures(User.find(), req.query).filter().sort('-_id').limitFields('-password').paginate();

	// Execute Query
	const users = await features.query;

	res.status(200).json({
		status: 'success',
		records: await User.count(),
		data: {
			users
		}
	});
});

exports.getUser = catchAsync(async (req, res, next) => {
	const user = await User.findById(req.params.id).select('-password');

	if (!user) return res.status(400).send('User with the given ID was not found.');

	res.status(200).json({
		status: 'success',
		data: {
			user
		}
	});
});


exports.deleteUser = catchAsync(async (req, res, next) => {
	const user = await User.findByIdAndDelete(req.params.id);

	if (!user) return res.status(400).send('User with the given ID was not found.');

	res.status(204).json({
		status: 'success',
		data: {
			user
		}
	});
});