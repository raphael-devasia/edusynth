const Userlog = require('../models/Userlog');

// Create or update a user log entry
const createOrUpdateUserlog = async (req, res) => {
  try {
    const { id, user, role, class_section_id, ipaddress, login_datetime, user_agent, session_id } = req.body;

    if (id) {
      // Update existing log
      const updatedLog = await Userlog.findByIdAndUpdate(
        id,
        { user, role, class_section_id, ipaddress, login_datetime, user_agent, session_id },
        { new: true, runValidators: true }
      );
      
      if (!updatedLog) {
        return res.status(404).json({ message: 'User log not found' });
      }
      
      res.status(200).json(updatedLog);
    } else {
      // Create new log
      const newLog = new Userlog({ 
        user, 
        role, 
        class_section_id, 
        ipaddress, 
        login_datetime: login_datetime || new Date(), 
        user_agent, 
        session_id 
      });
      const savedLog = await newLog.save();
      res.status(201).json(savedLog);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all user logs
const getAllUserlogs = async (req, res) => {
  try {
    const logs = await Userlog.find()
      .populate('class_section_id')
      .sort({ login_datetime: -1 });

    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user log by ID
const getUserlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const log = await Userlog.findById(id)
      .populate('class_section_id');

    if (!log) {
      return res.status(404).json({ message: 'User log not found' });
    }

    res.status(200).json(log);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user logs by role
const getUserlogsByRole = async (req, res) => {
  try {
    const { role } = req.params;
    const logs = await Userlog.find({ role })
      .populate('class_section_id')
      .sort({ login_datetime: -1 });

    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get staff user logs (excluding Parent and Student roles)
const getStaffUserlogs = async (req, res) => {
  try {
    const logs = await Userlog.find({ 
      role: { $nin: ['Parent', 'Student'] } 
    })
      .populate('class_section_id')
      .sort({ login_datetime: -1 });

    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete user log by ID
const deleteUserlog = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedLog = await Userlog.findByIdAndDelete(id);

    if (!deletedLog) {
      return res.status(404).json({ message: 'User log not found' });
    }

    res.status(200).json({ message: 'User log deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete all user logs (truncate equivalent)
const deleteAllUserlogs = async (req, res) => {
  try {
    const result = await Userlog.deleteMany({});

    res.status(200).json({ 
      message: `${result.deletedCount} user logs deleted successfully` 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get paginated user logs with search and filtering
const getPaginatedUserlogs = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      search = '', 
      role = '', 
      sortBy = 'login_datetime', 
      sortOrder = 'desc' 
    } = req.query;

    const query = {};
    
    // Add role filter if provided
    if (role) {
      query.role = role;
    }

    // Add search functionality
    if (search) {
      query.$or = [
        { user: { $regex: search, $options: 'i' } },
        { ipaddress: { $regex: search, $options: 'i' } },
        { user_agent: { $regex: search, $options: 'i' } }
      ];
    }

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const logs = await Userlog.find(query)
      .populate('class_section_id')
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Userlog.countDocuments(query);

    res.status(200).json({
      logs,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrUpdateUserlog,
  getAllUserlogs,
  getUserlogById,
  getUserlogsByRole,
  getStaffUserlogs,
  deleteUserlog,
  deleteAllUserlogs,
  getPaginatedUserlogs
};
