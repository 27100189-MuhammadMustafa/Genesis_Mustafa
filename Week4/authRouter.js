const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth');

// Public routes
router.post('/register', register);
router.post('/login', login);

// Example protected route (requires JWT)
router.get('/profile', require('../middleware/auth').authenticate, (req, res) => {
  res.json({ message: `Welcome, ${req.user.email}!` });
});

module.exports = router;