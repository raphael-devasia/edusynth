const Download = require('../models/Download');

// Create a new download
exports.createDownload = async (req, res) => {
  try {
    const download = new Download(req.body);
    await download.save();
    res.status(201).json(download);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all downloads
exports.getAllDownloads = async (req, res) => {
  try {
    const downloads = await Download.find().populate('uploaded_by', 'name');
    res.json(downloads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get download by ID
exports.getDownloadById = async (req, res) => {
  try {
    const download = await Download.findById(req.params.id).populate('uploaded_by', 'name');
    if (!download) return res.status(404).json({ error: 'Download not found' });
    res.json(download);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update download
exports.updateDownload = async (req, res) => {
  try {
    const download = await Download.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!download) return res.status(404).json({ error: 'Download not found' });
    res.json(download);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete download
exports.deleteDownload = async (req, res) => {
  try {
    const download = await Download.findByIdAndDelete(req.params.id);
    if (!download) return res.status(404).json({ error: 'Download not found' });
    res.json({ message: 'Download deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
