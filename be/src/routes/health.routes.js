const express = require('express');
const { prisma } = require('../config/db');
const ApiResponse = require('../utils/ApiResponse');

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    return new ApiResponse(200, 'Service is healthy', {
      status: 'ok',
      server: 'available',
      database: 'connected',
    }).send(res);
  } catch {
    return res.status(503).json({
      success: false,
      message: 'Service unavailable',
      errors: [
        {
          field: 'database',
          message: 'Database connectivity check failed',
        },
      ],
    });
  }
});

module.exports = router;
