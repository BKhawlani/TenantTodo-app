/*
  Warnings:

  - You are about to drop the column `tenantId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `accountType` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Tenant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TenantUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_tenantId_fkey";

-- DropForeignKey
ALTER TABLE "TenantUser" DROP CONSTRAINT "TenantUser_tenantId_fkey";

-- DropForeignKey
ALTER TABLE "TenantUser" DROP CONSTRAINT "TenantUser_userId_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "tenantId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "accountType";

-- DropTable
DROP TABLE "Tenant";

-- DropTable
DROP TABLE "TenantUser";
