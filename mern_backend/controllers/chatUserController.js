const ChatUser = require('../models/ChatUser');

// Create a new chat user
exports.createChatUser = async (req, res) => {
  try {
    const chatUser = new ChatUser(req.body);
    await chatUser.save();
    res.status(201).json(chatUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all chat users
exports.getChatUsers = async (req, res) => {
  try {
    const chatUsers = await ChatUser.find().populate('staff_id student_id');
    res.json(chatUsers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a chat user by ID
exports.getChatUserById = async (req, res) => {
  try {
    const chatUser = await ChatUser.findById(req.params.id).populate('staff_id student_id');
    if (!chatUser) return res.status(404).json({ error: 'ChatUser not found' });
    res.json(chatUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a chat user
exports.updateChatUser = async (req, res) => {
  try {
    const chatUser = await ChatUser.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!chatUser) return res.status(404).json({ error: 'ChatUser not found' });
    res.json(chatUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a chat user
exports.deleteChatUser = async (req, res) => {
  try {
    const chatUser = await ChatUser.findByIdAndDelete(req.params.id);
    if (!chatUser) return res.status(404).json({ error: 'ChatUser not found' });
    res.json({ message: 'ChatUser deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
