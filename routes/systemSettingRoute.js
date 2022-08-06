const express = require('express');
const router = express.Router();
const systemSettingController = require('../controllers/systemSettingController');
const { auth } = require('../middleware/auth');

router.route('/')
	.get(systemSettingController.getSystemSetting)
	.post(auth, systemSettingController.uploadImage, systemSettingController.createSystemSetting)
	.patch(auth, systemSettingController.uploadImage, systemSettingController.updateSystemSetting);
module.exports = router;