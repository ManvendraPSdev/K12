const { z } = require('zod');

const loginBodySchema = z
  .object({
    email: z.string().trim().toLowerCase().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
  })
  .strict();

module.exports = {
  loginBodySchema,
};
