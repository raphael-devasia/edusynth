const Language = require('../models/Language');

// Create or update a language
const createOrUpdateLanguage = async (req, res) => {
  try {
    const { 
      id,
      language,
      language_code,
      is_active,
      is_rtl,
      is_default,
      flag
    } = req.body;

    // Check if language already exists (excluding current record if updating)
    const existingLanguage = await Language.checkExists(language, id);
    if (existingLanguage) {
      return res.status(400).json({ message: 'Language already exists' });
    }

    if (id) {
      // Update existing language
      const updatedLanguage = await Language.findByIdAndUpdate(
        id,
        { 
          language,
          language_code,
          is_active,
          is_rtl,
          is_default,
          flag
        },
        { new: true, runValidators: true }
      );
      
      if (!updatedLanguage) {
        return res.status(404).json({ message: 'Language not found' });
      }
      
      // If setting as default, unset other defaults
      if (is_default) {
        await Language.updateMany(
          { _id: { $ne: id } },
          { is_default: false }
        );
      }
      
      res.status(200).json(updatedLanguage);
    } else {
      // Create new language
      const newLanguage = new Language({ 
        language,
        language_code,
        is_active,
        is_rtl,
        is_default,
        flag
      });
      
      // If setting as default, unset other defaults
      if (is_default) {
        await Language.updateMany({}, { is_default: false });
      }
      
      const savedLanguage = await newLanguage.save();
      res.status(201).json(savedLanguage);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all languages with pagination
const getAllLanguages = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      is_active, 
      sortBy = 'created_at', 
      sortOrder = 'desc' 
    } = req.query;

    let query = {};
    if (is_active !== undefined) query.is_active = is_active === 'true';

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const languages = await Language.find(query)
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Language.countDocuments(query);

    res.status(200).json({
      languages,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all languages (simple list)
const getLanguages = async (req, res) => {
  try {
    const { is_active } = req.query;
    
    let query = {};
    if (is_active !== undefined) query.is_active = is_active === 'true';

    const languages = await Language.find(query).sort({ language: 1 });

    res.status(200).json(languages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get enabled languages
const getEnabledLanguages = async (req, res) => {
  try {
    const languages = await Language.getEnabledLanguages();

    res.status(200).json(languages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get default language
const getDefaultLanguage = async (req, res) => {
  try {
    const language = await Language.getDefaultLanguage();

    if (!language) {
      return res.status(404).json({ message: 'No default language set' });
    }

    res.status(200).json(language);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get language by ID
const getLanguageById = async (req, res) => {
  try {
    const { id } = req.params;
    const language = await Language.findById(id);

    if (!language) {
      return res.status(404).json({ message: 'Language not found' });
    }

    res.status(200).json(language);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete language by ID
const deleteLanguage = async (req, res) => {
  try {
    const { id } = req.params;
    const language = await Language.findById(id);

    if (!language) {
      return res.status(404).json({ message: 'Language not found' });
    }

    // Prevent deletion of default language
    if (language.is_default) {
      return res.status(400).json({ message: 'Cannot delete default language' });
    }

    await Language.findByIdAndDelete(id);

    res.status(200).json({ message: 'Language deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Toggle language status
const toggleLanguageStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const language = await Language.findById(id);

    if (!language) {
      return res.status(404).json({ message: 'Language not found' });
    }

    // Prevent deactivating default language
    if (language.is_default && language.is_active) {
      return res.status(400).json({ message: 'Cannot deactivate default language' });
    }

    language.is_active = !language.is_active;
    await language.save();

    res.status(200).json(language);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Set default language
const setDefaultLanguage = async (req, res) => {
  try {
    const { id } = req.params;
    const language = await Language.findById(id);

    if (!language) {
      return res.status(404).json({ message: 'Language not found' });
    }

    // Unset all other defaults
    await Language.updateMany({}, { is_default: false });

    // Set this language as default and active
    language.is_default = true;
    language.is_active = true;
    await language.save();

    res.status(200).json(language);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Check if language exists
const checkLanguageExists = async (req, res) => {
  try {
    const { language } = req.body;
    const { id } = req.query;

    const existingLanguage = await Language.checkExists(language, id);

    res.status(200).json({ exists: !!existingLanguage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrUpdateLanguage,
  getAllLanguages,
  getLanguages,
  getEnabledLanguages,
  getDefaultLanguage,
  getLanguageById,
  deleteLanguage,
  toggleLanguageStatus,
  setDefaultLanguage,
  checkLanguageExists
};
