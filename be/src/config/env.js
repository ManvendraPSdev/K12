const path = require('path');
const dotenv = require('dotenv');
const { z } = require('zod');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(5000),
  DATABASE_URL: z.string().trim().min(1, 'DATABASE_URL is required'),
  CORS_ORIGIN: z.string().trim().min(1, 'CORS_ORIGIN is required'),
  JWT_SECRET: z.string().optional(),
  JWT_EXPIRES_IN: z.string().optional(),
  ADMIN_EMAIL: z.string().optional(),
  ADMIN_PASSWORD: z.string().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const fields = parsed.error.issues.map((issue) => issue.path.join('.') || 'env');
  throw new Error(`Invalid environment configuration: ${fields.join(', ')}`);
}

const env = {
  nodeEnv: parsed.data.NODE_ENV,
  isProduction: parsed.data.NODE_ENV === 'production',
  port: parsed.data.PORT,
  databaseUrl: parsed.data.DATABASE_URL,
  corsOrigin: parsed.data.CORS_ORIGIN,
  jwtSecret: parsed.data.JWT_SECRET,
  jwtExpiresIn: parsed.data.JWT_EXPIRES_IN || '1d',
  adminEmail: parsed.data.ADMIN_EMAIL,
  adminPassword: parsed.data.ADMIN_PASSWORD,
};

module.exports = env;
