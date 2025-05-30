const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Membuat index unik untuk mencegah like ganda
likeSchema.index({ user: 1, post: 1 }, { unique: true });

module.exports = mongoose.model('Like', likeSchema);