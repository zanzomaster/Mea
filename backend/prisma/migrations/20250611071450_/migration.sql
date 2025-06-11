/*
  Warnings:

  - You are about to drop the column `userId` on the `Internship` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Internship" DROP CONSTRAINT "Internship_userId_fkey";

-- AlterTable
ALTER TABLE "Internship" DROP COLUMN "userId";
