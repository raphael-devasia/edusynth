const CustomField = require('../models/CustomField');

// Create a new custom field
exports.createCustomField = async (req, res) => {
  try {
    const customField = new CustomField(req.body);
    await customField.save();
    res.status(201).json(customField);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all custom fields or by ID
exports.getCustomFields = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const customField = await CustomField.findById(id);
      if (!customField) return res.status(404).json({ error: 'CustomField not found' });
      res.json(customField);
    } else {
      const customFields = await CustomField.find();
      res.json(customFields);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a custom field
exports.updateCustomField = async (req, res) => {
  try {
    const customField = await CustomField.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!customField) return res.status(404).json({ error: 'CustomField not found' });
    res.json(customField);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a custom field
exports.deleteCustomField = async (req, res) => {
  try {
    const customField = await CustomField.findByIdAndDelete(req.params.id);
    if (!customField) return res.status(404).json({ error: 'CustomField not found' });
    res.json({ message: 'CustomField deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
