const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const dispatchController = require('../controllers/dispatchController');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/dispatch_receive'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Create a new dispatch/receive record
router.post('/', upload.single('image'), dispatchController.createDispatch);

// Get all dispatch/receive records or by ID
router.get('/', dispatchController.getDispatches);

// Update a dispatch/receive record
router.put('/:id', upload.single('image'), dispatchController.updateDispatch);

// Delete a dispatch/receive record
router.delete('/:id', dispatchController.deleteDispatch);

// Download attached file for receive
router.get('/download/:id', dispatchController.downloadDispatchFile);

module.exports = router;
