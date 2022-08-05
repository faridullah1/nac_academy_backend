const studentsRouter = require('../routes/studentsRoute');
const employeeRouter = require('../routes/employeeRoute');
const courseRouter = require('../routes/courseRoute');
const systemSettingRouter = require('../routes/systemSettingRoute');
const announcementsRouter = require('../routes/announcementRoute');
const queriesRouter = require('../routes/userQueryRoute');
const userRouter = require('../routes/userRoute');
const authRouter = require('../routes/authRoute');

const viewRouter = require('../routes/viewRoute');
const AppError = require('../utils/appError');
const globalErrorHandler = require('../controllers/errorController');

module.exports = (app) => {
	app.use('/api/v1/students', studentsRouter);
	app.use('/api/v1/employees', employeeRouter);
	app.use('/api/v1/courses', courseRouter);
	app.use('/api/v1/system_settings', systemSettingRouter);
	app.use('/api/v1/announcements', announcementsRouter);
	app.use('/api/v1/queries', queriesRouter);
	app.use('/api/v1/users', userRouter);
	app.use('/api/v1/auth/login', authRouter);
	app.use('/', viewRouter);

	app.all('*', (req, res, next) => {
		next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
	});

	app.use(globalErrorHandler);
} 