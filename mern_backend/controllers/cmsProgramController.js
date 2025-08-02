const CmsProgram = require('../models/CmsProgram');

// Create a new CMS program
exports.createCmsProgram = async (req, res) => {
  try {
    const program = new CmsProgram(req.body);
    await program.save();
    res.status(201).json(program);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all CMS programs or by ID
exports.getCmsPrograms = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const program = await CmsProgram.findById(id);
      if (!program) return res.status(404).json({ error: 'CmsProgram not found' });
      res.json(program);
    } else {
      const programs = await CmsProgram.find();
      res.json(programs);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get CMS programs by type (category)
exports.getCmsProgramsByType = async (req, res) => {
  try {
    const { type } = req.params;
    const programs = await CmsProgram.find({ type });
    res.json(programs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a CMS program
exports.updateCmsProgram = async (req, res) => {
  try {
    const program = await CmsProgram.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!program) return res.status(404).json({ error: 'CmsProgram not found' });
    res.json(program);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a CMS program
exports.deleteCmsProgram = async (req, res) => {
  try {
    const program = await CmsProgram.findByIdAndDelete(req.params.id);
    if (!program) return res.status(404).json({ error: 'CmsProgram not found' });
    res.json({ message: 'CmsProgram deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
