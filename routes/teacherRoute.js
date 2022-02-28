const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');

router.route('/')
	.get(teacherController.getAllTeachers)
	.post(teacherController.createTeacher)

module.exports = router;