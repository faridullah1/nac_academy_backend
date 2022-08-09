const bycrpt = require('bcrypt');
const Joi = require('joi');
const multer = require('multer');

const { User, validate } = require('../models/userModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const uploadToS3 = require('../utils/uploadToS3');

const multerFilter = (req, file, cb) => {
	if (file.mimetype.startsWith('image')) {
		cb(null, true);
	} else {
		cb(new Error('Not an image! please upload only images.'), false);
	}
}

const upload = multer({
	dest: 'temp/',
	fileFilter: multerFilter,
});

exports.uploadImage = upload.single('photo');

exports.me = catchAsync(async (req, res, next) => {
	const user = await User.findOne({ _id: req.user._id });

	res.status(200).json({
		status: 'success',
		data: {
			user
		}
	});
});

exports.createUser = catchAsync(async (req, res, next) => {
	const { error } = validate(req.body);
	if (error) return next(new AppError(error.message, 400));

	let user = await User.findOne({ email: req.body.email });
	if (user) return next(new AppError('User already exists', 400));

	user = new User({
		name: req.body.name,
		email: req.body.email,
	});

	const salt = await bycrpt.genSalt(10);
	user.password = await bycrpt.hash(req.body.password, salt);

	if (req.file) {
		const imageURL = await uploadToS3(req.file, 'users');
		user.photo = imageURL;
	}
	
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
	const features = new APIFeatures(User.find(), req.query).filter().sort().limitFields().paginate();

	// Execute Query
	const users = await features.query;

	res.status(200).json({
		status: 'success',
		records: users.length,
		data: {
			users
		}
	});
});

exports.getUser = catchAsync(async (req, res, next) => {
	const user = await User.findById(req.params.id);

	if (!user) return next(new AppError('User with the given ID was not found.', 400));

	res.status(200).json({
		status: 'success',
		data: {
			user
		}
	});
});

exports.updateUser = catchAsync(async (req, res, next) => {
	const schema = Joi.object({
		name: Joi.string().min(5).max(55),
		email: Joi.string().min(10).max(255).email(),
		photo: Joi.string().allow(null),
	});

	const { error } = schema.validate(req.body);
	if (error) return next(new AppError(error.message, 400));

	if (req.file) {
		const imageURL = await uploadToS3(req.file, 'users');
		req.body.photo = imageURL;
	}
	
	const user = await User.findByIdAndUpdate(req.params.id, {
		name: req.body.name,
		email: req.body.email,
		photo: req.body.photo
	}, { new: true });

	if (!user) return next(new AppError('User with the given ID was not found.', 400))

	res.status(200).json({
		status: 'success',
		data: {
			user
		}
	});
});

exports.deleteUser = catchAsync(async (req, res, next) => {
	const user = await User.findByIdAndDelete(req.params.id);

	if (!user) return next(new AppError('User with the given ID was not found.', 400))

	res.status(204).json({
		status: 'success',
		data: {
			user
		}
	});
});