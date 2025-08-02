const express = require('express');
const router = express.Router();
const videoTutorialController = require('../controllers/videoTutorialController');

// Create a new video tutorial
router.post('/', videoTutorialController.createVideoTutorial);
// Get all video tutorials
router.get('/', videoTutorialController.getVideoTutorials);
// Get a single video tutorial by ID
router.get('/:id', videoTutorialController.getVideoTutorialById);
// Update a video tutorial
router.put('/:id', videoTutorialController.updateVideoTutorial);
// Delete a video tutorial
router.delete('/:id', videoTutorialController.deleteVideoTutorial);

module.exports = router;
