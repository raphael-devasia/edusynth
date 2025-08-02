const StaffFeedback = require('../models/StaffFeedback');

// Get all feedback for a staff member or all
exports.getAllFeedback = async (req, res) => {
  try {
    const { staff_id } = req.query;
    const filter = staff_id ? { staff_id } : {};
    const feedbacks = await StaffFeedback.find(filter).sort({ created_at: -1 });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single feedback by id
exports.getFeedbackById = async (req, res) => {
  try {
    const feedback = await StaffFeedback.findById(req.params.id);
    if (!feedback) return res.status(404).json({ message: 'Feedback not found' });
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new feedback
exports.createFeedback = async (req, res) => {
  try {
    const feedback = new StaffFeedback(req.body);
    await feedback.save();
    res.status(201).json(feedback);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update feedback
exports.updateFeedback = async (req, res) => {
  try {
    const feedback = await StaffFeedback.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!feedback) return res.status(404).json({ message: 'Feedback not found' });
    res.json(feedback);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete feedback
exports.deleteFeedback = async (req, res) => {
  try {
    const feedback = await StaffFeedback.findByIdAndDelete(req.params.id);
    if (!feedback) return res.status(404).json({ message: 'Feedback not found' });
    res.json({ message: 'Feedback deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
