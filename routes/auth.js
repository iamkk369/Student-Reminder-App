const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/authController');
const { registerLimiter } = require('../middleware/rateLimit');
const { loginLimiter } = require('../middleware/rateLimit');
const { authenticate } = require('../middleware/authenticate');

router.post('/register', registerLimiter, register);
router.post('/login', loginLimiter, login);
router.get('/me', authenticate, (req, res) => {
  res.status(200).json({ user: req.user });
});

router.post('/logout', logout);

module.exports = router;