/**
 * Simple API key auth middleware.
 * Protects write operations (POST/PUT/PATCH/DELETE) with a shared secret key.
 * Set API_KEY in .env — if unset, auth is skipped (useful for local dev only).
 *
 * For multi-user production use, swap this for JWT-based user auth.
 */
function requireApiKey(req, res, next) {
  const configuredKey = process.env.API_KEY;

  // If no API_KEY is configured, don't block requests (dev mode)
  if (!configuredKey) {
    if (process.env.NODE_ENV === 'production') {
      console.warn('⚠️  API_KEY not set in production — write routes are UNPROTECTED.');
    }
    return next();
  }

  const providedKey = req.header('x-api-key');

  if (!providedKey || providedKey !== configuredKey) {
    return res.status(401).json({ error: { message: 'Unauthorized: missing or invalid API key' } });
  }

  next();
}

module.exports = { requireApiKey };
