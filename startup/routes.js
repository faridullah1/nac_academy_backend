// API route imports
const studentsRouter = require('../routes/studentsRoute');
const employeeRouter = require('../routes/employeeRoute');
const courseRouter = require('../routes/courseRoute');
const systemSettingRouter = require('../routes/systemSettingRoute');
const announcementsRouter = require('../routes/announcementRoute');
const queriesRouter = require('../routes/userQueryRoute');
const userRouter = require('../routes/userRoute');
const authRouter = require('../routes/authRoute');

// View route import
const viewRouter = require('../routes/viewRoute');

// Global Error handling imports
const AppError = require('../utils/appError');
const globalErrorHandler = require('../controllers/errorController');

module.exports = (app) => {
	// Handling API routes
	app.use('/api/v1/students', studentsRouter);
	app.use('/api/v1/employees', employeeRouter);
	app.use('/api/v1/courses', courseRouter);
	app.use('/api/v1/system_settings', systemSettingRouter);
	app.use('/api/v1/announcements', announcementsRouter);
	app.use('/api/v1/queries', queriesRouter);
	app.use('/api/v1/users', userRouter);
	app.use('/api/v1/auth/login', authRouter);

	// Handling View routes
	app.use('/', viewRouter);

	// Handling unhandled routes
	app.all('*', (req, res, next) => {
		next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
	});

	// Handling global error handling logic
	app.use(globalErrorHandler);
} 