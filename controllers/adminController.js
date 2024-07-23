const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwtUtils');

// Inscription
exports.register = async (req, res) => {
  const { firstName, lastName, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ firstName, lastName, password: hashedPassword });
    await newAdmin.save();
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering admin', error });
  }
};

// Connexion
exports.login = async (req, res) => {
  const { firstName, lastName, password } = req.body;
  try {
    const admin = await Admin.findOne({ firstName, lastName });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = generateToken(admin._id);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};
