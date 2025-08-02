const Notice = require('../models/Notice');

// Create a new Notice
exports.createNotice = async (req, res) => {
  try {
    const notice = new Notice(req.body);
    await notice.save();
    res.status(201).json(notice);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all Notices
exports.getAllNotices = async (req, res) => {
  try {
    const notices = await Notice.find();
    res.json(notices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Notice by ID
exports.getNoticeById = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) return res.status(404).json({ error: 'Notice not found' });
    res.json(notice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Notice
exports.updateNotice = async (req, res) => {
  try {
    const notice = await Notice.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!notice) return res.status(404).json({ error: 'Notice not found' });
    res.json(notice);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete Notice
exports.deleteNotice = async (req, res) => {
  try {
    const notice = await Notice.findByIdAndDelete(req.params.id);
    if (!notice) return res.status(404).json({ error: 'Notice not found' });
    res.json({ message: 'Notice deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
