const jwt = require('jsonwebtoken');
const pool = require('../db');
const JWT_SECRET = require('../config');

async function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.toLowerCase().startsWith('bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId ?? decoded.id;
    console.log('Decoded token:', decoded, 'with user ID:', userId); // Log the decoded token

    const result = await pool.query('SELECT * FROM users WHERE id = $1', [
      userId,
    ]);
    console.log('User found:', result.rows[0]); // Log the user found in the database

    if (!result.rows[0]) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = result.rows[0];
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = authenticate;
