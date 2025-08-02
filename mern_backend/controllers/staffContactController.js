const StaffContact = require('../models/StaffContact');

// Create a new staff contact
exports.createStaffContact = async (req, res) => {
  try {
    const contact = new StaffContact(req.body);
    await contact.save();
    res.status(201).json(contact);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all staff contacts
exports.getAllStaffContacts = async (req, res) => {
  try {
    const contacts = await StaffContact.find().populate('staff_id', 'name');
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get staff contact by ID
exports.getStaffContactById = async (req, res) => {
  try {
    const contact = await StaffContact.findById(req.params.id).populate('staff_id', 'name');
    if (!contact) return res.status(404).json({ error: 'StaffContact not found' });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update staff contact
exports.updateStaffContact = async (req, res) => {
  try {
    const contact = await StaffContact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!contact) return res.status(404).json({ error: 'StaffContact not found' });
    res.json(contact);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete staff contact
exports.deleteStaffContact = async (req, res) => {
  try {
    const contact = await StaffContact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ error: 'StaffContact not found' });
    res.json({ message: 'StaffContact deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
