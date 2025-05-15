const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/authController');

// Debugging middleware
router.use((req, res, next) => {
  console.log(`Auth route hit: ${req.method} ${req.path}`);
  next();
});

router.post('/register', (req, res) => {
  console.log('Register endpoint hit!', req.body);
  registerUser(req, res);
});

module.exports = router;