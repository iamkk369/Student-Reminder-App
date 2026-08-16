const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { registerLimiter } = require('../middleware/rateLimit');
const { loginLimiter } = require('../middleware/rateLimit');
const { authenticate } = require('../middleware/authenticate');

router.post('/register', registerLimiter, register);
router.post('/login', loginLimiter, login);
router.get('/me', authenticate, (req, res) => {
  res.status(200).json({ user: req.user });
});

module.exports = router;