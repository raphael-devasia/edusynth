const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

// Create a new Job
router.post('/', jobController.createJob);

// Get all Jobs
router.get('/', jobController.getAllJobs);

// Get Job by ID
router.get('/:id', jobController.getJobById);

// Update Job
router.put('/:id', jobController.updateJob);

// Delete Job
router.delete('/:id', jobController.deleteJob);

module.exports = router;
