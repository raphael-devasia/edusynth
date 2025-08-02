const NotificationSetting = require('../models/NotificationSetting');

// Create a new notification setting
exports.createNotificationSetting = async (req, res) => {
  try {
    const notificationSetting = new NotificationSetting(req.body);
    await notificationSetting.save();
    res.status(201).json(notificationSetting);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all notification settings
exports.getAllNotificationSettings = async (req, res) => {
  try {
    const notificationSettings = await NotificationSetting.find();
    res.json(notificationSettings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a notification setting by ID
exports.getNotificationSettingById = async (req, res) => {
  try {
    const notificationSetting = await NotificationSetting.findById(req.params.id);
    if (!notificationSetting) return res.status(404).json({ error: 'Notification setting not found' });
    res.json(notificationSetting);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a notification setting
exports.updateNotificationSetting = async (req, res) => {
  try {
    const notificationSetting = await NotificationSetting.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!notificationSetting) return res.status(404).json({ error: 'Notification setting not found' });
    res.json(notificationSetting);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a notification setting
exports.deleteNotificationSetting = async (req, res) => {
  try {
    const notificationSetting = await NotificationSetting.findByIdAndDelete(req.params.id);
    if (!notificationSetting) return res.status(404).json({ error: 'Notification setting not found' });
    res.json({ message: 'Notification setting deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
