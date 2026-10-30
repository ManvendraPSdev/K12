const ApiError = require('../utils/ApiError');

function notFoundMiddleware(req, _res, next) {
  const path = req.originalUrl.split('?')[0];
  next(new ApiError(404, `Route ${req.method} ${path} not found`));
}

module.exports = notFoundMiddleware;
