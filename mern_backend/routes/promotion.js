const express = require('express');
const router = express.Router();
const promotionController = require('../controllers/promotionController');

// Create a new Promotion
router.post('/', promotionController.createPromotion);

// Get all Promotions
router.get('/', promotionController.getAllPromotions);

// Get Promotion by ID
router.get('/:id', promotionController.getPromotionById);

// Update Promotion
router.put('/:id', promotionController.updatePromotion);

// Delete Promotion
router.delete('/:id', promotionController.deletePromotion);

module.exports = router;
