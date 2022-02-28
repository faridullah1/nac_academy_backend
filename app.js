const express = require('express');
const app = express();

const studentsRouter = require('./routes/studentsRoute');
const employeeRouter = require('./routes/employeeRoute');

app.get('/', (req, res) => {
	res.status(200).send('Welcome to admin portal')
});

app.use(express.json());

app.use('/api/v1/students', studentsRouter);
app.use('/api/v1/employees', employeeRouter);

module.exports = app;