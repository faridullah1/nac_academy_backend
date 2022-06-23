const express = require('express');
const router = express.Router();
const announcementsController = require('../controllers/announcementsController');

router.route('/')
	.get(announcementsController.getAllAnnouncements)
	.post(announcementsController.uploadImage, announcementsController.createAnnouncement);

module.exports = router;