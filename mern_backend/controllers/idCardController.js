const IdCard = require('../models/IdCard');

// Create or update an ID card template
const createOrUpdateIdCard = async (req, res) => {
  try {
    const { 
      id,
      title,
      school_name,
      school_address,
      background,
      logo,
      sign_image,
      enable_vertical_card,
      enable_student_name,
      enable_student_photo,
      enable_father_name,
      enable_mother_name,
      enable_address,
      enable_phone,
      enable_dob,
      enable_blood_group,
      enable_student_barcode,
      enable_admission_no,
      enable_roll_no,
      enable_class,
      enable_section,
      enable_session,
      template,
      is_active
    } = req.body;

    if (id) {
      // Update existing ID card template
      const updatedIdCard = await IdCard.findByIdAndUpdate(
        id,
        { 
          title,
          school_name,
          school_address,
          background,
          logo,
          sign_image,
          enable_vertical_card,
          enable_student_name,
          enable_student_photo,
          enable_father_name,
          enable_mother_name,
          enable_address,
          enable_phone,
          enable_dob,
          enable_blood_group,
          enable_student_barcode,
          enable_admission_no,
          enable_roll_no,
          enable_class,
          enable_section,
          enable_session,
          template,
          is_active
        },
        { new: true, runValidators: true }
      );
      
      if (!updatedIdCard) {
        return res.status(404).json({ message: 'ID card template not found' });
      }
      
      res.status(200).json(updatedIdCard);
    } else {
      // Create new ID card template
      const newIdCard = new IdCard({ 
        title,
        school_name,
        school_address,
        background,
        logo,
        sign_image,
        enable_vertical_card,
        enable_student_name,
        enable_student_photo,
        enable_father_name,
        enable_mother_name,
        enable_address,
        enable_phone,
        enable_dob,
        enable_blood_group,
        enable_student_barcode,
        enable_admission_no,
        enable_roll_no,
        enable_class,
        enable_section,
        enable_session,
        template,
        is_active
      });
      const savedIdCard = await newIdCard.save();
      res.status(201).json(savedIdCard);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all ID card templates
const getAllIdCards = async (req, res) => {
  try {
    const { is_active, template } = req.query;
    
    let query = {};
    if (is_active !== undefined) query.is_active = is_active === 'true';
    if (template) query.template = template;

    const idCards = await IdCard.find(query).sort({ createdAt: -1 });

    res.status(200).json(idCards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get ID card template by ID
const getIdCardById = async (req, res) => {
  try {
    const { id } = req.params;
    const idCard = await IdCard.findById(id);

    if (!idCard) {
      return res.status(404).json({ message: 'ID card template not found' });
    }

    res.status(200).json(idCard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get active ID card templates
const getActiveIdCards = async (req, res) => {
  try {
    const idCards = await IdCard.find({ is_active: true }).sort({ createdAt: -1 });

    res.status(200).json(idCards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete ID card template by ID
const deleteIdCard = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedIdCard = await IdCard.findByIdAndDelete(id);

    if (!deletedIdCard) {
      return res.status(404).json({ message: 'ID card template not found' });
    }

    res.status(200).json({ message: 'ID card template deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Toggle ID card template status
const toggleIdCardStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const idCard = await IdCard.findById(id);

    if (!idCard) {
      return res.status(404).json({ message: 'ID card template not found' });
    }

    idCard.is_active = !idCard.is_active;
    await idCard.save();

    res.status(200).json(idCard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrUpdateIdCard,
  getAllIdCards,
  getIdCardById,
  getActiveIdCards,
  deleteIdCard,
  toggleIdCardStatus
};
