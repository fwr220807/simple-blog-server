/*
  Warnings:

  - You are about to drop the column `view` on the `article` table. All the data in the column will be lost.
  - Added the required column `commentCount` to the `article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `viewCount` to the `article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `article` DROP COLUMN `view`,
    ADD COLUMN `commentCount` INTEGER NOT NULL,
    ADD COLUMN `viewCount` INTEGER NOT NULL;
