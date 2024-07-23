const express = require('express');
const router = express.Router();
const { register, login, updateProfile } = require('../controllers/teacherController');
const authMiddleware = require('../middlewares/authMiddleware');

// Route pour l'inscription
router.post('/register', register);

// Route pour la connexion
router.post('/login', login);

// Route pour la mise à jour du profil
router.put('/profile/:teacherId', authMiddleware, updateProfile);

module.exports = router;
