const { Announcement } = require('../models/announcementModel');
const APIFeatures = require('../utils/apiFeatures');
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

exports.uploadImage = upload.single('image');

exports.createAnnouncement = catchAsync(async (req, res, next) => {
	if (req.file) {
		const imageURL = await uploadToS3(req.file, 'announcements');
		req.body.image = imageURL;
		
		insertAnnouncement(req, res);
	}
	else insertAnnouncement(req, res);
});

exports.getAllAnnouncements = catchAsync(async (req, res, next) => {
	// Build Query
	const features = new APIFeatures(Announcement.find(), req.query).filter().sort().limitFields().paginate();

	// Execute Query
	const announcements = await features.query;

	return res.status(200).json({
		status: 'success',
		records: await Announcement.count(),
		data: {
			announcements
		}
	});
});

exports.getAnnouncement = catchAsync(async (req, res, next) => {
	const announcement = await Announcement.findById(req.params.id);
	
	res.status(200).json({
		status: 'success',
		data: {
			announcement
		}
	});
});

exports.updateAnnouncement = catchAsync(async (req, res, next) => {
	const announcement = await Announcement.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true
	});

	res.status(200).json({
		status: 'success',
		data: {
			announcement
		}
	});
});

exports.deleteAnnouncement = catchAsync(async (req, res, next) => {
	const announcement = await Announcement.findByIdAndDelete(req.params.id);

	res.status(204).json({
		status: 'success',
		data: {
			announcement
		}
	});
});

insertAnnouncement = async (req, res) => {
	const accouncement = await Announcement.create(req.body);
	
	res.status(201).json({
		status: 'success',
		data: {
			accouncement
		}
	});
}