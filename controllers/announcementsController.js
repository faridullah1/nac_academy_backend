const { Announcement } = require('../models/announcementModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const multer = require('multer');
const aws = require('aws-sdk');
const fs = require('fs');

const multerStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'public/assets/images');
	},
	filename: (req, file, cb) => {
		const ext = file.mimetype.split('/')[1];
		cb(null, `annoucement-${Date.now()}.${ext}`);
	}
});

const multerFilter = (req, file, cb) => {
	if (file.mimetype.startsWith('image')) {
		cb(null, true);
	} else {
		cb(new Error('Not an image! please upload only images.'), false);
	}
}

const upload2 = multer({
	storage: multerStorage,
	fileFilter: multerFilter
});

const upload = multer({ dest: 'temp/', limits: { fieldSize: 8 * 1024 * 1024 } });

exports.uploadImage = upload.single('image');

exports.createAnnouncement = catchAsync(async (req, res, next) => {
	aws.config.setPromisesDependency();
    aws.config.update({
		accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
      	region: process.env.REGION
    });

    const s3 = new aws.S3();

	const params = {
		ACL: 'public-read',
		Bucket: process.env.S3_BUCKET,
		Body: fs.createReadStream(req.file.path),
		Key: `announcements/${req.file.originalname}`
	  };
  
	s3.upload(params, async (err, data) => {
		if (err) {
		  	console.log('Error occured while trying to upload to S3 bucket', err);
		}
  
		if (data) {
			fs.unlinkSync(req.file.path); 			// Empty temp folder
			const locationUrl = data.Location;
			req.body.image = locationUrl;

			const accouncement = await Announcement.create(req.body);

			res.status(201).json({
				status: 'success',
				data: {
					accouncement
				}
			});
		}
	});
});

exports.getAllAnnouncements = catchAsync(async (req, res, next) => {
	// Build Query
	const features = new APIFeatures(Announcement.find(), req.query).filter().sort().limitFields().paginate();

	// Execute Query
	const announcements = await features.query;

	// Add base url to each image if exists;
	// for (let rec of announcements) {
	// 	if (rec.image) {
	// 		rec.image = `${req.get('host')}/assets/images/${rec.image}`;
	// 	}
	// }

	res.status(200).json({
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