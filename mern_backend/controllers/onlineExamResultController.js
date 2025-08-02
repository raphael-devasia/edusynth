const OnlineExamResult = require('../models/OnlineExamResult');
const mongoose = require('mongoose');

// Create a new online exam result
exports.createOnlineExamResult = async (req, res) => {
  try {
    const onlineExamResult = new OnlineExamResult(req.body);
    await onlineExamResult.save();
    res.status(201).json(onlineExamResult);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all online exam results or by filter
exports.getOnlineExamResults = async (req, res) => {
  try {
    const filter = req.query || {};
    const onlineExamResults = await OnlineExamResult.find(filter)
      .populate('onlineexam_id onlineexam_question_id onlineexam_student_id student_session_id student_id');
    res.json(onlineExamResults);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an online exam result
exports.updateOnlineExamResult = async (req, res) => {
  try {
    const onlineExamResult = await OnlineExamResult.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!onlineExamResult) return res.status(404).json({ error: 'OnlineExamResult not found' });
    res.json(onlineExamResult);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an online exam result
exports.deleteOnlineExamResult = async (req, res) => {
  try {
    const onlineExamResult = await OnlineExamResult.findByIdAndDelete(req.params.id);
    if (!onlineExamResult) return res.status(404).json({ error: 'OnlineExamResult not found' });
    res.json({ message: 'OnlineExamResult deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add or update a result
exports.addOrUpdateResult = async (req, res) => {
  try {
    const {
      onlineexam_id,
      student_id,
      onlineexam_student_id,
      onlineexam_question_id,
      question_id,
      answer,
      select_option,
      marks,
      neg_marks,
      is_evaluated,
      remarks,
      evaluated_by,
      evaluated_at
    } = req.body;

    // Find existing result
    let result = await OnlineExamResult.findOne({
      onlineexam_id,
      student_id,
      onlineexam_student_id,
      onlineexam_question_id
    });

    if (result) {
      // Update
      result.answer = answer;
      result.select_option = select_option;
      result.marks = marks;
      result.neg_marks = neg_marks;
      result.is_evaluated = is_evaluated;
      result.remarks = remarks;
      result.evaluated_by = evaluated_by;
      result.evaluated_at = evaluated_at;
      await result.save();
      res.status(200).json(result);
    } else {
      // Create
      result = new OnlineExamResult({
        onlineexam_id,
        student_id,
        onlineexam_student_id,
        onlineexam_question_id,
        question_id,
        answer,
        select_option,
        marks,
        neg_marks,
        is_evaluated,
        remarks,
        evaluated_by,
        evaluated_at
      });
      await result.save();
      res.status(201).json(result);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get results by student and exam
exports.getResultByStudent = async (req, res) => {
  try {
    const { onlineexam_student_id, exam_id } = req.params;
    const results = await OnlineExamResult.getResultByStudent(onlineexam_student_id, exam_id);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get descriptive answers for an exam (with pagination/filter)
exports.getDescriptionRecord = async (req, res) => {
  try {
    const { exam_id } = req.params;
    const { page = 1, limit = 10, class_id, section_id, question_id } = req.query;
    const skip = (page - 1) * limit;
    let filter = { onlineexam_id: exam_id };

    if (question_id) filter.question_id = question_id;
    // For class_id/section_id, would require population from StudentSession, omitted for brevity

    const results = await OnlineExamResult.find(filter)
      .populate('student_id')
      .populate('onlineexam_question_id')
      .populate('question_id')
      .skip(skip)
      .limit(parseInt(limit));
    const total = await OnlineExamResult.countDocuments(filter);
    res.status(200).json({
      results,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get students by exam/class/section
exports.getStudentByExam = async (req, res) => {
  try {
    const { exam_id, class_id, section_id } = req.params;
    const results = await OnlineExamResult.getStudentByExam(exam_id, class_id, section_id);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Check if result is prepared for a student
exports.checkResultPrepare = async (req, res) => {
  try {
    const { onlineexam_student_id } = req.params;
    const results = await OnlineExamResult.checkResultPrepare(onlineexam_student_id);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get rank for a student in an exam
exports.getOnlineExamRank = async (req, res) => {
  try {
    const { onlineexam_student_id, exam_id } = req.params;
    // Aggregate correct/incorrect answers for ranking
    const pipeline = [
      { $match: { onlineexam_id: mongoose.Types.ObjectId(exam_id), onlineexam_student_id: mongoose.Types.ObjectId(onlineexam_student_id) } },
      {
        $lookup: {
          from: 'onlineexamquestions',
          localField: 'onlineexam_question_id',
          foreignField: '_id',
          as: 'exam_question'
        }
      },
      { $unwind: '$exam_question' },
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
          _id: '$onlineexam_student_id',
          correct_answer: {
            $sum: {
              $cond: [
                { $eq: ['$question.correct', '$select_option'] },
                1,
                0
              ]
            }
          },
          incorrect_answer: {
            $sum: {
              $cond: [
                { $ne: ['$question.correct', '$select_option'] },
                1,
                0
              ]
            }
          },
          total_questions: { $sum: 1 }
        }
      }
    ];
    const stats = await OnlineExamResult.aggregate(pipeline);
    res.status(200).json(stats[0] || { correct_answer: 0, incorrect_answer: 0, total_questions: 0 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a result
exports.deleteResult = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await OnlineExamResult.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Result not found' });
    }
    res.status(200).json({ message: 'Result deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
