const express = require('express');
const router = express.Router();
const videoTutorialClassSectionController = require('../controllers/videoTutorialClassSectionController');

// Create a new video tutorial class section
router.post('/', videoTutorialClassSectionController.createVideoTutorialClassSection);
// Get all video tutorial class sections
router.get('/', videoTutorialClassSectionController.getVideoTutorialClassSections);
// Get a single video tutorial class section by ID
router.get('/:id', videoTutorialClassSectionController.getVideoTutorialClassSectionById);
// Update a video tutorial class section
router.put('/:id', videoTutorialClassSectionController.updateVideoTutorialClassSection);
// Delete a video tutorial class section
router.delete('/:id', videoTutorialClassSectionController.deleteVideoTutorialClassSection);

module.exports = router;
