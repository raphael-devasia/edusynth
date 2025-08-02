const express = require('express');
const router = express.Router();
const visitorController = require('../controllers/visitorController');
const upload = require('../middleware/upload');

// Create visitor (with file/image upload)
router.post('/', upload.single('file'), visitorController.createVisitor);
// Get all visitors
router.get('/', visitorController.getAllVisitors);
// Get visitor by ID
router.get('/:id', visitorController.getVisitorById);
// Update visitor (with file/image upload)
router.put('/:id', upload.single('file'), visitorController.updateVisitor);
// Delete visitor
router.delete('/:id', visitorController.deleteVisitor);

// Upload file/image only (returns path)
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ path: `/uploads/visitors/${req.file.filename}` });
});

module.exports = router;
