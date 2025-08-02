const Photo = require('../models/Photo');

// Create a new Photo
exports.createPhoto = async (req, res) => {
  try {
    const photo = new Photo(req.body);
    await photo.save();
    res.status(201).json(photo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all Photos
exports.getAllPhotos = async (req, res) => {
  try {
    const photos = await Photo.find().populate('uploaded_by');
    res.json(photos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Photo by ID
exports.getPhotoById = async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id).populate('uploaded_by');
    if (!photo) return res.status(404).json({ error: 'Photo not found' });
    res.json(photo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Photo
exports.updatePhoto = async (req, res) => {
  try {
    const photo = await Photo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!photo) return res.status(404).json({ error: 'Photo not found' });
    res.json(photo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete Photo
exports.deletePhoto = async (req, res) => {
  try {
    const photo = await Photo.findByIdAndDelete(req.params.id);
    if (!photo) return res.status(404).json({ error: 'Photo not found' });
    res.json({ message: 'Photo deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
