const express = require('express');
const router = express.Router();
const annoucementsController = require('../controllers/annoucementsController');

router.route('/')
	.get(annoucementsController.getAllAnnoucements)
	.post(annoucementsController.uploadImage, annoucementsController.createAnnoucement);

module.exports = router;