/*
  Warnings:

  - Made the column `secondaryParentId` on table `comment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `comment` MODIFY `secondaryParentId` INTEGER NOT NULL;
