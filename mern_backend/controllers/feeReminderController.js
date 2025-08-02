const FeeReminder = require('../models/FeeReminder');

// Create or update a fee reminder by type
exports.createOrUpdateFeeReminder = async (req, res) => {
  try {
    const { type } = req.body;
    let feeReminder = await FeeReminder.findOne({ type });
    if (feeReminder) {
      Object.assign(feeReminder, req.body);
      await feeReminder.save();
      res.status(200).json(feeReminder);
    } else {
      feeReminder = new FeeReminder(req.body);
      await feeReminder.save();
      res.status(201).json(feeReminder);
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all fee reminders or by ID
exports.getFeeReminders = async (req, res) => {
  try {
    const { id, active } = req.query;
    let filter = {};
    if (id) filter._id = id;
    if (active !== undefined) filter.is_active = active === 'true';
    const feeReminders = await FeeReminder.find(filter);
    if (id && feeReminders.length === 0) return res.status(404).json({ error: 'FeeReminder not found' });
    res.json(id ? feeReminders[0] : feeReminders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a fee reminder
exports.deleteFeeReminder = async (req, res) => {
  try {
    const feeReminder = await FeeReminder.findByIdAndDelete(req.params.id);
    if (!feeReminder) return res.status(404).json({ error: 'FeeReminder not found' });
    res.json({ message: 'FeeReminder deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
