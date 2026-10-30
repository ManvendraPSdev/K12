const { z } = require('zod');

const USER_TYPES = ['PARENT', 'STUDENT', 'SCHOOL'];
const CATEGORIES = ['SCHOLARSHIP', 'CONCERT', 'ADMISSION', 'GENERAL_QUERY'];
const STATUSES = ['PENDING', 'IN_PROGRESS', 'RESOLVED'];
const SORT_FIELDS = ['createdAt', 'updatedAt'];
const SORT_ORDERS = ['asc', 'desc'];

function emptyToUndefined(value) {
  if (value === undefined || value === null) {
    return undefined;
  }

  if (typeof value === 'string' && value.trim() === '') {
    return undefined;
  }

  return value;
}

const uuidParamSchema = z
  .object({
    id: z.string().uuid('Invalid inquiry id'),
  })
  .strict();

const createInquiryBodySchema = z
  .object({
    name: z.string().trim().min(1, 'Name is required').max(100),
    email: z.string().trim().toLowerCase().email('Invalid email address'),
    phone: z
      .string()
      .trim()
      .transform((value) => value.replace(/[\s()-]/g, ''))
      .refine((value) => /^\+?[0-9]{7,15}$/.test(value), {
        message: 'Invalid phone number',
      }),
    userType: z.enum(USER_TYPES),
    category: z.enum(CATEGORIES),
    message: z.string().trim().min(1, 'Message is required').max(2000),
  })
  .strict();

const listInquiriesQuerySchema = z
  .object({
    page: z.preprocess(emptyToUndefined, z.coerce.number().int().min(1).default(1)),
    limit: z.preprocess(emptyToUndefined, z.coerce.number().int().min(1).max(100).default(10)),
    category: z.preprocess(emptyToUndefined, z.enum(CATEGORIES).optional()),
    userType: z.preprocess(emptyToUndefined, z.enum(USER_TYPES).optional()),
    status: z.preprocess(emptyToUndefined, z.enum(STATUSES).optional()),
    search: z.preprocess(emptyToUndefined, z.string().trim().min(1).max(100).optional()),
    sortBy: z.preprocess(emptyToUndefined, z.enum(SORT_FIELDS).default('createdAt')),
    sortOrder: z.preprocess(emptyToUndefined, z.enum(SORT_ORDERS).default('desc')),
  })
  .strict();

const updateInquiryStatusBodySchema = z
  .object({
    status: z.enum(STATUSES),
  })
  .strict();

module.exports = {
  uuidParamSchema,
  createInquiryBodySchema,
  listInquiriesQuerySchema,
  updateInquiryStatusBodySchema,
};
