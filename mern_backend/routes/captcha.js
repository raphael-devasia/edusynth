const express = require('express');
const router = express.Router();
const captchaController = require('../controllers/captchaController');

// Create or update captcha setting
router.post('/', captchaController.createOrUpdateCaptcha);

// Get all captcha settings
router.get('/', captchaController.getCaptchas);

// Get captcha by name
router.get('/:name', captchaController.getCaptchaByName);

module.exports = router;
