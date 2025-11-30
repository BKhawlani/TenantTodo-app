/*
  Warnings:

  - You are about to drop the column `sharedFrom` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the `TaskShareInvite` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TaskShareInvite" DROP CONSTRAINT "TaskShareInvite_taskId_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "sharedFrom";

-- DropTable
DROP TABLE "TaskShareInvite";
