/*
  Warnings:

  - You are about to drop the column `userId` on the `Location` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_userId_fkey";

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "locationId" INTEGER;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;
