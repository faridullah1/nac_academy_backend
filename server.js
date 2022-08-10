const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

process.on('uncaughtException', err => {
	console.log('Uncaught Exception, shutting down.');
	console.log(err.name, err.message);
	process.exit(1);
});

const app = require('./app');

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});

process.on('unhandledRejection', err => {
	console.log('Unhandled Rejection, shutting down.');
	console.log(err.name, err.message);
	server.close(() => process.exit(1));
});