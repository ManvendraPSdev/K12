const express = require('express');
const { checkDatabaseHealth } = require('../config/db');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');

const router = express.Router();

router.get('/', async (_req, res, next) => {
  try {
    await checkDatabaseHealth();

    return new ApiResponse(200, 'Service is healthy', {
      status: 'ok',
      server: 'available',
      database: 'connected',
    }).send(res);
  } catch {
    return next(
      new ApiError(503, 'Service unavailable', [
        {
          field: 'database',
          message: 'Database connectivity check failed',
        },
      ]),
    );
  }
});

module.exports = router;
