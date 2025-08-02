const AdmitCard = require('../models/AdmitCard');

// Create a new admit card template
exports.createAdmitCard = async (req, res) => {
  try {
    const admitCard = new AdmitCard(req.body);
    await admitCard.save();
    res.status(201).json(admitCard);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all admit card templates
exports.getAdmitCards = async (req, res) => {
  try {
    const admitCards = await AdmitCard.find();
    res.json(admitCards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get an admit card template by ID
exports.getAdmitCardById = async (req, res) => {
  try {
    const admitCard = await AdmitCard.findById(req.params.id);
    if (!admitCard) return res.status(404).json({ error: 'AdmitCard not found' });
    res.json(admitCard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an admit card template
exports.updateAdmitCard = async (req, res) => {
  try {
    const admitCard = await AdmitCard.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!admitCard) return res.status(404).json({ error: 'AdmitCard not found' });
    res.json(admitCard);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an admit card template
exports.deleteAdmitCard = async (req, res) => {
  try {
    const admitCard = await AdmitCard.findByIdAndDelete(req.params.id);
    if (!admitCard) return res.status(404).json({ error: 'AdmitCard not found' });
    res.json({ message: 'AdmitCard deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
