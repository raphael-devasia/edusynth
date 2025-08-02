const express = require('express');
const router = express.Router();
const staffRatingController = require('../controllers/staffRatingController');

// Create a new rating
router.post('/', staffRatingController.createStaffRating);

// Get all ratings for a staff member
router.get('/staff/:staffId', staffRatingController.getRatingsByStaff);

// Get all ratings by a user
router.get('/user/:userId', staffRatingController.getRatingsByUser);

// Update a rating
router.put('/:id', staffRatingController.updateStaffRating);

// Delete a rating
router.delete('/:id', staffRatingController.deleteStaffRating);

module.exports = router;
