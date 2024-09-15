/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Blog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "updatedAt",
ADD COLUMN     "updatedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
