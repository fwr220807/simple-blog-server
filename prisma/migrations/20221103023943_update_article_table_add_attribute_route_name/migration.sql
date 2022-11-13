/*
  Warnings:

  - A unique constraint covering the columns `[routeName]` on the table `article` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[routeName]` on the table `category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `routeName` to the `article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `article` ADD COLUMN `routeName` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `article_routeName_key` ON `article`(`routeName`);

-- CreateIndex
CREATE UNIQUE INDEX `category_routeName_key` ON `category`(`routeName`);
