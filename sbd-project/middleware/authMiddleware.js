const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  try {
    let token;

    // 1. Ambil token dari header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // 2. Jika tidak ada token
    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to access this route'
      });
    }

    // 3. Verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');

    // 4. Cari user dan simpan ke request
    req.user = await User.findById(decoded.id).select('-password');
    
    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      error: 'Not authorized, token failed'
    });
  }
};

module.exports = {
  protect
};