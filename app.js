const express = require('express');
const app = express();

const studentsRoute = require('./routes/studentsRoute');
const teacherRoute = require('./routes/teacherRoute');

app.get('/', (req, res) => {
	res.status(200).send('Welcome to admin portal')
});

app.use(express.json());

app.use('/api/v1/students', studentsRoute);
app.use('/api/v1/teachers', teacherRoute);

module.exports = app;