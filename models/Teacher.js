const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  profileImage: { type: String },
  grade: { type: String },
  expertise: { type: String }
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
