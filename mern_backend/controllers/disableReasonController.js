const DisableReason = require('../models/DisableReason');

// Create a new disable reason
exports.createDisableReason = async (req, res) => {
  try {
    const disableReason = new DisableReason(req.body);
    await disableReason.save();
    res.status(201).json(disableReason);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all disable reasons or by ID
exports.getDisableReasons = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const disableReason = await DisableReason.findById(id);
      if (!disableReason) return res.status(404).json({ error: 'DisableReason not found' });
      res.json(disableReason);
    } else {
      const disableReasons = await DisableReason.find().sort({ _id: 1 });
      res.json(disableReasons);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a disable reason
exports.updateDisableReason = async (req, res) => {
  try {
    const disableReason = await DisableReason.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!disableReason) return res.status(404).json({ error: 'DisableReason not found' });
    res.json(disableReason);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a disable reason
exports.deleteDisableReason = async (req, res) => {
  try {
    const disableReason = await DisableReason.findByIdAndDelete(req.params.id);
    if (!disableReason) return res.status(404).json({ error: 'DisableReason not found' });
    res.json({ message: 'DisableReason deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
