const env = require('../config/env');
const ApiError = require('../utils/ApiError');

function errorMiddleware(err, _req, res, _next) {
  let statusCode = err.statusCode || 500;
  let message = 'Internal server error';
  let errors = Array.isArray(err.errors) ? err.errors : [];

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err.type === 'entity.parse.failed' || (err instanceof SyntaxError && 'body' in err)) {
    statusCode = 400;
    message = 'Invalid JSON payload';
    errors = [];
  } else if (err.message === 'Not allowed by CORS') {
    statusCode = 403;
    message = 'Origin not allowed';
    errors = [];
  } else if (!env.isProduction && err.message) {
    message = 'Internal server error';
  }

  if (env.isProduction && statusCode >= 500) {
    message = 'Internal server error';
    errors = [];
  }

  if (statusCode >= 500) {
    console.error('Unhandled application error:', err.name);
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
}

module.exports = errorMiddleware;
