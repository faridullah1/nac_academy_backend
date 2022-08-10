const { Announcement } = require('../models/announcementModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const multer = require('multer');
const uploadToS3 = require('../utils/uploadToS3');
const AppError = require('../utils/appError');

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

exports.uploadImage = upload.single('image');

exports.createAnnouncement = catchAsync(async (req, res, next) => {
	if (req.file) {
		req.body.image = await uploadToS3(req.file, 'announcements');
	}
	
	const accouncement = await Announcement.create({
		title: req.body.title,
		description: req.body.description,
		image: req.body.image,
		isMain: req.body.isMain,
		expiryDate: req.body.expiryDate
	});
	
	res.status(201).json({
		status: 'success',
		data: {
			accouncement
		}
	});
});

exports.getAllAnnouncements = catchAsync(async (req, res, next) => {
	// Build Query
	const features = new APIFeatures(Announcement.find(), req.query).filter().sort().limitFields().paginate();

	// Execute Query
	const announcements = await features.query;

	return res.status(200).json({
		status: 'success',
		records: announcements.length,
		data: {
			announcements
		}
	});
});

exports.getAnnouncement = catchAsync(async (req, res, next) => {
	const announcement = await Announcement.findById(req.params.id);
	
	if (!announcement) return next(new AppError('Announcement with the given ID was not found.', 404));

	res.status(200).json({
		status: 'success',
		data: {
			announcement
		}
	});
});

exports.updateAnnouncement = catchAsync(async (req, res, next) => {
	if (req.file) {
		req.body.image = await uploadToS3(req.file, 'announcements');
	}

	const announcement = await Announcement.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true
	});

	if (!announcement) return next(new AppError('Announcement with the given ID was not found.', 404));

	res.status(200).json({
		status: 'success',
		data: {
			announcement
		}
	});
});

exports.deleteAnnouncement = catchAsync(async (req, res, next) => {
	const announcement = await Announcement.findByIdAndDelete(req.params.id);

	if (!announcement) return next(new AppError('Announcement with the given ID was not found.', 404));

	res.status(204).json({
		status: 'success',
		data: {
			announcement
		}
	});
});