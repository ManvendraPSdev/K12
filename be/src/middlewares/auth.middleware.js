const { prisma } = require('../config/db');
const ApiError = require('../utils/ApiError');
const { verifyToken } = require('../utils/jwt');

function getBearerToken(header) {
  if (!header || typeof header !== 'string') {
    return null;
  }

  const [scheme, token] = header.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return null;
  }

  return token;
}

async function authenticate(req, _res, next) {
  try {
    const token = getBearerToken(req.headers.authorization);

    if (!token) {
      throw new ApiError(401, 'Authentication required');
    }

    const decoded = verifyToken(token);
    const adminId = decoded.sub;

    if (!adminId) {
      throw new ApiError(401, 'Invalid token');
    }

    const admin = await prisma.admin.findUnique({
      where: { id: adminId },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!admin) {
      throw new ApiError(401, 'Unauthorized');
    }

    req.user = admin;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authenticate;
