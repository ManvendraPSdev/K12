import apiClient from './apiClient';

/**
 * Submit a new public inquiry.
 * Exact backend contract: POST /api/v1/inquiries
 * Payload: { name, email, phone, userType, category, message }
 */
export async function submitPublicInquiry(payload) {
  const response = await apiClient.post('/inquiries', payload);
  return response.data;
}

export default {
  submitPublicInquiry,
};
