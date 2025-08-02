const express = require('express');
const router = express.Router();
const noticeController = require('../controllers/noticeController');

// Create a new Notice
router.post('/', noticeController.createNotice);

// Get all Notices
router.get('/', noticeController.getAllNotices);

// Get Notice by ID
router.get('/:id', noticeController.getNoticeById);

// Update Notice
router.put('/:id', noticeController.updateNotice);

// Delete Notice
router.delete('/:id', noticeController.deleteNotice);

module.exports = router;
