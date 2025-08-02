const FeeMaster = require('../models/FeeMaster');

// Create a new fee master
exports.createFeeMaster = async (req, res) => {
  try {
    const feeMaster = new FeeMaster(req.body);
    await feeMaster.save();
    res.status(201).json(feeMaster);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all fee masters or by ID
exports.getFeeMasters = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const feeMaster = await FeeMaster.findById(id)
        .populate('feetype_id class_id session_id');
      if (!feeMaster) return res.status(404).json({ error: 'FeeMaster not found' });
      res.json(feeMaster);
    } else {
      const feeMasters = await FeeMaster.find()
        .populate('feetype_id class_id session_id');
      res.json(feeMasters);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a fee master
exports.updateFeeMaster = async (req, res) => {
  try {
    const feeMaster = await FeeMaster.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!feeMaster) return res.status(404).json({ error: 'FeeMaster not found' });
    res.json(feeMaster);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a fee master
exports.deleteFeeMaster = async (req, res) => {
  try {
    const feeMaster = await FeeMaster.findByIdAndDelete(req.params.id);
    if (!feeMaster) return res.status(404).json({ error: 'FeeMaster not found' });
    res.json({ message: 'FeeMaster deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
