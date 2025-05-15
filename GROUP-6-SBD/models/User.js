
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: [true, 'Username harus diisi'],
    unique: true,
    trim: true,
    minlength: [3, 'Username minimal 3 karakter'],
    maxlength: [15, 'Username maksimal 15 karakter'],
    match: [/^[a-zA-Z0-9_]+$/, 'Username hanya boleh mengandung huruf, angka, dan underscore']
  },
  email: { 
    type: String, 
    required: [true, 'Email harus diisi'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email tidak valid']
  },
  password: { 
    type: String, 
    required: [true, 'Password harus diisi'],
    minlength: [6, 'Password minimal 6 karakter'],
    select: false // Menyembunyikan password di response
  },
  profilePic: {
    type: String,
    default: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
  },
  bio: {
    type: String,
    maxlength: [160, 'Bio maksimal 160 karakter'],
    default: ''
  },
  following: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' 
  }],
  followers: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' 
  }],
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Hash password sebelum menyimpan user
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method untuk memverifikasi password
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Validasi unik untuk username dan email
userSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    const field = Object.keys(error.keyPattern)[0];
    next(new Error(`${field} sudah terdaftar`));
  } else {
    next(error);
  }
});

module.exports = mongoose.model('User', userSchema);