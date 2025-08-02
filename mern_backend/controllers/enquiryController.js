const Enquiry = require('../models/Enquiry');

// Create a new enquiry
exports.createEnquiry = async (req, res) => {
  try {
    const enquiry = new Enquiry(req.body);
    await enquiry.save();
    res.status(201).json(enquiry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all enquiries or by ID
exports.getEnquiries = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const enquiry = await Enquiry.findById(id);
      if (!enquiry) return res.status(404).json({ error: 'Enquiry not found' });
      res.json(enquiry);
    } else {
      const enquiries = await Enquiry.find();
      res.json(enquiries);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an enquiry
exports.updateEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!enquiry) return res.status(404).json({ error: 'Enquiry not found' });
    res.json(enquiry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an enquiry
exports.deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) return res.status(404).json({ error: 'Enquiry not found' });
    res.json({ message: 'Enquiry deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
