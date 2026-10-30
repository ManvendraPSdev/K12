const { z } = require('zod');
const env = require('../src/config/env');
const { prisma, connectDatabase, disconnectDatabase } = require('../src/config/db');
const { hashPassword } = require('../src/utils/password');

const seedSchema = z.object({
  ADMIN_NAME: z.string().trim().min(1, 'ADMIN_NAME is required'),
  ADMIN_EMAIL: z.string().trim().toLowerCase().email('ADMIN_EMAIL must be a valid email'),
  ADMIN_PASSWORD: z.string().min(8, 'ADMIN_PASSWORD must be at least 8 characters'),
});

async function seedAdmin() {
  const parsed = seedSchema.safeParse({
    ADMIN_NAME: env.adminName,
    ADMIN_EMAIL: env.adminEmail,
    ADMIN_PASSWORD: env.adminPassword,
  });

  if (!parsed.success) {
    const fields = parsed.error.issues.map((issue) => issue.path.join('.') || 'env');
    throw new Error(`Invalid admin seed configuration: ${fields.join(', ')}`);
  }

  const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = parsed.data;

  await connectDatabase();

  const existing = await prisma.admin.findUnique({
    where: { email: ADMIN_EMAIL },
    select: { id: true },
  });

  if (existing) {
    console.log('Admin already exists. Skipping creation.');
    return;
  }

  const password = await hashPassword(ADMIN_PASSWORD);

  await prisma.admin.create({
    data: {
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      password,
    },
    select: { id: true },
  });

  console.log('Admin account created successfully.');
}

seedAdmin()
  .catch((error) => {
    console.error('Admin seed failed:', error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await disconnectDatabase();
  });
