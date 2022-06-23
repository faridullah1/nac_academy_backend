const mongoose = require('mongoose');

const announcementSchema = mongoose.Schema({
	title: {
		type: String,
		required: [true, 'title is required'],
		minLength: 5,
		maxLength: 55,
	},
	description: {
		type: String,
		required: [true, 'Description is required'],
		minLength: 5,
		maxLength: 255,
	},
	image: String,
	isExpired: {
		type: Boolean,
		default: false
	},
	isMain: {
		type: Boolean,
		default: false
	},
	expiryDate: {
		type: Number,
		required: [true, 'Expiry Date is required']
	},
	createdAt: {
		type: Date,
		default: Date.now()
	}
});

const Announcement = mongoose.model('Announcement', announcementSchema);

exports.Announcement = Announcement;