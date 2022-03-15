const mongoose = require('mongoose');
const systemSettingsSchema = mongoose.Schema({
	logo: String,
	academyName: {
		type: String,
		required: [true, 'Academy name is required'],
		minLength: 5,
		maxLength: 55,
	},
	address: {
		type: String,
		required: [true, 'Address is required'],
		minLength: 5,
		maxLength: 55,
	},
	mobileNo: {
		type: String,
		required: [true, 'MobileNo is required'],
		minLength: 11,
		maxLength: 11,
		unique: [true, 'MobileNo must be unique']
	},
	email: {
		type: String,
		required: [true, 'Email is required'],
		unique: [true, 'Email must be unique']
	},
	dateSheet: String,
	principleImage: {
		type: String,
		required: [true, 'Principle Image is required']
	},
	principleMessage: {
		type: String,
		required: [true, 'Principle Message is required'],
		minLength: 50,
		maxLength: 1000,
	},
	introduction: {
		type: String,
		required: [true, 'Principle Message is required'],
		minLength: 50,
		maxLength: 1000,
	},
	introductionImage: {
		type: String,
		required: [true, 'Introduction Image is required']
	},
});

const SystemSetting = mongoose.model('SystemSetting', systemSettingsSchema);

module.exports = SystemSetting;