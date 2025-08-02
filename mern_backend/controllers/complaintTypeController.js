const ComplaintType = require('../models/ComplaintType');

// Create a new complaint type
exports.createComplaintType = async (req, res) => {
  try {
    const complaintType = new ComplaintType(req.body);
    await complaintType.save();
    res.status(201).json(complaintType);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all complaint types or by ID
exports.getComplaintTypes = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const complaintType = await ComplaintType.findById(id);
      if (!complaintType) return res.status(404).json({ error: 'ComplaintType not found' });
      res.json(complaintType);
    } else {
      const complaintTypes = await ComplaintType.find().sort({ _id: 1 });
      res.json(complaintTypes);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a complaint type
exports.updateComplaintType = async (req, res) => {
  try {
    const complaintType = await ComplaintType.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!complaintType) return res.status(404).json({ error: 'ComplaintType not found' });
    res.json(complaintType);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a complaint type
exports.deleteComplaintType = async (req, res) => {
  try {
    const complaintType = await ComplaintType.findByIdAndDelete(req.params.id);
    if (!complaintType) return res.status(404).json({ error: 'ComplaintType not found' });
    res.json({ message: 'ComplaintType deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
