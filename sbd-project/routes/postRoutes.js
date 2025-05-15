const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware'); // ✅ Sudah diperbaiki

// Protect semua route
router.use(protect);

router.post('/', postController.createPost);
router.get('/feed', postController.getFeed);
router.get('/trending', postController.getTrendingPosts);

module.exports = router;
