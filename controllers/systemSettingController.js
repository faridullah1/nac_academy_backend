const SystemSetting = require('../models/systemSettingModel');
const catchAsync = require('../utils/catchAsync');
const multer = require('multer');
const uploadToS3 = require('../utils/uploadToS3');

const multerFilter = (req, file, cb) => {
	if (file.mimetype.startsWith('image')) {
		cb(null, true);
	} else {
		cb(new Error('Not an image! please upload only images.'), false);
	}
}

const upload = multer({
	dest: 'temp/',
	fileFilter: multerFilter,
});

exports.uploadImage = upload.fields([
	{ name: 'logo' },
	{ name: 'principleImage' },
	{ name: 'introductionImage' }	
]);

exports.createSystemSetting = catchAsync(async (req, res, next) => {
	// First upload all images;
	const uploadesArray = [];
	for (let key in req.files) {
		uploadesArray.push(uploadToS3(req.files[key][0], 'system-settings'));
	}

	const images = await Promise.all(uploadesArray);

	// Set image url with respective column name in database;
	let index = 0;
	for (let key in req.files) {
		req.body[key] = images[index];
		index ++;
	} 

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
	// First upload all images;
	const uploadesArray = [];
	for (let key in req.files) {
		uploadesArray.push(uploadToS3(req.files[key][0], 'system-settings'));
	}

	const images = await Promise.all(uploadesArray);

	// Set image url with respective column name in database;
	let index = 0;
	for (let key in req.files) {
		req.body[key] = images[index];
		index ++;
	}

	const systemSettings = await SystemSetting.updateOne({}, req.body, {
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
