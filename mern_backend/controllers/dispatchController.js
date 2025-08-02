const Dispatch = require('../models/Dispatch');

// Create a new dispatch/receive record
exports.createDispatch = async (req, res) => {
  try {
    let data = req.body;
    if (req.file) {
      data.image = req.file.filename;
    }
    const dispatch = new Dispatch(data);
    await dispatch.save();
    res.status(201).json(dispatch);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all receive records or by ID
exports.getDispatches = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const dispatch = await Dispatch.findOne({ _id: id, type: 'receive' });
      if (!dispatch) return res.status(404).json({ error: 'Receive record not found' });
      res.json(dispatch);
    } else {
      const dispatches = await Dispatch.find({ type: 'receive' });
      res.json(dispatches);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a receive record
exports.updateDispatch = async (req, res) => {
  try {
    let data = req.body;
    if (req.file) {
      data.image = req.file.filename;
    }
    const dispatch = await Dispatch.findOneAndUpdate({ _id: req.params.id, type: 'receive' }, data, { new: true });
    if (!dispatch) return res.status(404).json({ error: 'Receive record not found' });
    res.json(dispatch);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a receive record
exports.deleteDispatch = async (req, res) => {
  try {
    const dispatch = await Dispatch.findOneAndDelete({ _id: req.params.id, type: 'receive' });
    if (!dispatch) return res.status(404).json({ error: 'Receive record not found' });
    res.json({ message: 'Receive record deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Download attached file for dispatch/receive
const path = require('path');
const fs = require('fs');
exports.downloadDispatchFile = async (req, res) => {
  try {
    const dispatch = await Dispatch.findById(req.params.id);
    if (!dispatch || !dispatch.image) {
      return res.status(404).json({ error: 'File not found' });
    }
    const filePath = path.join(__dirname, '../uploads/dispatch_receive', dispatch.image);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File does not exist on server' });
    }
    res.download(filePath, dispatch.image);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
