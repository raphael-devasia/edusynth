const Captcha = require('../models/Captcha');

// Create or update captcha setting
exports.createOrUpdateCaptcha = async (req, res) => {
  try {
    const { name, status } = req.body;
    const captcha = await Captcha.findOneAndUpdate(
      { name },
      { status, updated_at: Date.now() },
      { new: true, upsert: true }
    );
    res.status(200).json(captcha);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all captcha settings
exports.getCaptchas = async (req, res) => {
  try {
    const captchas = await Captcha.find();
    res.json(captchas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get captcha by name
exports.getCaptchaByName = async (req, res) => {
  try {
    const captcha = await Captcha.findOne({ name: req.params.name });
    if (!captcha) return res.status(404).json({ error: 'Captcha not found' });
    res.json(captcha);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
