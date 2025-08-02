const Document = require('../models/Document');

// Create a new document
exports.createDocument = async (req, res) => {
  try {
    const document = new Document(req.body);
    await document.save();
    res.status(201).json(document);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all documents
exports.getAllDocuments = async (req, res) => {
  try {
    const documents = await Document.find().populate('uploaded_by', 'name');
    res.json(documents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get document by ID
exports.getDocumentById = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id).populate('uploaded_by', 'name');
    if (!document) return res.status(404).json({ error: 'Document not found' });
    res.json(document);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update document
exports.updateDocument = async (req, res) => {
  try {
    const document = await Document.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!document) return res.status(404).json({ error: 'Document not found' });
    res.json(document);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete document
exports.deleteDocument = async (req, res) => {
  try {
    const document = await Document.findByIdAndDelete(req.params.id);
    if (!document) return res.status(404).json({ error: 'Document not found' });
    res.json({ message: 'Document deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
