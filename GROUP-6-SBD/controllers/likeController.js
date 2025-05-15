const Like = require('../models/Like');

// POST a like
exports.createLike = async (req, res) => {
  const { postId, userId } = req.body;

  try {
    const newLike = new Like({ postId, userId });
    await newLike.save();
    res.status(201).json(newLike);
  } catch (err) {
    res.status(400).json({ message: 'Error liking post', error: err });
  }
};

// GET all likes for a post
exports.getLikesByPost = async (req, res) => {
  try {
    const likes = await Like.find({ postId: req.params.postId });
    res.json(likes);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching likes', error: err });
  }
};
