-- CreateTable
CREATE TABLE `events` (
    `event_id` VARCHAR(10) NOT NULL,
    `event_name` VARCHAR(150) NOT NULL,
    `event_type` VARCHAR(100) NOT NULL,
    `date` DATE NOT NULL,
    `location` VARCHAR(200) NOT NULL,
    `status` ENUM('Upcoming', 'Ongoing', 'Completed') NOT NULL,
    `organizer_id` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`event_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `participants` (
    `participant_id` VARCHAR(10) NOT NULL,
    `user_id` VARCHAR(10) NOT NULL,
    `event_id` VARCHAR(10) NOT NULL,
    `age` INTEGER NULL,
    `team_name` VARCHAR(100) NULL,
    `status` ENUM('Registered', 'Active', 'Disqualified') NOT NULL,

    INDEX `event_id`(`event_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`participant_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `results` (
    `result_id` VARCHAR(10) NOT NULL,
    `event_id` VARCHAR(10) NOT NULL,
    `participant_id` VARCHAR(10) NOT NULL,
    `score` INTEGER NULL,
    `rank` INTEGER NULL,
    `winner_status` ENUM('Winner', 'Runner-up', 'Eliminated') NOT NULL,

    INDEX `event_id`(`event_id`),
    INDEX `participant_id`(`participant_id`),
    PRIMARY KEY (`result_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `schedules` (
    `schedule_id` VARCHAR(10) NOT NULL,
    `event_id` VARCHAR(10) NOT NULL,
    `match_time` TIME(0) NOT NULL,
    `venue` VARCHAR(200) NOT NULL,
    `round` ENUM('Quarterfinal', 'Semifinal', 'Final', 'FP1', 'FP2', 'FP3', 'Q1', 'Q2', 'Q3', 'Race Day') NOT NULL,

    INDEX `event_id`(`event_id`),
    PRIMARY KEY (`schedule_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `user_id` VARCHAR(10) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `user_type` ENUM('Admin', 'Participant', 'Organizer') NOT NULL,

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `events` ADD CONSTRAINT `events_organizer_id_fkey` FOREIGN KEY (`organizer_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
