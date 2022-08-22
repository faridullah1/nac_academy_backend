const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const { protect } = require('../controllers/authController');

router.use(protect);

router.route('/')
	.get(employeeController.getAllEmployees)
	.post(employeeController.uploadPhoto, employeeController.createEmployee);

router.route('/:id')
	.get(employeeController.getEmployee)
	.patch(employeeController.uploadPhoto, employeeController.updateEmployee)
	.delete(employeeController.deleteEmployee);

module.exports = router;