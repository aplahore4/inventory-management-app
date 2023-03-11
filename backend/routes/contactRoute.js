const express = require('express');
const router = express.Router();
const { contactUs } = require('../controllers/contactController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, contactUs);

module.exports = router;
