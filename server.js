// backend/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Expose uploads folder

// Ensure uploads folder exists
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

// Multer Storage Configuration for File Uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// MongoDB Schema & Model (Updated for all PDF fields)
const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNumber: { type: String, required: true },
  year: { type: String, required: true },
  degree: { type: String, required: true },
  project: { type: String, required: true },
  hobbies: { type: String, required: true },
  certificate: { type: String, required: true },
  internship: { type: String, required: true },
  aim: { type: String, required: true },
  image: { type: String, required: true } // Stores the file path
}, { timestamps: true });

const Member = mongoose.model('Member', memberSchema);

// API ROUTES

// 1. GET all team members
app.get('/api/members', async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 2. GET a single team member by ID
app.get('/api/members/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ message: 'Member not found' });
    res.json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 3. POST a new team member (With Image Upload)
app.post('/api/members', upload.single('image'), async (req, res) => {
  try {
    const newMember = new Member({
      ...req.body,
      image: req.file ? req.file.path : '' // Save the path to the DB
    });
    await newMember.save();
    res.status(201).json(newMember);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Database Connection & Server Start
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/student_management';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected successfully');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));