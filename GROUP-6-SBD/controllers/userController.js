const User = require('../models/User');

// Create a user
exports.createUser = async (req, res) => {
  try {
    const { username, email, password, bio } = req.body;
    const newUser = new User({ username, email, password, bio });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get user by ID
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('followers following');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Follow another user
exports.followUser = async (req, res) => {
  const { userId, targetId } = req.body;
  try {
    const user = await User.findById(userId);
    const target = await User.findById(targetId);

    if (!user || !target) return res.status(404).json({ message: 'User not found' });

    if (!user.following.includes(targetId)) {
      user.following.push(targetId);
      target.followers.push(userId);
      await user.save();
      await target.save();
    }

    res.json({ message: 'Followed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
