const express = require('express');
const router = express.Router();
const systemSettingController = require('../controllers/systemSettingController');

router.route('/')
	.get(systemSettingController.getSystemSetting)
	.post(systemSettingController.createSystemSetting)
	.patch(systemSettingController.updateSystemSetting);
module.exports = router;