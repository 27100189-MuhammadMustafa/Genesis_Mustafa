const jwt = require('jsonwebtoken');

// Protect routes by verifying JWT
exports.authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Format: "Bearer <token>"

  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid/expired token' });
    }
    req.user = decoded; // Attach user data to the request
    next();
  });
};