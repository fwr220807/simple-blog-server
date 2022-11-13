/*
  Warnings:

  - Added the required column `routeName` to the `category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `category` ADD COLUMN `routeName` VARCHAR(191) NOT NULL;
