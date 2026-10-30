const crypto = require('crypto');
const { prisma } = require('../config/db');
const ApiError = require('../utils/ApiError');
const { comparePassword, hashPassword } = require('../utils/password');
const { generateToken } = require('../utils/jwt');

const dummyHashPromise = hashPassword(crypto.randomBytes(16).toString('hex'));

function toPublicAdmin(admin) {
  return {
    id: admin.id,
    name: admin.name,
    email: admin.email,
  };
}

async function login({ email, password }) {
  const admin = await prisma.admin.findUnique({
    where: { email },
  });

  const passwordHash = admin ? admin.password : await dummyHashPromise;
  const isMatch = await comparePassword(password, passwordHash);

  if (!admin || !isMatch) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const token = generateToken({ id: admin.id });

  return {
    admin: toPublicAdmin(admin),
    token,
  };
}

async function getCurrentAdmin(user) {
  return {
    admin: toPublicAdmin(user),
  };
}

module.exports = {
  login,
  getCurrentAdmin,
  toPublicAdmin,
};
