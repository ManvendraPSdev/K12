-- ==============================================================================
-- EdTech CRM & Inquiry Management System
-- Database Schema SQL (PostgreSQL / Supabase compatible)
--
-- NOTE FOR EVALUATOR / ASSESSMENT SETUP:
-- This file is provided for reference and assessment evaluation.
-- In this project, database schema migrations are managed via Prisma ORM:
--   - Production / CI deployment: npx prisma migrate deploy
--   - Local development:          npx prisma migrate dev
-- Existing migrations: be/prisma/migrations/20261030045256_init/
-- ==============================================================================

-- 1. Custom Enum Types
CREATE TYPE "user_type" AS ENUM (
    'PARENT',
    'STUDENT',
    'SCHOOL'
);

CREATE TYPE "inquiry_category" AS ENUM (
    'SCHOLARSHIP',
    'CONCERT',
    'ADMISSION',
    'GENERAL_QUERY'
);

CREATE TYPE "inquiry_status" AS ENUM (
    'PENDING',
    'IN_PROGRESS',
    'RESOLVED'
);

-- 2. Administrators Table
CREATE TABLE "admins" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- 3. Inquiries Table
CREATE TABLE "inquiries" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "user_type" "user_type" NOT NULL,
    "category" "inquiry_category" NOT NULL,
    "message" TEXT NOT NULL,
    "status" "inquiry_status" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "inquiries_pkey" PRIMARY KEY ("id")
);

-- 4. Unique Constraints & Indexes
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");

CREATE INDEX "inquiries_category_idx" ON "inquiries"("category");
CREATE INDEX "inquiries_user_type_idx" ON "inquiries"("user_type");
CREATE INDEX "inquiries_status_idx" ON "inquiries"("status");
CREATE INDEX "inquiries_created_at_idx" ON "inquiries"("created_at");
