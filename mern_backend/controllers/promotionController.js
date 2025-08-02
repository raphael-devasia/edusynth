const Promotion = require('../models/Promotion');

// Create a new Promotion
exports.createPromotion = async (req, res) => {
  try {
    const promotion = new Promotion(req.body);
    await promotion.save();
    res.status(201).json(promotion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all Promotions
exports.getAllPromotions = async (req, res) => {
  try {
    const promotions = await Promotion.find()
      .populate('student_id')
      .populate('from_class_id')
      .populate('from_section_id')
      .populate('to_class_id')
      .populate('to_section_id')
      .populate('session_id');
    res.json(promotions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Promotion by ID
exports.getPromotionById = async (req, res) => {
  try {
    const promotion = await Promotion.findById(req.params.id)
      .populate('student_id')
      .populate('from_class_id')
      .populate('from_section_id')
      .populate('to_class_id')
      .populate('to_section_id')
      .populate('session_id');
    if (!promotion) return res.status(404).json({ error: 'Promotion not found' });
    res.json(promotion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Promotion
exports.updatePromotion = async (req, res) => {
  try {
    const promotion = await Promotion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!promotion) return res.status(404).json({ error: 'Promotion not found' });
    res.json(promotion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete Promotion
exports.deletePromotion = async (req, res) => {
  try {
    const promotion = await Promotion.findByIdAndDelete(req.params.id);
    if (!promotion) return res.status(404).json({ error: 'Promotion not found' });
    res.json({ message: 'Promotion deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
