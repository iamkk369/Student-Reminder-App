const express = require('express');
const router = express.Router();
const { register } = require('../controllers/authController');
const { registerLimiter } = require('../middleware/rateLimit');

router.post('/register', registerLimiter, register);

module.exports = router;