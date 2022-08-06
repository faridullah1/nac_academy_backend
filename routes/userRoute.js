const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { auth } = require('../middleware/auth');

router.use(auth);

router.route('/me').get(userController.me);

router.route('/')
	.get(userController.getAllUsers)
	.post(userController.uploadImage, userController.createUser);

router.route('/:id')
	.get(userController.getUser)
	.patch(userController.uploadImage, userController.updateUser)
	.delete(userController.deleteUser)

module.exports = router;