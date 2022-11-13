/*
  Warnings:

  - Added the required column `main_id` to the `comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `comment` ADD COLUMN `main_id` INTEGER NOT NULL;
