const express = require('express');
const router = express.Router();
const { register, login, updateProfile } = require('../controllers/teacherController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.put('/profile/:teacherId', authMiddleware, updateProfile);

module.exports = router;
