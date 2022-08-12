const express = require('express');
const router = express.Router();
const userQueryController = require('../controllers/userQueryController');
const { protect } = require('../controllers/authController');

router.route('/')
	.get(protect, userQueryController.getAllQueries)
	.post(userQueryController.createQuery);

router.route('/:id')
	.get(protect, userQueryController.getQuery)
	.delete(protect, userQueryController.deleteQuery)

module.exports = router;