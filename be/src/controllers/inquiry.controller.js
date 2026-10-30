const inquiryService = require('../services/inquiry.service');
const ApiResponse = require('../utils/ApiResponse');

async function createInquiry(req, res) {
  const data = await inquiryService.createInquiry(req.validated.body);
  return new ApiResponse(201, 'Inquiry submitted successfully', data).send(res);
}

async function listInquiries(req, res) {
  const data = await inquiryService.listInquiries(req.validated.query);
  return new ApiResponse(200, 'Inquiries fetched successfully', data).send(res);
}

async function getInquiryById(req, res) {
  const data = await inquiryService.getInquiryById(req.validated.params.id);
  return new ApiResponse(200, 'Inquiry fetched successfully', data).send(res);
}

async function updateInquiryStatus(req, res) {
  const data = await inquiryService.updateInquiryStatus(
    req.validated.params.id,
    req.validated.body.status,
  );
  return new ApiResponse(200, 'Inquiry status updated successfully', data).send(res);
}

async function deleteInquiry(req, res) {
  await inquiryService.deleteInquiry(req.validated.params.id);
  return new ApiResponse(200, 'Inquiry deleted successfully', {}).send(res);
}

module.exports = {
  createInquiry,
  listInquiries,
  getInquiryById,
  updateInquiryStatus,
  deleteInquiry,
};
