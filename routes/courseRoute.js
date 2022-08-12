const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { protect } = require('../controllers/authController');

router.route('/')
	.get(courseController.getAllCourses)
	.post(protect, courseController.createCourse);

router.route('/:id')
	.get(courseController.getCourse)
	.patch(protect, courseController.updateCourse)
	.delete(protect, courseController.deleteCourse);

module.exports = router;