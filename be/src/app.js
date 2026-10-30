const express = require('express');
const helmet = require('helmet');
const corsMiddleware = require('./config/cors');
const healthRoutes = require('./routes/health.routes');
const authRoutes = require('./routes/auth.routes');
const { publicInquiryRoutes, adminInquiryRoutes } = require('./routes/inquiry.routes');
const notFoundMiddleware = require('./middlewares/not-found.middleware');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();
const apiV1 = express.Router();

app.disable('x-powered-by');
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  }),
);
app.use(corsMiddleware);
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

apiV1.use('/health', healthRoutes);
apiV1.use('/auth', authRoutes);
apiV1.use('/inquiries', publicInquiryRoutes);
apiV1.use('/admin/inquiries', adminInquiryRoutes);

app.use('/api/v1', apiV1);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;
