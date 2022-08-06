const express = require('express');
const router = express.Router();
const userQueryController = require('../controllers/userQueryController');
const { auth } = require('../middleware/auth');

router.route('/')
	.get(auth, userQueryController.getAllQueries)
	.post(userQueryController.createQuery);

router.route('/:id')
	.get(auth, userQueryController.getQuery)
	.delete(auth, userQueryController.deleteQuery)

module.exports = router;