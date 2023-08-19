-- AlterTable
ALTER TABLE `Companion` MODIFY `name` TEXT NOT NULL,
    MODIFY `instructions` TEXT NOT NULL,
    MODIFY `seed` TEXT NOT NULL;

-- CreateIndex
CREATE FULLTEXT INDEX `Companion_name_idx` ON `Companion`(`name`);
