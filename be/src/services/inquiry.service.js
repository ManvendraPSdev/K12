const { prisma } = require('../config/db');
const ApiError = require('../utils/ApiError');

const inquirySelect = {
  id: true,
  name: true,
  email: true,
  phone: true,
  userType: true,
  category: true,
  message: true,
  status: true,
  createdAt: true,
  updatedAt: true,
};

async function createInquiry(input) {
  const inquiry = await prisma.inquiry.create({
    data: {
      name: input.name,
      email: input.email,
      phone: input.phone,
      userType: input.userType,
      category: input.category,
      message: input.message,
      status: 'PENDING',
    },
    select: inquirySelect,
  });

  return { inquiry };
}

async function listInquiries(query) {
  const { page, limit, category, userType, status, search, sortBy, sortOrder } = query;

  const where = {};

  if (category) {
    where.category = category;
  }

  if (userType) {
    where.userType = userType;
  }

  if (status) {
    where.status = status;
  }

  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { phone: { contains: search, mode: 'insensitive' } },
    ];
  }

  const [inquiries, total] = await Promise.all([
    prisma.inquiry.findMany({
      where,
      select: inquirySelect,
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      orderBy: { [sortBy]: sortOrder },
    }),
    prisma.inquiry.count({ where }),
  ]);

  return {
    inquiries,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit) || 0,
    },
  };
}

async function getInquiryById(id) {
  const inquiry = await prisma.inquiry.findUnique({
    where: { id },
    select: inquirySelect,
  });

  if (!inquiry) {
    throw new ApiError(404, 'Inquiry not found');
  }

  return { inquiry };
}

async function updateInquiryStatus(id, status) {
  try {
    const inquiry = await prisma.inquiry.update({
      where: { id },
      data: { status },
      select: inquirySelect,
    });

    return { inquiry };
  } catch (error) {
    if (error.code === 'P2025') {
      throw new ApiError(404, 'Inquiry not found');
    }

    throw error;
  }
}

async function deleteInquiry(id) {
  try {
    await prisma.inquiry.delete({
      where: { id },
    });
  } catch (error) {
    if (error.code === 'P2025') {
      throw new ApiError(404, 'Inquiry not found');
    }

    throw error;
  }
}

module.exports = {
  createInquiry,
  listInquiries,
  getInquiryById,
  updateInquiryStatus,
  deleteInquiry,
};
