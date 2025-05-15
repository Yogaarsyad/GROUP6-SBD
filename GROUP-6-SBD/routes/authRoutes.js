const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Middleware untuk handle error async
const asyncHandler = fn => (req, res, next) => 
  Promise.resolve(fn(req, res, next)).catch(next);

// Register User
router.post('/register', asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // Validasi input
  if (!username || !email || !password) {
    return res.status(400).json({ 
      success: false,
      error: 'All fields are required' 
    });
  }

  // Cek jika user sudah ada
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      error: 'User with this email or username already exists'
    });
  }

  const user = await User.create({
    username,
    email,
    password
  });

  const token = jwt.sign(
    { id: user._id }, 
    process.env.JWT_SECRET || 'fallback_secret', 
    { expiresIn: '7d' }
  );

  res.status(201).json({
    success: true,
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic
    },
    token
  });
}));

// Login User
router.post('/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ 
      success: false,
      error: 'Email and password are required' 
    });
  }

  const user = await User.findOne({ email }).select('+password');
  
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ 
      success: false,
      error: 'Invalid email or password' 
    });
  }

  const token = jwt.sign(
    { id: user._id }, 
    process.env.JWT_SECRET || 'fallback_secret', 
    { expiresIn: '7d' }
  );

  res.json({
    success: true,
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic
    },
    token
  });
}));

module.exports = router;