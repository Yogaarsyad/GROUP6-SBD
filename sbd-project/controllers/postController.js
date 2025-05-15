const Post = require('../models/Post');
const User = require('../models/User');

// Fungsi createPost
const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.user._id;

    if (!content) {
      return res.status(400).json({ 
        success: false,
        error: 'Content is required' 
      });
    }

    const newPost = new Post({
      content,
      author: userId
    });

    await newPost.save();

    const populatedPost = await Post.findById(newPost._id)
      .populate('author', 'username profilePic');

    res.status(201).json({
      success: true,
      post: populatedPost
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// Fungsi getFeed
const getFeed = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    const posts = await Post.find({
      $or: [
        { author: { $in: user.following } },
        { author: userId }
      ]
    })
    .sort({ createdAt: -1 })
    .populate('author', 'username profilePic')
    .populate('likes', 'username profilePic');

    res.json({
      success: true,
      posts
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// Fungsi getTrendingPosts
const getTrendingPosts = async (req, res) => {
  try {
    const trendingPosts = await Post.aggregate([
      {
        $project: {
          content: 1,
          likeCount: { $size: "$likes" },
          createdAt: 1,
          author: 1
        }
      },
      { $sort: { likeCount: -1 } },
      { $limit: 10 }
    ]);

    const populatedPosts = await Post.populate(trendingPosts, [
      { path: 'author', select: 'username profilePic' }
    ]);

    res.json({
      success: true,
      posts: populatedPosts
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// Ekspor semua fungsi
module.exports = {
  createPost,
  getFeed,
  getTrendingPosts
};