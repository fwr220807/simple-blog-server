-- CreateTable
CREATE TABLE `blog` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `viewCount` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;