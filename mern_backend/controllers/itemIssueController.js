const ItemIssue = require('../models/ItemIssue');

// Create a new item issue
exports.createItemIssue = async (req, res) => {
  try {
    const itemIssue = new ItemIssue(req.body);
    await itemIssue.save();
    res.status(201).json(itemIssue);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all item issues or by ID
exports.getItemIssues = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const itemIssue = await ItemIssue.findById(id)
        .populate('item_id issue_to issue_by');
      if (!itemIssue) return res.status(404).json({ error: 'ItemIssue not found' });
      res.json(itemIssue);
    } else {
      const itemIssues = await ItemIssue.find()
        .populate('item_id issue_to issue_by');
      res.json(itemIssues);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an item issue
exports.updateItemIssue = async (req, res) => {
  try {
    const itemIssue = await ItemIssue.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!itemIssue) return res.status(404).json({ error: 'ItemIssue not found' });
    res.json(itemIssue);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an item issue
exports.deleteItemIssue = async (req, res) => {
  try {
    const itemIssue = await ItemIssue.findByIdAndDelete(req.params.id);
    if (!itemIssue) return res.status(404).json({ error: 'ItemIssue not found' });
    res.json({ message: 'ItemIssue deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
