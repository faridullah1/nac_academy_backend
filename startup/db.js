const mongoose = require('mongoose');

module.exports = () => {
	let databaseURL = process.env.DATABASE;

	if (process.env.NODE_ENV === 'development') {
		databaseURL = process.env.DATABASE_LOCAL;
	}

	mongoose.connect(databaseURL)
		.then(() => console.log('Connected To Database'))
		.catch(error => console.log('error connecting to db:', error));
}