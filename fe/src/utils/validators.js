import { USER_TYPES, INQUIRY_CATEGORIES } from '../config/constants.js';

/**
 * Validates email format.
 */
export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Normalizes phone number by removing spaces, hyphens, and parentheses.
 * Consistent with backend Zod transform.
 */
export function normalizePhoneNumber(phone) {
  if (!phone || typeof phone !== 'string') return '';
  return phone.trim().replace(/[\s()-]/g, '');
}

/**
 * Validates phone format against backend specification:
 * 7 to 15 digits with optional leading '+'
 */
export function isValidPhone(phone) {
  const normalized = normalizePhoneNumber(phone);
  return /^\+?[0-9]{7,15}$/.test(normalized);
}

/**
 * Full inquiry form validation matching backend Zod schema.
 */
export function validateInquiryForm(values) {
  const errors = {};

  // Name validation: 1-100 characters
  const trimmedName = values.name ? values.name.trim() : '';
  if (!trimmedName) {
    errors.name = 'Name is required';
  } else if (trimmedName.length > 100) {
    errors.name = 'Name must be 100 characters or fewer';
  }

  // Email validation
  const trimmedEmail = values.email ? values.email.trim() : '';
  if (!trimmedEmail) {
    errors.email = 'Email address is required';
  } else if (!isValidEmail(trimmedEmail)) {
    errors.email = 'Please enter a valid email address';
  }

  // Phone validation: 7-15 digits
  const rawPhone = values.phone ? values.phone.trim() : '';
  if (!rawPhone) {
    errors.phone = 'Phone number is required';
  } else if (!isValidPhone(rawPhone)) {
    errors.phone = 'Phone must be between 7 and 15 digits (optional leading +)';
  }

  // User Type validation
  if (!values.userType || !Object.values(USER_TYPES).includes(values.userType)) {
    errors.userType = 'Please select a valid user type';
  }

  // Category validation
  if (!values.category || !Object.values(INQUIRY_CATEGORIES).includes(values.category)) {
    errors.category = 'Please select an inquiry category';
  }

  // Message validation: 1-2000 characters
  const trimmedMessage = values.message ? values.message.trim() : '';
  if (!trimmedMessage) {
    errors.message = 'Message is required';
  } else if (trimmedMessage.length > 2000) {
    errors.message = 'Message must be 2000 characters or fewer';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
