const StaffRating = require('../models/StaffRating');

// Create a new staff rating
exports.createStaffRating = async (req, res) => {
  try {
    const rating = new StaffRating(req.body);
    await rating.save();
    res.status(201).json(rating);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all ratings for a staff member
exports.getRatingsByStaff = async (req, res) => {
  try {
    const ratings = await StaffRating.find({ staff_id: req.params.staffId }).populate('user_id', 'name email');
    res.json(ratings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all ratings by a user
exports.getRatingsByUser = async (req, res) => {
  try {
    const ratings = await StaffRating.find({ user_id: req.params.userId }).populate('staff_id', 'name surname');
    res.json(ratings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a rating
exports.updateStaffRating = async (req, res) => {
  try {
    const rating = await StaffRating.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!rating) return res.status(404).json({ error: 'Rating not found' });
    res.json(rating);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a rating
exports.deleteStaffRating = async (req, res) => {
  try {
    const rating = await StaffRating.findByIdAndDelete(req.params.id);
    if (!rating) return res.status(404).json({ error: 'Rating not found' });
    res.json({ message: 'Rating deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
