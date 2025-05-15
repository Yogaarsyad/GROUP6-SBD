const express = require('express');
const router = express.Router();
const followerController = require('../controllers/followerController');

// POST to follow a user
router.post('/', followerController.followUser);

// GET followers by user ID
router.get('/:userId/followers', followerController.getFollowers);

// GET following by user ID
router.get('/:userId/following', followerController.getFollowing);

module.exports = router;
