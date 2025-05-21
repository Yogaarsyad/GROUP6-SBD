const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const jwt = require('jsonwebtoken');

// Middleware manual, karena kamu belum pakai `authMiddleware.js`
const authMiddleware = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ success: false, error: 'Token tidak ditemukan' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret_key');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: 'Token tidak valid' });
  }
};

// POST /api/posts
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ success: false, error: 'Konten harus diisi' });
    }

    const post = new Post({
      user: req.user.id,
      content
    });

    await post.save();

    res.status(201).json({ success: true, post });
  } catch (err) {
    console.error('Post error:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;
