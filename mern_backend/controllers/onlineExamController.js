const OnlineExam = require('../models/OnlineExam');
const OnlineExamQuestion = require('../models/OnlineExamQuestion');
const OnlineExamResult = require('../models/OnlineExamResult');

// Create or update an online exam
const createOrUpdateOnlineExam = async (req, res) => {
  try {
    const { 
      id,
      exam,
      description,
      exam_from,
      exam_to,
      duration,
      attempt,
      passing_percentage,
      instruction,
      is_active,
      is_marks_display,
      is_neg_marking,
      neg_marks,
      is_random_question,
      is_random_option,
      auto_result,
      exam_type,
      session_id,
      created_by
    } = req.body;

    if (id) {
      // Update existing exam
      const updatedExam = await OnlineExam.findByIdAndUpdate(
        id,
        { 
          exam,
          description,
          exam_from,
          exam_to,
          duration,
          attempt,
          passing_percentage,
          instruction,
          is_active,
          is_marks_display,
          is_neg_marking,
          neg_marks,
          is_random_question,
          is_random_option,
          auto_result,
          exam_type,
          session_id,
          created_by
        },
        { new: true, runValidators: true }
      );
      
      if (!updatedExam) {
        return res.status(404).json({ message: 'Online exam not found' });
      }
      
      res.status(200).json(updatedExam);
    } else {
      // Create new exam
      const newExam = new OnlineExam({ 
        exam,
        description,
        exam_from,
        exam_to,
        duration,
        attempt,
        passing_percentage,
        instruction,
        is_active,
        is_marks_display,
        is_neg_marking,
        neg_marks,
        is_random_question,
        is_random_option,
        auto_result,
        exam_type,
        session_id,
        created_by
      });
      
      const savedExam = await newExam.save();
      res.status(201).json(savedExam);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all online exams
const getAllOnlineExams = async (req, res) => {
  try {
    const { 
      session_id, 
      is_active, 
      exam_type, 
      status,
      page = 1, 
      limit = 10 
    } = req.query;

    let query = {};
    if (session_id) query.session_id = session_id;
    if (is_active !== undefined) query.is_active = is_active === 'true';
    if (exam_type) query.exam_type = exam_type;

    // Filter by status (upcoming, ongoing, completed)
    const now = new Date();
    if (status === 'upcoming') {
      query.exam_from = { $gt: now };
    } else if (status === 'ongoing') {
      query.exam_from = { $lte: now };
      query.exam_to = { $gte: now };
    } else if (status === 'completed') {
      query.exam_to = { $lt: now };
    }

    const exams = await OnlineExam.find(query)
      .populate('session_id')
      .populate('created_by')
      .sort({ exam_from: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await OnlineExam.countDocuments(query);

    res.status(200).json({
      exams,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get online exam by ID
const getOnlineExamById = async (req, res) => {
  try {
    const { id } = req.params;
    const exam = await OnlineExam.findById(id)
      .populate('session_id')
      .populate('created_by');

    if (!exam) {
      return res.status(404).json({ message: 'Online exam not found' });
    }

    res.status(200).json(exam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get active exams for a session
const getActiveExams = async (req, res) => {
  try {
    const { session_id } = req.params;
    const exams = await OnlineExam.getActiveExams(session_id)
      .populate('session_id')
      .populate('created_by');

    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get upcoming exams for a session
const getUpcomingExams = async (req, res) => {
  try {
    const { session_id } = req.params;
    const exams = await OnlineExam.getUpcomingExams(session_id)
      .populate('session_id')
      .populate('created_by');

    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get ongoing exams for a session
const getOngoingExams = async (req, res) => {
  try {
    const { session_id } = req.params;
    const exams = await OnlineExam.getOngoingExams(session_id)
      .populate('session_id')
      .populate('created_by');

    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get completed exams for a session
const getCompletedExams = async (req, res) => {
  try {
    const { session_id } = req.params;
    const exams = await OnlineExam.getCompletedExams(session_id)
      .populate('session_id')
      .populate('created_by');

    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete online exam by ID
const deleteOnlineExam = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedExam = await OnlineExam.findByIdAndDelete(id);

    if (!deletedExam) {
      return res.status(404).json({ message: 'Online exam not found' });
    }

    // Also delete related questions and results
    await OnlineExamQuestion.deleteMany({ onlineexam_id: id });
    await OnlineExamResult.deleteMany({ onlineexam_id: id });

    res.status(200).json({ message: 'Online exam deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Bulk delete online exams
const bulkDeleteOnlineExams = async (req, res) => {
  try {
    const { exam_ids } = req.body;

    if (!Array.isArray(exam_ids) || exam_ids.length === 0) {
      return res.status(400).json({ message: 'Invalid exam IDs provided' });
    }

    // Delete exams
    const result = await OnlineExam.deleteMany({ _id: { $in: exam_ids } });

    // Delete related questions and results
    await OnlineExamQuestion.deleteMany({ onlineexam_id: { $in: exam_ids } });
    await OnlineExamResult.deleteMany({ onlineexam_id: { $in: exam_ids } });

    res.status(200).json({ 
      message: `${result.deletedCount} online exams deleted successfully` 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Toggle exam status (active/inactive)
const toggleExamStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const exam = await OnlineExam.findById(id);

    if (!exam) {
      return res.status(404).json({ message: 'Online exam not found' });
    }

    exam.is_active = !exam.is_active;
    await exam.save();

    res.status(200).json(exam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get exam statistics
const getExamStatistics = async (req, res) => {
  try {
    const { session_id } = req.params;

    const stats = await OnlineExam.aggregate([
      { $match: { session_id: mongoose.Types.ObjectId(session_id) } },
      {
        $group: {
          _id: '$exam_type',
          count: { $sum: 1 },
          active_count: {
            $sum: { $cond: ['$is_active', 1, 0] }
          },
          avg_duration: { $avg: '$duration' },
          total_marks: { $sum: '$total_marks' }
        }
      }
    ]);

    const statusStats = await OnlineExam.aggregate([
      { $match: { session_id: mongoose.Types.ObjectId(session_id) } },
      {
        $addFields: {
          status: {
            $cond: {
              if: { $gt: ['$exam_from', new Date()] },
              then: 'upcoming',
              else: {
                $cond: {
                  if: { $and: [
                    { $lte: ['$exam_from', new Date()] },
                    { $gte: ['$exam_to', new Date()] }
                  ]},
                  then: 'ongoing',
                  else: 'completed'
                }
              }
            }
          }
        }
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      examTypeStats: stats,
      statusStats: statusStats
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrUpdateOnlineExam,
  getAllOnlineExams,
  getOnlineExamById,
  getActiveExams,
  getUpcomingExams,
  getOngoingExams,
  getCompletedExams,
  deleteOnlineExam,
  bulkDeleteOnlineExams,
  toggleExamStatus,
  getExamStatistics
};
