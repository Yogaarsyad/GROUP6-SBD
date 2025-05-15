const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// POST a comment
router.post('/', commentController.createComment);

// GET comments by post ID
router.get('/:postId', commentController.getCommentsByPost);

module.exports = router;
