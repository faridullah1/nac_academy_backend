const express = require('express');
const router = express.Router();
const announcementsController = require('../controllers/announcementController');

router.route('/')
	.get(announcementsController.getAllAnnouncements)
	.post(announcementsController.uploadImage, announcementsController.createAnnouncement);

router.route('/:id')
	.get(announcementsController.getAnnouncement)
	.patch(announcementsController.uploadImage, announcementsController.updateAnnouncement)
	.delete(announcementsController.deleteAnnouncement)

module.exports = router;