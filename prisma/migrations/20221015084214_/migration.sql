/*
  Warnings:

  - You are about to drop the column `secondaryParentId` on the `comment` table. All the data in the column will be lost.
  - Added the required column `level` to the `comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `comment` DROP COLUMN `secondaryParentId`,
    ADD COLUMN `level` VARCHAR(191) NOT NULL,
    ADD COLUMN `show` BOOLEAN NOT NULL DEFAULT false;
