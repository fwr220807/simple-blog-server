/*
  Warnings:

  - You are about to drop the column `level_id` on the `comment` table. All the data in the column will be lost.
  - You are about to drop the column `parent_id` on the `comment` table. All the data in the column will be lost.
  - Added the required column `parentId` to the `comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secondaryParentId` to the `comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `comment` DROP COLUMN `level_id`,
    DROP COLUMN `parent_id`,
    ADD COLUMN `parentId` INTEGER NOT NULL,
    ADD COLUMN `secondaryParentId` INTEGER NOT NULL;
