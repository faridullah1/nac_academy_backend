const SystemSetting = require('../models/systemSettingModel');
const catchAsync = require('../utils/catchAsync');

exports.createSystemSetting = catchAsync(async (req, res, next) => {
	const systemSettings = await SystemSetting.create(req.body);

	res.status(201).json({
		status: 'success',
		data: {
			systemSettings
		}
	});
});

exports.getSystemSetting = catchAsync(async (req, res, next) => {
	const systemSettings = await SystemSetting.findOne();
	
	res.status(200).json({
		status: 'success',
		data: {
			systemSettings
		}
	});
});

exports.updateSystemSetting = catchAsync(async (req, res, next) => {
	const systemSettings = await SystemSetting.findByIdAndUpdate({}, req.body, {
		new: true,
		runValidators: true
	});
	
	res.status(200).json({
		status: 'success',
		data: {
			systemSettings
		}
	});
});
