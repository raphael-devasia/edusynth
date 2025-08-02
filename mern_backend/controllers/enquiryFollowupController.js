const EnquiryFollowup = require('../models/EnquiryFollowup');

// Create a new EnquiryFollowup
exports.createEnquiryFollowup = async (req, res) => {
  try {
    const enquiryFollowup = new EnquiryFollowup(req.body);
    await enquiryFollowup.save();
    res.status(201).json(enquiryFollowup);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all EnquiryFollowups
exports.getAllEnquiryFollowups = async (req, res) => {
  try {
    const enquiryFollowups = await EnquiryFollowup.find()
      .populate('enquiry_id');
    res.json(enquiryFollowups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get EnquiryFollowup by ID
exports.getEnquiryFollowupById = async (req, res) => {
  try {
    const enquiryFollowup = await EnquiryFollowup.findById(req.params.id)
      .populate('enquiry_id');
    if (!enquiryFollowup) return res.status(404).json({ error: 'EnquiryFollowup not found' });
    res.json(enquiryFollowup);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update EnquiryFollowup
exports.updateEnquiryFollowup = async (req, res) => {
  try {
    const enquiryFollowup = await EnquiryFollowup.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!enquiryFollowup) return res.status(404).json({ error: 'EnquiryFollowup not found' });
    res.json(enquiryFollowup);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete EnquiryFollowup
exports.deleteEnquiryFollowup = async (req, res) => {
  try {
    const enquiryFollowup = await EnquiryFollowup.findByIdAndDelete(req.params.id);
    if (!enquiryFollowup) return res.status(404).json({ error: 'EnquiryFollowup not found' });
    res.json({ message: 'EnquiryFollowup deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
