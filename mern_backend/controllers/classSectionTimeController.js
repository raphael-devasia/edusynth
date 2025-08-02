const ClassSectionTime = require('../models/ClassSectionTime');

// Batch create or update class section times
exports.batchUpsertClassSectionTimes = async (req, res) => {
  try {
    const { insertData, updateData } = req.body;
    let insertResult = [], updateResult = [];
    if (insertData && insertData.length > 0) {
      insertResult = await ClassSectionTime.insertMany(insertData);
    }
    if (updateData && updateData.length > 0) {
      // updateData must include _id for each document to update
      updateResult = await Promise.all(updateData.map(async (data) => {
        const { _id, ...rest } = data;
        return await ClassSectionTime.findByIdAndUpdate(_id, rest, { new: true });
      }));
    }
    res.status(200).json({ inserted: insertResult, updated: updateResult });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all class section times
exports.getClassSectionTimes = async (req, res) => {
  try {
    const times = await ClassSectionTime.find().populate('class_section_id');
    res.json(times);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get class section times by class_section_id
exports.getByClassSectionId = async (req, res) => {
  try {
    const times = await ClassSectionTime.find({ class_section_id: req.params.classSectionId });
    res.json(times);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a class section time
exports.deleteClassSectionTime = async (req, res) => {
  try {
    const time = await ClassSectionTime.findByIdAndDelete(req.params.id);
    if (!time) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
