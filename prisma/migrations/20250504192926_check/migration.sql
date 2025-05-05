/*
  Warnings:

  - Added the required column `event_category` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `events` DROP FOREIGN KEY `events_organizer_id_fkey`;

-- AlterTable
ALTER TABLE `events` ADD COLUMN `event_category` ENUM('Team', 'Individual') NOT NULL;

-- RenameIndex
ALTER TABLE `events` RENAME INDEX `events_organizer_id_fkey` TO `organizer_id`;
