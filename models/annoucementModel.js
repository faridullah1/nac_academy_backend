
const mongoose = require('mongoose');
const annoucementSchema = mongoose.Schema({
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
		type: Date,
		required: [true, 'Expiry Date is required']
	},
	createdAt: {
		type: Date,
		default: Date.now()
	}
});

const Annoucement = mongoose.model('Annoucement', annoucementSchema);

module.exports = Annoucement;