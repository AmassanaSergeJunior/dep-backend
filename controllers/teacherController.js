const Teacher = require('../models/Teacher');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwtUtils');

// Fonction pour l'inscription
exports.register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return res.status(400).json({ message: 'Teacher already registered with this email' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newTeacher = new Teacher({ firstName, lastName, email, password: hashedPassword });
    await newTeacher.save();
    res.status(201).json({ message: 'Teacher registered successfully' });
  } catch (error) {
    console.error('Error registering teacher:', error);
    res.status(500).json({ message: 'Error registering teacher', error: error.message });
  }
};

// Fonction pour la connexion
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = generateToken(teacher._id);
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

// Fonction pour mettre à jour le profil
exports.updateProfile = async (req, res) => {
  const { teacherId } = req.params;
  const updates = req.body;
  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(teacherId, updates, { new: true });
    res.status(200).json({ message: 'Profile updated successfully', updatedTeacher });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
};
