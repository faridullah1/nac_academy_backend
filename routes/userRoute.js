const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../controllers/authController');

router.route('/me').get(protect, userController.me);

router.route('/')
	.get(protect, userController.getAllUsers)
	.post(userController.uploadImage, userController.createUser);

router.use(protect);
router.route('/:id')
	.get(userController.getUser)
	.patch(userController.uploadImage, userController.updateUser)
	.delete(userController.deleteUser)

module.exports = router;