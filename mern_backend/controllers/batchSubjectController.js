const BatchSubject = require('../models/BatchSubject');

// Create a new batch subject
exports.createBatchSubject = async (req, res) => {
  try {
    const batchSubject = new BatchSubject(req.body);
    await batchSubject.save();
    res.status(201).json(batchSubject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all batch subjects
exports.getBatchSubjects = async (req, res) => {
  try {
    const batchSubjects = await BatchSubject.find().populate('subject_id');
    res.json(batchSubjects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a batch subject by ID
exports.getBatchSubjectById = async (req, res) => {
  try {
    const batchSubject = await BatchSubject.findById(req.params.id).populate('subject_id');
    if (!batchSubject) return res.status(404).json({ error: 'BatchSubject not found' });
    res.json(batchSubject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a batch subject
exports.updateBatchSubject = async (req, res) => {
  try {
    const batchSubject = await BatchSubject.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!batchSubject) return res.status(404).json({ error: 'BatchSubject not found' });
    res.json(batchSubject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a batch subject
exports.deleteBatchSubject = async (req, res) => {
  try {
    const batchSubject = await BatchSubject.findByIdAndDelete(req.params.id);
    if (!batchSubject) return res.status(404).json({ error: 'BatchSubject not found' });
    res.json({ message: 'BatchSubject deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
