const express = require('express');
const router = express.Router();
const { createPage, getAllPages, updatePage, deletePage } = require('../controllers/pageController');
const authMiddleware = require('../middlewares/authMiddleware');

// Route pour créer une page
router.post('/', authMiddleware, createPage);

// Route pour obtenir toutes les pages
router.get('/', getAllPages);

// Route pour mettre à jour une page
router.put('/:pageId', authMiddleware, updatePage);

// Route pour supprimer une page
router.delete('/:pageId', authMiddleware, deletePage);

module.exports = router;
