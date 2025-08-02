const Currency = require('../models/Currency');

// Create a new currency
exports.createCurrency = async (req, res) => {
  try {
    const currency = new Currency(req.body);
    await currency.save();
    res.status(201).json(currency);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all currencies or by ID
exports.getCurrencies = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const currency = await Currency.findById(id);
      if (!currency) return res.status(404).json({ error: 'Currency not found' });
      res.json(currency);
    } else {
      const currencies = await Currency.find();
      res.json(currencies);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a currency
exports.updateCurrency = async (req, res) => {
  try {
    const currency = await Currency.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!currency) return res.status(404).json({ error: 'Currency not found' });
    res.json(currency);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a currency
exports.deleteCurrency = async (req, res) => {
  try {
    const currency = await Currency.findByIdAndDelete(req.params.id);
    if (!currency) return res.status(404).json({ error: 'Currency not found' });
    res.json({ message: 'Currency deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
