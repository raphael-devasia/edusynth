const OfflinePayment = require('../models/OfflinePayment');

// Create a new offline payment
exports.createOfflinePayment = async (req, res) => {
  try {
    const offlinePayment = new OfflinePayment(req.body);
    await offlinePayment.save();
    res.status(201).json(offlinePayment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all offline payments or by ID
exports.getOfflinePayments = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const offlinePayment = await OfflinePayment.findById(id)
        .populate('student_session_id')
        .populate('student_fees_master_id')
        .populate('fee_groups_feetype_id')
        .populate('student_transport_fee_id');
      if (!offlinePayment) return res.status(404).json({ error: 'Offline payment not found' });
      res.json(offlinePayment);
    } else {
      const offlinePayments = await OfflinePayment.find()
        .populate('student_session_id')
        .populate('student_fees_master_id')
        .populate('fee_groups_feetype_id')
        .populate('student_transport_fee_id');
      res.json(offlinePayments);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an offline payment
exports.updateOfflinePayment = async (req, res) => {
  try {
    const offlinePayment = await OfflinePayment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!offlinePayment) return res.status(404).json({ error: 'Offline payment not found' });
    res.json(offlinePayment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an offline payment
exports.deleteOfflinePayment = async (req, res) => {
  try {
    const offlinePayment = await OfflinePayment.findByIdAndDelete(req.params.id);
    if (!offlinePayment) return res.status(404).json({ error: 'Offline payment not found' });
    res.json({ message: 'Offline payment deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
