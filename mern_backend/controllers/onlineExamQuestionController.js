const OnlineExamQuestion = require('../models/OnlineExamQuestion');
const Question = require('../models/Question');
const OnlineExam = require('../models/OnlineExam');

// Create a new online exam question
exports.createOnlineExamQuestion = async (req, res) => {
  try {
    const onlineExamQuestion = new OnlineExamQuestion(req.body);
    await onlineExamQuestion.save();
    res.status(201).json(onlineExamQuestion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all online exam questions or by filter
exports.getOnlineExamQuestions = async (req, res) => {
  try {
    const filter = req.query || {};
    const onlineExamQuestions = await OnlineExamQuestion.find(filter)
      .populate('onlineexam_id question_id subject_id');
    res.json(onlineExamQuestions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an online exam question
exports.updateOnlineExamQuestion = async (req, res) => {
  try {
    const onlineExamQuestion = await OnlineExamQuestion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!onlineExamQuestion) return res.status(404).json({ error: 'OnlineExamQuestion not found' });
    res.json(onlineExamQuestion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an online exam question
exports.deleteOnlineExamQuestion = async (req, res) => {
  try {
    const onlineExamQuestion = await OnlineExamQuestion.findByIdAndDelete(req.params.id);
    if (!onlineExamQuestion) return res.status(404).json({ error: 'OnlineExamQuestion not found' });
    res.json({ message: 'OnlineExamQuestion deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add question to online exam
const addQuestionToExam = async (req, res) => {
  try {
    const { 
      onlineexam_id,
      question_id,
      marks,
      neg_marks,
      question_order
    } = req.body;

    // Check if exam exists
    const exam = await OnlineExam.findById(onlineexam_id);
    if (!exam) {
      return res.status(404).json({ message: 'Online exam not found' });
    }

    // Check if question exists
    const question = await Question.findById(question_id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    // Check if question already exists in exam
    const existingQuestion = await OnlineExamQuestion.findOne({
      onlineexam_id,
      question_id
    });

    if (existingQuestion) {
      return res.status(400).json({ message: 'Question already added to this exam' });
    }

    const examQuestion = new OnlineExamQuestion({
      onlineexam_id,
      question_id,
      marks: marks || 1,
      neg_marks: neg_marks || 0.25,
      question_order: question_order || 0
    });

    const savedExamQuestion = await examQuestion.save();
    await savedExamQuestion.populate([
      {
        path: 'question_id',
        populate: {
          path: 'subject_id',
          select: 'name code'
        }
      },
      {
        path: 'onlineexam_id',
        select: 'exam description'
      }
    ]);

    res.status(201).json(savedExamQuestion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Bulk add questions to exam
const bulkAddQuestionsToExam = async (req, res) => {
  try {
    const { onlineexam_id, questions } = req.body;

    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ message: 'Questions array is required' });
    }

    // Check if exam exists
    const exam = await OnlineExam.findById(onlineexam_id);
    if (!exam) {
      return res.status(404).json({ message: 'Online exam not found' });
    }

    const examQuestions = questions.map(q => ({
      onlineexam_id,
      question_id: q.question_id,
      marks: q.marks || 1,
      neg_marks: q.neg_marks || 0.25,
      question_order: q.question_order || 0
    }));

    const savedQuestions = await OnlineExamQuestion.insertMany(examQuestions, {
      ordered: false // Continue inserting even if some fail
    });

    res.status(201).json({
      message: `${savedQuestions.length} questions added to exam`,
      questions: savedQuestions
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Some questions are already added to this exam' });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
};

// Get questions by exam ID with pagination and filtering
const getQuestionsByExamId = async (req, res) => {
  try {
    const { exam_id } = req.params;
    const { 
      page = 1, 
      limit = 10, 
      question_type, 
      subject_id,
      keyword,
      question_level 
    } = req.query;

    const skip = (page - 1) * limit;
    const options = {
      limit: parseInt(limit),
      skip: parseInt(skip),
      questionType: question_type,
      subjectId: subject_id
    };

    let questions = await OnlineExamQuestion.getByExamId(exam_id, options);

    // Apply additional filters if needed
    if (keyword || question_level) {
      questions = questions.filter(q => {
        if (!q.question_id) return false;
        
        let matches = true;
        if (keyword) {
          matches = matches && q.question_id.question.toLowerCase().includes(keyword.toLowerCase());
        }
        if (question_level) {
          matches = matches && q.question_id.level === question_level;
        }
        return matches;
      });
    }

    const total = await OnlineExamQuestion.getCountByExamId(exam_id);

    res.status(200).json({
      questions,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all questions for an exam (no pagination)
const getAllExamQuestions = async (req, res) => {
  try {
    const { exam_id } = req.params;
    const { question_type } = req.query;

    const options = { questionType: question_type };
    const questions = await OnlineExamQuestion.getByExamId(exam_id, options);

    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get exam question subjects
const getExamQuestionSubjects = async (req, res) => {
  try {
    const { exam_id } = req.params;
    const subjects = await OnlineExamQuestion.getExamQuestionSubjects(exam_id);

    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update exam question (marks, negative marks, order)
const updateExamQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { marks, neg_marks, question_order, is_active } = req.body;

    const updatedQuestion = await OnlineExamQuestion.findByIdAndUpdate(
      id,
      { marks, neg_marks, question_order, is_active },
      { new: true, runValidators: true }
    ).populate([
      {
        path: 'question_id',
        populate: {
          path: 'subject_id',
          select: 'name code'
        }
      },
      {
        path: 'onlineexam_id',
        select: 'exam description'
      }
    ]);

    if (!updatedQuestion) {
      return res.status(404).json({ message: 'Exam question not found' });
    }

    res.status(200).json(updatedQuestion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Remove question from exam
const removeQuestionFromExam = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedQuestion = await OnlineExamQuestion.findByIdAndDelete(id);

    if (!deletedQuestion) {
      return res.status(404).json({ message: 'Exam question not found' });
    }

    res.status(200).json({ message: 'Question removed from exam successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Bulk remove questions from exam
const bulkRemoveQuestionsFromExam = async (req, res) => {
  try {
    const { question_ids } = req.body;

    if (!Array.isArray(question_ids) || question_ids.length === 0) {
      return res.status(400).json({ message: 'Question IDs array is required' });
    }

    const result = await OnlineExamQuestion.deleteMany({
      _id: { $in: question_ids }
    });

    res.status(200).json({
      message: `${result.deletedCount} questions removed from exam`
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reorder exam questions
const reorderExamQuestions = async (req, res) => {
  try {
    const { exam_id } = req.params;
    const { question_orders } = req.body; // Array of { id, question_order }

    if (!Array.isArray(question_orders)) {
      return res.status(400).json({ message: 'Question orders array is required' });
    }

    const updatePromises = question_orders.map(({ id, question_order }) =>
      OnlineExamQuestion.findByIdAndUpdate(id, { question_order })
    );

    await Promise.all(updatePromises);

    res.status(200).json({ message: 'Questions reordered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get exam question statistics
const getExamQuestionStats = async (req, res) => {
  try {
    const { exam_id } = req.params;

    const stats = await OnlineExamQuestion.aggregate([
      { $match: { onlineexam_id: mongoose.Types.ObjectId(exam_id), is_active: true } },
      {
        $lookup: {
          from: 'questions',
          localField: 'question_id',
          foreignField: '_id',
          as: 'question'
        }
      },
      { $unwind: '$question' },
      {
        $group: {
          _id: '$question.question_type',
          count: { $sum: 1 },
          total_marks: { $sum: '$marks' },
          avg_marks: { $avg: '$marks' },
          total_neg_marks: { $sum: '$neg_marks' }
        }
      }
    ]);

    const totalStats = await OnlineExamQuestion.aggregate([
      { $match: { onlineexam_id: mongoose.Types.ObjectId(exam_id), is_active: true } },
      {
        $group: {
          _id: null,
          total_questions: { $sum: 1 },
          total_marks: { $sum: '$marks' },
          avg_marks_per_question: { $avg: '$marks' }
        }
      }
    ]);

    res.status(200).json({
      questionTypeStats: stats,
      totalStats: totalStats[0] || { total_questions: 0, total_marks: 0, avg_marks_per_question: 0 }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOnlineExamQuestion: exports.createOnlineExamQuestion,
  getOnlineExamQuestions: exports.getOnlineExamQuestions,
  updateOnlineExamQuestion: exports.updateOnlineExamQuestion,
  deleteOnlineExamQuestion: exports.deleteOnlineExamQuestion,
  addQuestionToExam,
  bulkAddQuestionsToExam,
  getQuestionsByExamId,
  getAllExamQuestions,
  getExamQuestionSubjects,
  updateExamQuestion,
  removeQuestionFromExam,
  bulkRemoveQuestionsFromExam,
  reorderExamQuestions,
  getExamQuestionStats
};
