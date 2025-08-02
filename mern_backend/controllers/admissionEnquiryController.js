const AdmissionEnquiry = require('../models/AdmissionEnquiry');

// Get all admission enquiries
exports.getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await AdmissionEnquiry.find().sort({ date: -1 });
    res.json(enquiries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single admission enquiry by ID
exports.getEnquiryById = async (req, res) => {
  try {
    const enquiry = await AdmissionEnquiry.findById(req.params.id);
    if (!enquiry) return res.status(404).json({ message: 'Enquiry not found' });
    res.json(enquiry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new admission enquiry
exports.createEnquiry = async (req, res) => {
  try {
    const enquiry = new AdmissionEnquiry(req.body);
    await enquiry.save();
    res.status(201).json(enquiry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update an enquiry
exports.updateEnquiry = async (req, res) => {
  try {
    const enquiry = await AdmissionEnquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!enquiry) return res.status(404).json({ message: 'Enquiry not found' });
    res.json(enquiry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete an enquiry
exports.deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await AdmissionEnquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) return res.status(404).json({ message: 'Enquiry not found' });
    res.json({ message: 'Enquiry deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
