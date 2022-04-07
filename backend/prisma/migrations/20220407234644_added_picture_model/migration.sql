-- CreateTable
CREATE TABLE `Picture` (
    `person_id` INTEGER NOT NULL,
    `filename` VARCHAR(100) NOT NULL,
    `originalname` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`person_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Picture` ADD CONSTRAINT `Picture_person_id_fkey` FOREIGN KEY (`person_id`) REFERENCES `Person`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
