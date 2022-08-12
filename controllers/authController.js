const bcrypt = require('bcrypt');
const Joi = require('joi');
const { User } = require("../models/userModel");
const AppError = require('../utils/appError');
const catchAsync = require("../utils/catchAsync");

exports.login = catchAsync(async (req, res, next) => {
	const { error } = validateAuth(req.body);
	if (error) return next(new AppError(error.message, 400));

	let user = await User.findOne({ email: req.body.email}).select('password');
	if (!user) return next(new AppError('email or password is incorrect', 401));

	const isValid = await bcrypt.compare(req.body.password, user.password);
	if (!isValid) return next(new AppError('email or password is incorrect', 401));
	
	const token = user.generateToken();
	res.status(200).json({
		status: 'success',
		data: {
			token
		}
	});
});

exports.protect = (req, res, next) => {
	const token = req.header('x-auth-token');
	if (!token) return next(new AppError('Access denied. No token provided', 401));

	try {
		const decodedToken = jwt.decode(token, process.env.JWT_PRIVATE_KEY);
		if (!decodedToken) return next(new AppError('Invalid token', 400));
		
		req.user = decodedToken;
		next();
	}
	catch(err) {
		next(new AppError('Invalid token', 400));
	}
}

function validateAuth(credentials) {
	const schema = Joi.object({
		email: Joi.string().min(10).max(255).email().required(),
		password: Joi.string().min(10).max(55).required(),
	});

	return schema.validate(credentials);
}