const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({
	path: './config.env'
});

const app = require('./app');

let databaseURL = process.env.DATABASE;
if (process.env.NODE_ENV === 'development') {
	databaseURL = process.env.DATABASE_LOCAL;
}

mongoose.connect(databaseURL).then(() => {
	console.log('Connected To Database');
}).catch(error => {
	console.log('error connecting to db:', error);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});