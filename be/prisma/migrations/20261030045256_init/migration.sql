-- CreateEnum
CREATE TYPE "user_type" AS ENUM ('PARENT', 'STUDENT', 'SCHOOL');

-- CreateEnum
CREATE TYPE "inquiry_category" AS ENUM ('SCHOLARSHIP', 'CONCERT', 'ADMISSION', 'GENERAL_QUERY');

-- CreateEnum
CREATE TYPE "inquiry_status" AS ENUM ('PENDING', 'IN_PROGRESS', 'RESOLVED');

-- CreateTable
CREATE TABLE "admins" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inquiries" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "user_type" "user_type" NOT NULL,
    "category" "inquiry_category" NOT NULL,
    "message" TEXT NOT NULL,
    "status" "inquiry_status" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inquiries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");

-- CreateIndex
CREATE INDEX "inquiries_category_idx" ON "inquiries"("category");

-- CreateIndex
CREATE INDEX "inquiries_user_type_idx" ON "inquiries"("user_type");

-- CreateIndex
CREATE INDEX "inquiries_status_idx" ON "inquiries"("status");

-- CreateIndex
CREATE INDEX "inquiries_created_at_idx" ON "inquiries"("created_at");
