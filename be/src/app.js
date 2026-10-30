const express = require('express');
const helmet = require('helmet');
const corsMiddleware = require('./config/cors');
const healthRoutes = require('./routes/health.routes');
const notFoundMiddleware = require('./middlewares/not-found.middleware');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();

app.disable('x-powered-by');
app.use(helmet());
app.use(corsMiddleware);
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

app.use('/api/v1/health', healthRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;
