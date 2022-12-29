/*
  Warnings:

  - You are about to drop the column `ipAdress` on the `comment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `comment` DROP COLUMN `ipAdress`,
    ADD COLUMN `ipAddress` VARCHAR(191) NULL;
