const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { auth } = require('../middleware/auth');

router.use(auth);

router.route('/')
	.get(userController.getAllUsers)
	.post(userController.createUser);

router.route('/:id')
	.get(userController.getUser)
	.delete(userController.deleteUser)

module.exports = router;