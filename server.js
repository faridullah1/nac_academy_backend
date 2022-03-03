const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({
	path: './config.env'
});

const app = require('./app');

mongoose.connect(process.env.DATABASE).then(() => {
	console.log('Connected To Database');
}).catch(error => {
	console.log('error connecting to db:', error);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});