/*
  Warnings:

  - You are about to drop the column `level` on the `comment` table. All the data in the column will be lost.
  - Added the required column `level_id` to the `comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `comment` DROP COLUMN `level`,
    ADD COLUMN `level_id` INTEGER NOT NULL;
