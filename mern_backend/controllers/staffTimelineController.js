const StaffTimeline = require('../models/StaffTimeline');

// Create or update staff timeline
exports.createOrUpdateStaffTimeline = async (req, res) => {
  try {
    const data = req.body;
    let timeline;
    if (data.id) {
      timeline = await StaffTimeline.findByIdAndUpdate(data.id, data, { new: true });
    } else {
      timeline = new StaffTimeline(data);
      await timeline.save();
    }
    res.status(201).json(timeline);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get staff timelines by staff_id (and optional status)
exports.getStaffTimelines = async (req, res) => {
  try {
    const { staff_id, status } = req.query;
    let filter = {};
    if (staff_id) filter.staff_id = staff_id;
    if (status) filter.status = status;
    const timelines = await StaffTimeline.find(filter).sort({ timeline_date: 1 });
    res.json(timelines);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a staff timeline
exports.deleteStaffTimeline = async (req, res) => {
  try {
    const timeline = await StaffTimeline.findByIdAndDelete(req.params.id);
    if (!timeline) return res.status(404).json({ error: 'StaffTimeline not found' });
    res.json({ message: 'StaffTimeline deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
