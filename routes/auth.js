const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { registerLimiter } = require('../middleware/rateLimit');
const { loginLimiter } = require('../middleware/rateLimit');

router.post('/register', registerLimiter, register);
router.post('/login', loginLimiter, login);

module.exports = router;