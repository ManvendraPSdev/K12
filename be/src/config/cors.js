const cors = require('cors');
const env = require('./env');

const allowedOrigins = env.corsOrigin
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

if (env.isProduction && allowedOrigins.some((origin) => origin === '*')) {
  throw new Error('CORS_ORIGIN cannot use a wildcard in production');
}

const corsOptions = {
  origin(origin, callback) {
    if (!origin) {
      callback(null, true);
      return;
    }

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204,
  maxAge: 600,
};

module.exports = cors(corsOptions);
module.exports.allowedOrigins = allowedOrigins;
