const Message = require('../models/Message');

// Create a new message
exports.createMessage = async (req, res) => {
  try {
    const message = new Message(req.body);
    await message.save();
    res.status(201).json(message);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all messages or by ID
exports.getMessages = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const message = await Message.findById(id)
        .populate('group_list user_list email_template_id');
      if (!message) return res.status(404).json({ error: 'Message not found' });
      res.json(message);
    } else {
      const messages = await Message.find()
        .populate('group_list user_list email_template_id');
      res.json(messages);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a message
exports.updateMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!message) return res.status(404).json({ error: 'Message not found' });
    res.json(message);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a message
exports.deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) return res.status(404).json({ error: 'Message not found' });
    res.json({ message: 'Message deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
