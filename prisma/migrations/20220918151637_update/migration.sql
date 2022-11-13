-- AlterTable
ALTER TABLE `article` MODIFY `commentCount` INTEGER NOT NULL DEFAULT 0,
    MODIFY `viewCount` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `comment` MODIFY `audit` BOOLEAN NOT NULL DEFAULT false;
