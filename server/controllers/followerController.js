const Follower = require('../models/Follower');

// POST to follow a user
exports.followUser = async (req, res) => {
  const { followerId, followedId } = req.body;

  try {
    const newFollower = new Follower({ followerId, followedId });
    await newFollower.save();
    res.status(201).json(newFollower);
  } catch (err) {
    res.status(400).json({ message: 'Error following user', error: err });
  }
};

// GET all followers of a user
exports.getFollowers = async (req, res) => {
  try {
    const followers = await Follower.find({ followedId: req.params.userId });
    res.json(followers);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching followers', error: err });
  }
};

// GET all users a user is following
exports.getFollowing = async (req, res) => {
  try {
    const following = await Follower.find({ followerId: req.params.userId });
    res.json(following);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching following users', error: err });
  }
};
