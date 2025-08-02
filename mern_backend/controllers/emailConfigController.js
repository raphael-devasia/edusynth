const EmailConfig = require('../models/EmailConfig');

// Create or update email config
exports.createOrUpdateEmailConfig = async (req, res) => {
  try {
    const { email_type, ...rest } = req.body;
    const config = await EmailConfig.findOneAndUpdate(
      { email_type },
      { ...rest, updated_at: Date.now() },
      { new: true, upsert: true }
    );
    res.status(200).json(config);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all email configs
exports.getEmailConfigs = async (req, res) => {
  try {
    const configs = await EmailConfig.find();
    res.json(configs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get email config by type
exports.getEmailConfigByType = async (req, res) => {
  try {
    const config = await EmailConfig.findOne({ email_type: req.params.type });
    if (!config) return res.status(404).json({ error: 'EmailConfig not found' });
    res.json(config);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
