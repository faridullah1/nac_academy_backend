const express = require('express');
const router = express.Router();
const systemSettingController = require('../controllers/systemSettingController');

router.route('/')
	.get(systemSettingController.getSystemSetting)
	.post(systemSettingController.uploadImage, systemSettingController.createSystemSetting)
	.patch(systemSettingController.uploadImage, systemSettingController.updateSystemSetting);
module.exports = router;