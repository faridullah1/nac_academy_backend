const path = require('path');
const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const app = express();

const studentsRouter = require('./routes/studentsRoute');
const employeeRouter = require('./routes/employeeRoute');
const courseRouter = require('./routes/courseRoute');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression());

if (process.env.NODE_ENV === 'development') {
	console.log('Morgan enabled.');
	app.use(morgan('tiny'));
}

app.use('/api/v1/students', studentsRouter);
app.use('/api/v1/employees', employeeRouter);
app.use('/api/v1/courses', courseRouter);

app.get('/*', function (req, res, next) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

module.exports = app;