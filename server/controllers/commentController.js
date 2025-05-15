const Comment = require('../models/Comment');

// POST a comment
exports.createComment = async (req, res) => {
  const { postId, userId, content } = req.body;

  try {
    const newComment = new Comment({ postId, userId, content });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ message: 'Error creating comment', error: err });
  }
};

// GET all comments for a post
exports.getCommentsByPost = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId });
    res.json(comments);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching comments', error: err });
  }
};
