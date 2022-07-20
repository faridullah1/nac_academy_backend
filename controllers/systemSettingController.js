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
	{
		name: 'principleImage',
		maxCount: 1
	},
	{
		name: 'introductionImage',
		maxCount: 1
	}
]);

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
	const noOfFiles = Object.keys(req.files).length;
	if (noOfFiles === 2) {
		const principleImage = await uploadToS3(req.files['principleImage'][0], 'system-settings');
		req.body.principleImage = principleImage;
		
		const introductionImage = await uploadToS3(req.files['introductionImage'][0], 'system-settings');
		req.body.introductionImage = introductionImage;

		updateDocument(req, res);
	}
	else if (noOfFiles === 1) {
		if (req.files.principleImage) uploadFile('principleImage', req, res);
		else uploadFile('introductionImage', req, res);
	}
	else updateDocument(req, res);
});

uploadFile = async (fileKey, req, res) => {
	const image = await uploadToS3(req.files[fileKey][0], 'system-settings');
	req.body[fileKey] = image;

	updateDocument(req, res);
}

updateDocument = async (req, res) => {
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
}
