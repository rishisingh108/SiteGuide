const jwt = require('jsonwebtoken');

/**
 * Requires a valid JWT in the Authorization header: "Bearer <token>"
 * Attaches decoded payload to req.user
 */
function requireAuth(req, res, next) {
  const header = req.header('Authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: { message: 'Unauthorized: no token provided' } });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // { id, email, name }
    next();
  } catch (err) {
    return res.status(401).json({ error: { message: 'Unauthorized: invalid or expired token' } });
  }
}

module.exports = { requireAuth };
