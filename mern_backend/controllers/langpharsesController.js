const Langpharses = require('../models/Langpharses');

// Create or update a language phrase
const createOrUpdateLangpharses = async (req, res) => {
  try {
    const { id, key_id, lang_id, pharses } = req.body;

    if (id) {
      // Update existing phrase
      const updatedPhrase = await Langpharses.findByIdAndUpdate(
        id,
        { key_id, lang_id, pharses },
        { new: true, runValidators: true }
      );
      
      if (!updatedPhrase) {
        return res.status(404).json({ message: 'Language phrase not found' });
      }
      
      res.status(200).json(updatedPhrase);
    } else {
      // Create new phrase
      const newPhrase = new Langpharses({ key_id, lang_id, pharses });
      const savedPhrase = await newPhrase.save();
      res.status(201).json(savedPhrase);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get language phrases by language ID
const getLangpharsesByLang = async (req, res) => {
  try {
    const { lang_id } = req.params;
    const { after } = req.query;

    let query = { lang_id };
    if (after) {
      query._id = { $gt: after };
    }

    const phrases = await Langpharses.find(query)
      .populate('key_id')
      .populate('lang_id')
      .sort({ 'key_id.key': 1 });

    res.status(200).json(phrases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all language phrases
const getAllLangpharses = async (req, res) => {
  try {
    const phrases = await Langpharses.find()
      .populate('key_id')
      .populate('lang_id')
      .sort({ 'key_id.key': 1 });

    res.status(200).json(phrases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get language phrase by ID
const getLangpharsesById = async (req, res) => {
  try {
    const { id } = req.params;
    const phrase = await Langpharses.findById(id)
      .populate('key_id')
      .populate('lang_id');

    if (!phrase) {
      return res.status(404).json({ message: 'Language phrase not found' });
    }

    res.status(200).json(phrase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete language phrase by ID
const deleteLangpharses = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPhrase = await Langpharses.findByIdAndDelete(id);

    if (!deletedPhrase) {
      return res.status(404).json({ message: 'Language phrase not found' });
    }

    res.status(200).json({ message: 'Language phrase deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete all phrases for a specific language
const deletePhrasesByLang = async (req, res) => {
  try {
    const { lang_id } = req.params;
    const result = await Langpharses.deleteMany({ lang_id });

    res.status(200).json({ 
      message: `${result.deletedCount} language phrases deleted successfully` 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrUpdateLangpharses,
  getLangpharsesByLang,
  getAllLangpharses,
  getLangpharsesById,
  deleteLangpharses,
  deletePhrasesByLang
};
