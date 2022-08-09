const mongoose = require('mongoose');

module.exports = () => {
	let db = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

	if (process.env.NODE_ENV === 'development') {
		db = process.env.DATABASE_LOCAL;
	}

	mongoose.connect(db)
		.then(() => console.log('Connected To Database'))
		.catch(error => console.log('error connecting to db:', error));
}