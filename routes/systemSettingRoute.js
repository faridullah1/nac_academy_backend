const express = require('express');
const router = express.Router();
const systemSettingController = require('../controllers/systemSettingController');
const { protect } = require('../controllers/authController');

router.route('/')
	.get(systemSettingController.getSystemSetting)
	.post(protect, systemSettingController.uploadImage, systemSettingController.createSystemSetting)
	.patch(protect, systemSettingController.uploadImage, systemSettingController.updateSystemSetting);
module.exports = router;