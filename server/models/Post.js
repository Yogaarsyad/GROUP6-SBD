const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'Content is required'],
    maxlength: [1000, 'Content cannot exceed 1000 characters']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  likeCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
postSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Virtual for like count
postSchema.virtual('likesCount').get(function() {
  return this.likes.length;
});

// Indexes
postSchema.index({ author: 1 });
postSchema.index({ likeCount: -1 });
postSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Post', postSchema);