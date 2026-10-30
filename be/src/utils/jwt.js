const jwt = require('jsonwebtoken');
const env = require('../config/env');
const ApiError = require('./ApiError');

function generateToken({ id }) {
  return jwt.sign({}, env.jwtSecret, {
    subject: id,
    expiresIn: env.jwtExpiresIn,
  });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, env.jwtSecret);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new ApiError(401, 'Token expired');
    }

    throw new ApiError(401, 'Invalid token');
  }
}

module.exports = {
  generateToken,
  verifyToken,
};
