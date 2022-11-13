/*
  Warnings:

  - You are about to drop the column `main_id` on the `comment` table. All the data in the column will be lost.
  - Added the required column `level` to the `comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `comment` DROP COLUMN `main_id`,
    ADD COLUMN `level` ENUM('ROOT', 'HIGH', 'LOW') NOT NULL;
