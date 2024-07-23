const Page = require('../models/Page');

// Fonction pour créer une page
exports.createPage = async (req, res) => {
  const { title, content } = req.body;
  try {
    const newPage = new Page({ title, content });
    await newPage.save();
    res.status(201).json({ message: 'Page created successfully', newPage });
  } catch (error) {
    res.status(500).json({ message: 'Error creating page', error });
  }
};

// Fonction pour obtenir toutes les pages
exports.getAllPages = async (req, res) => {
  try {
    const pages = await Page.find();
    res.status(200).json(pages);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving pages', error });
  }
};

// Fonction pour mettre à jour une page
exports.updatePage = async (req, res) => {
  const { pageId } = req.params;
  const updates = req.body;
  try {
    const updatedPage = await Page.findByIdAndUpdate(pageId, updates, { new: true });
    res.status(200).json({ message: 'Page updated successfully', updatedPage });
  } catch (error) {
    res.status(500).json({ message: 'Error updating page', error });
  }
};

// Fonction pour supprimer une page
exports.deletePage = async (req, res) => {
  const { pageId } = req.params;
  try {
    await Page.findByIdAndDelete(pageId);
    res.status(200).json({ message: 'Page deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting page', error });
  }
};
