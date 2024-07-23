const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const teacherRoutes = require('./routes/teacherRoutes');
const adminRoutes = require('./routes/adminRoutes');
const pageRoutes = require('./routes/pageRoutes');
require('dotenv').config();

const app = express();
connectDB();

app.use(express.json());

app.use('/api/teachers', teacherRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/pages', pageRoutes);

// Serve static files from the React app (if you are serving the frontend with the backend)
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
