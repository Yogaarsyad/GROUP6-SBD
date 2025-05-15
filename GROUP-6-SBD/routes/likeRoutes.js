const express = require('express');
const router = express.Router();
const likeController = require('../controllers/likeController');

// POST a like
router.post('/', likeController.createLike);

// GET likes by post ID
router.get('/:postId', likeController.getLikesByPost);

module.exports = router;
