const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { auth } = require('../middleware/auth');

router.route('/')
	.get(courseController.getAllCourses)
	.post(auth, courseController.createCourse);

router.route('/:id')
	.get(courseController.getCourse)
	.patch(auth, courseController.updateCourse)
	.delete(auth, courseController.deleteCourse);

module.exports = router;