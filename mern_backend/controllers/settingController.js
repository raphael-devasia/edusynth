const Setting = require('../models/Setting');

// Create or update a setting
exports.createOrUpdateSetting = async (req, res) => {
  try {
    let setting = await Setting.findOne();
    if (setting) {
      setting = await Setting.findByIdAndUpdate(setting._id, req.body, { new: true });
      res.json(setting);
    } else {
      setting = new Setting(req.body);
      await setting.save();
      res.status(201).json(setting);
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get the current setting
exports.getSetting = async (req, res) => {
  try {
    const setting = await Setting.findOne()
      .populate('currency')
      .populate('lang_id')
      .populate('session_id');
    if (!setting) return res.status(404).json({ error: 'Setting not found' });
    res.json(setting);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
