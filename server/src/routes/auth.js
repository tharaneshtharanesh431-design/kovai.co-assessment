const express = require('express');
const { googleAuth, logout, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/google', googleAuth);
router.post('/logout', logout);
router.get('/me', protect, getMe);

module.exports = router;
