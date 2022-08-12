const AppError = require("../utils/appError");

handleCastErrorDB = err => {
	const message = `Invalid ${err.path}: ${err.value}`;
	return new AppError(message, 400)
}

handleDuplicateFieldDB = err => {
	const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
	const message = `Invalid field value: ${value}. Please use another one.`;
	return new AppError(message, 400)
}

handleValidationErrorDB = err => {
	const errors = Object.values(err.errors).map(el => el.message);
	const message = `Invalid input data. ${errors.join(', ')}`;
	return new AppError(message, 400)
}

handleJWTError = () => new AppError('Invalid Token. Please log in again!');

handleJWTExpiryError = () => new AppError('Your token has expired. Please log in again!');

sendErrorDev = (err, res) => {
	res.status(err.statusCode).json({
		status: err.status,
		error: err,
		message: err.message,
		stack: err.stack
	});
}

sendErrorProd = (err, res) => {
	// Operational, trusted errors: send error message to the client.
	if (err.isOperational) {
		res.status(err.statusCode).json({
			status: err.status,
			message: err.message,
		});	
	}
	// Programming or other unknown errors: don't leak error details.
	else {
		// 1) Log error
		console.error('Programming or unknown error =>', err);

		// 2) Send generic message
		res.status(500).json({
			status: 'error',
			message: 'Something went wrong',
		});	
	}
}

module.exports = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'error';

	if (process.env.NODE_ENV === 'development') {
		sendErrorDev(err, res);
	}
	else if (process.env.NODE_ENV === 'production') {
		if (err.name === 'CastError') err = handleCastErrorDB(err);
		else if (err.code  === 11000) err = handleDuplicateFieldDB(err);
		else if (err.name === 'ValidationError') err = handleValidationErrorDB(err);

		else if (err.name === 'JsonWebTokenError') err = handleJWTError();
		else if (err.name === 'TokenExpiredError') err = handleJWTExpiryError();

		sendErrorProd(err, res);
	}
}