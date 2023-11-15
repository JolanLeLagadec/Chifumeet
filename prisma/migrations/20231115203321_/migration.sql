/*
  Warnings:

  - You are about to drop the column `hasNotification` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "hasNotification";

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userSenderId_fkey" FOREIGN KEY ("userSenderId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
