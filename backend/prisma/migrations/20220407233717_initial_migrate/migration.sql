-- CreateTable
CREATE TABLE `Person` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cpf` VARCHAR(14) NOT NULL,
    `name` VARCHAR(80) NOT NULL,
    `nick` VARCHAR(80) NOT NULL,
    `gender` VARCHAR(20) NOT NULL,
    `phone` VARCHAR(15) NOT NULL,
    `address` VARCHAR(80) NOT NULL,
    `observations` VARCHAR(100) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Person_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
