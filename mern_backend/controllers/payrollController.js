const Payroll = require('../models/Payroll');

// Create a new payroll record
exports.createPayroll = async (req, res) => {
  try {
    const payroll = new Payroll(req.body);
    await payroll.save();
    res.status(201).json(payroll);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all payroll records or by ID
exports.getPayrolls = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const payroll = await Payroll.findById(id)
        .populate('staff_id')
        .populate('payslip_id')
        .populate('allowances')
        .populate('deductions');
      if (!payroll) return res.status(404).json({ error: 'Payroll record not found' });
      res.json(payroll);
    } else {
      const payrolls = await Payroll.find()
        .populate('staff_id')
        .populate('payslip_id')
        .populate('allowances')
        .populate('deductions');
      res.json(payrolls);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a payroll record
exports.updatePayroll = async (req, res) => {
  try {
    const payroll = await Payroll.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!payroll) return res.status(404).json({ error: 'Payroll record not found' });
    res.json(payroll);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a payroll record
exports.deletePayroll = async (req, res) => {
  try {
    const payroll = await Payroll.findByIdAndDelete(req.params.id);
    if (!payroll) return res.status(404).json({ error: 'Payroll record not found' });
    res.json({ message: 'Payroll record deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
