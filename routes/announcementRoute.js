const express = require('express');
const router = express.Router();
const announcementsController = require('../controllers/announcementController');
const { protect } = require('../controllers/authController');

router.route('/')
	.get(announcementsController.getAllAnnouncements)
	.post([protect, announcementsController.uploadImage], announcementsController.createAnnouncement);

router.route('/:id')
	.get(announcementsController.getAnnouncement)
	.patch([protect, announcementsController.uploadImage], announcementsController.updateAnnouncement)
	.delete(protect, announcementsController.deleteAnnouncement)

module.exports = router;