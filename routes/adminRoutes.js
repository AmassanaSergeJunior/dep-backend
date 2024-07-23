const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/adminController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.post('/register', register);
router.post('/login', login);

module.exports = router;
