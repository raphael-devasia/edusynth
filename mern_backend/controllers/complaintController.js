const Complaint = require('../models/Complaint');
const path = require('path');
const fs = require('fs');

// Create a new complaint (with file upload)
exports.createComplaint = async (req, res) => {
  try {
    let data = req.body;
    if (req.file) {
      data.image = req.file.filename;
    }
    const complaint = new Complaint(data);
    await complaint.save();
    res.status(201).json(complaint);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Download attached file for complaint
exports.downloadComplaintFile = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint || !complaint.image) return res.status(404).json({ error: 'No file found' });
    const filePath = path.join(__dirname, '../uploads/complaints', complaint.image);
    if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'File not found' });
    res.download(filePath, complaint.image);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get complaint details (for modal)
exports.getComplaintDetails = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ error: 'Complaint not found' });
    res.json(complaint);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all complaints or by ID
exports.getComplaints = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const complaint = await Complaint.findById(id);
      if (!complaint) return res.status(404).json({ error: 'Complaint not found' });
      res.json(complaint);
    } else {
      const complaints = await Complaint.find().sort({ _id: -1 });
      res.json(complaints);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a complaint (with file upload)
exports.updateComplaint = async (req, res) => {
  try {
    let data = req.body;
    if (req.file) {
      data.image = req.file.filename;
    }
    const complaint = await Complaint.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!complaint) return res.status(404).json({ error: 'Complaint not found' });
    res.json(complaint);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a complaint and file
exports.deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndDelete(req.params.id);
    if (!complaint) return res.status(404).json({ error: 'Complaint not found' });
    if (complaint.image) {
      const filePath = path.join(__dirname, '../uploads/complaints', complaint.image);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
    res.json({ message: 'Complaint deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
