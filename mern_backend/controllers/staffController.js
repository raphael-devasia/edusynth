const Staff = require('../models/Staff');
const bcrypt = require('bcryptjs');

// Create new staff member
exports.createStaff = async (req, res) => {
  try {
    let { password, ...rest } = req.body;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
    }
    // Accept custom_fields if present in request
    const staff = new Staff({ ...rest, password });
    await staff.save();
    res.status(201).json(staff);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all staff, with optional filtering by role_id
exports.getAllStaff = async (req, res) => {
  try {
    const filter = {};
    if (req.query.role_id) {
      filter.role_id = req.query.role_id;
    }
    const staff = await Staff.find(filter).populate('lang_id department designation user_id role_id');
    res.json(staff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get staff by ID
exports.getStaffById = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id).populate('lang_id department designation user_id role_id');
    if (!staff) return res.status(404).json({ error: 'Staff not found' });
    res.json(staff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update staff
exports.updateStaff = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (updateData.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }
    // Accept custom_fields if present in update
    const staff = await Staff.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!staff) return res.status(404).json({ error: 'Staff not found' });
    res.json(staff);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get staff with birthdays matching today's date (month and day)
exports.getBirthdayStaff = async (req, res) => {
  try {
    // Get today's month and day
    const today = new Date();
    const month = today.getMonth() + 1; // getMonth() is 0-indexed
    const day = today.getDate();

    // Pipeline to match month and day of dob
    const staffWithBirthday = await Staff.aggregate([
      {
        $addFields: {
          dobMonth: { $month: "$dob" },
          dobDay: { $dayOfMonth: "$dob" }
        }
      },
      {
        $match: {
          dobMonth: month,
          dobDay: day
        }
      }
    ]);
    res.json(staffWithBirthday);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete staff
exports.deleteStaff = async (req, res) => {
  try {
    const staff = await Staff.findByIdAndDelete(req.params.id);
    if (!staff) return res.status(404).json({ error: 'Staff not found' });
    res.json({ message: 'Staff deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
