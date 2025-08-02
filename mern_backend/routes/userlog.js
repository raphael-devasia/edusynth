const express = require('express');
const router = express.Router();
const userlogController = require('../controllers/userlogController');

// Create or update a user log entry
router.post('/', userlogController.createOrUpdateUserlog);

// Get all user logs
router.get('/', userlogController.getAllUserlogs);

// Get paginated user logs with search and filtering
router.get('/paginated', userlogController.getPaginatedUserlogs);

// Get user logs by role
router.get('/role/:role', userlogController.getUserlogsByRole);

// Get staff user logs (excluding Parent and Student)
router.get('/staff', userlogController.getStaffUserlogs);

// Get user log by ID
router.get('/:id', userlogController.getUserlogById);

// Delete user log by ID
router.delete('/:id', userlogController.deleteUserlog);

// Delete all user logs
router.delete('/', userlogController.deleteAllUserlogs);

module.exports = router;
