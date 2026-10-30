const { PrismaClient } = require('@prisma/client');
const env = require('./env');

const globalForPrisma = globalThis;

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: env.isProduction ? ['error'] : ['warn', 'error'],
  });

if (!env.isProduction) {
  globalForPrisma.prisma = prisma;
}

async function checkDatabaseHealth() {
  await prisma.$queryRaw`SELECT 1`;
}

async function connectDatabase() {
  try {
    await prisma.$connect();
    await checkDatabaseHealth();
  } catch {
    throw new Error('Database connection failed');
  }
}

async function disconnectDatabase() {
  await prisma.$disconnect();
}

module.exports = {
  prisma,
  checkDatabaseHealth,
  connectDatabase,
  disconnectDatabase,
};
