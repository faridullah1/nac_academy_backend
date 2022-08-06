const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');

exports.auth = (req, res, next) => {
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