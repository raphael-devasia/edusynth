const Chat = require('../models/Chat');

// Create a new chat message
exports.createChat = async (req, res) => {
  try {
    const chat = new Chat(req.body);
    await chat.save();
    res.status(201).json(chat);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all chat messages between two users
exports.getChat = async (req, res) => {
  try {
    const { sender_id, receiver_id } = req.query;
    const chatMessages = await Chat.find({
      $or: [
        { sender_id, receiver_id },
        { sender_id: receiver_id, receiver_id: sender_id }
      ]
    }).sort({ sent_at: 1 });
    res.json(chatMessages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mark messages as seen
exports.markSeen = async (req, res) => {
  try {
    const { sender_id, receiver_id, sender_type, receiver_type } = req.body;
    const result = await Chat.updateMany(
      {
        sender_id,
        receiver_id,
        sender_type,
        receiver_type,
        seen: false
      },
      { $set: { seen: true, updated_at: Date.now() } }
    );
    res.json({ updated: result.nModified });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
