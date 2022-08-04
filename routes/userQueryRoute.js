const express = require('express');
const router = express.Router();
const userQueryController = require('../controllers/userQueryController');

router.route('/')
	.get(userQueryController.getAllQueries)
	.post(userQueryController.createQuery);

router.route('/:id')
	.get(userQueryController.getQuery)
	.delete(userQueryController.deleteQuery)

module.exports = router;