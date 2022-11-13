/*
  Warnings:

  - Added the required column `describe` to the `category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `category` ADD COLUMN `describe` VARCHAR(191) NOT NULL;
