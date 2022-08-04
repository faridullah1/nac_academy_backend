const morgan = require('morgan');

module.exports = (app) => {
	if (process.env.NODE_ENV === 'development') {
		console.log('Morgan enabled.');
		app.use(morgan('tiny'));
	}
}