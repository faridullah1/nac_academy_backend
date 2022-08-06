const express = require('express');
const router = express.Router();
const announcementsController = require('../controllers/announcementController');
const { auth } = require('../middleware/auth');

router.route('/')
	.get(announcementsController.getAllAnnouncements)
	.post([auth, announcementsController.uploadImage], announcementsController.createAnnouncement);

router.route('/:id')
	.get(announcementsController.getAnnouncement)
	.patch([auth, announcementsController.uploadImage], announcementsController.updateAnnouncement)
	.delete(auth, announcementsController.deleteAnnouncement)

module.exports = router;