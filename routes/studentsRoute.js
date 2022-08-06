const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { auth } = require('../middleware/auth');

router.use(auth);

router.route('/')
	.get(studentController.getAllStudents)
	.post(studentController.createStudent)

router.route('/:id')
	.get(studentController.getStudent)
	.patch(studentController.updateStudent)
	.delete(studentController.deleteStudent)

module.exports = router;