function originProtection(req, res, next) {
  const safeMethods = ['GET', 'HEAD', 'OPTIONS'];
  if (safeMethods.includes(req.method)) {
    return next();
  }

  const allowedOrigin = process.env.ALLOWED_ORIGIN || 'http://localhost:3000';

  if (req.headers.origin && req.headers.origin !== allowedOrigin) {
    return res.status(403).json({ error: 'Origin not allowed' });
  }

  if (req.headers['x-api-request'] !== 'true') {
    return res.status(403).json({ error: 'Header x-api-request required' });
  }

  next();
}

module.exports = originProtection;