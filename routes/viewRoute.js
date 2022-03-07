const express = require('express');
const router = express.Router();

router.route('/').get((req, res) => {
	console.log('I am here...')
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

router.route('/students').get((req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

router.route('/courses').get((req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

router.route('/employees').get((req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

router.route('/teachers').get((req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

module.exports = router;