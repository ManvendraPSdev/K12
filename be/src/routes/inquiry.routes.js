const express = require('express');
const inquiryController = require('../controllers/inquiry.controller');
const authenticate = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const {
  createInquiryBodySchema,
  listInquiriesQuerySchema,
  updateInquiryStatusBodySchema,
  uuidParamSchema,
} = require('../validators/inquiry.validator');

const publicInquiryRoutes = express.Router();
const adminInquiryRoutes = express.Router();

publicInquiryRoutes.post(
  '/',
  validate({ body: createInquiryBodySchema }),
  inquiryController.createInquiry,
);

adminInquiryRoutes.use(authenticate);

adminInquiryRoutes.get(
  '/',
  validate({ query: listInquiriesQuerySchema }),
  inquiryController.listInquiries,
);

adminInquiryRoutes.get(
  '/:id',
  validate({ params: uuidParamSchema }),
  inquiryController.getInquiryById,
);

adminInquiryRoutes.patch(
  '/:id/status',
  validate({ params: uuidParamSchema, body: updateInquiryStatusBodySchema }),
  inquiryController.updateInquiryStatus,
);

adminInquiryRoutes.delete(
  '/:id',
  validate({ params: uuidParamSchema }),
  inquiryController.deleteInquiry,
);

module.exports = {
  publicInquiryRoutes,
  adminInquiryRoutes,
};
