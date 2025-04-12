-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 06, 2025 at 09:22 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test1`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `booking_id` bigint(20) NOT NULL,
  `booking_date_time` datetime(6) DEFAULT NULL,
  `status` bit(1) DEFAULT NULL,
  `client_id` bigint(20) NOT NULL,
  `group_id` int(11) DEFAULT NULL,
  `service_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `consumers`
--

CREATE TABLE `consumers` (
  `client_id` bigint(20) NOT NULL,
  `address` text DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `email_notifications` bit(1) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  `sms_notifications` bit(1) DEFAULT NULL,
  `status` varchar(255) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `username` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `consumers`
--

INSERT INTO `consumers` (`client_id`, `address`, `bio`, `created_at`, `email`, `email_notifications`, `notes`, `password`, `phone`, `profile_image`, `sms_notifications`, `status`, `updated_at`, `username`) VALUES
(1, NULL, NULL, '2025-04-06 12:12:56.000000', 'Eranda@gmail.com', b'1', NULL, '$2a$10$RhB8CzW.hkQrwDRmLVQ7L.YqzLm95eZuwNfHv0exMICRChsZ1fjiK', NULL, NULL, b'0', 'ACTIVE', '2025-04-06 12:12:56.000000', 'Eranda Jayathissa');

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `feedback_id` bigint(20) NOT NULL,
  `comments` text DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `rating` int(11) NOT NULL,
  `consumer_id` bigint(20) DEFAULT NULL,
  `provider_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `group_booking`
--

CREATE TABLE `group_booking` (
  `group_id` int(11) NOT NULL,
  `group_name` varchar(255) DEFAULT NULL,
  `max_capacity` int(11) DEFAULT NULL,
  `no_of_members` int(11) DEFAULT NULL,
  `group_leader_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `notification_id` int(11) NOT NULL,
  `description` text DEFAULT NULL,
  `booking_id` bigint(20) NOT NULL,
  `client_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `recurring_appointment`
--

CREATE TABLE `recurring_appointment` (
  `recurrence_id` int(11) NOT NULL,
  `end_date_time` datetime(6) DEFAULT NULL,
  `recurrence_type` varchar(255) DEFAULT NULL,
  `start_date_time` datetime(6) DEFAULT NULL,
  `booking_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reminder`
--

CREATE TABLE `reminder` (
  `reminder_id` int(11) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `reminder_date_time` datetime(6) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `booking_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `schedule_id` int(11) NOT NULL,
  `date_time` datetime(6) DEFAULT NULL,
  `provider_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `service_id` int(11) NOT NULL,
  `category` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `price` double NOT NULL,
  `specialization` varchar(255) NOT NULL,
  `provider_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`service_id`, `category`, `description`, `name`, `price`, `specialization`, `provider_id`) VALUES
(1, '', 'doctor', 'Damath de Silwa', 50, 'dental', 2);

-- --------------------------------------------------------

--
-- Table structure for table `service_date_time`
--

CREATE TABLE `service_date_time` (
  `service_date_time_id` bigint(20) NOT NULL,
  `time_packages` int(11) NOT NULL,
  `work_hours_end` datetime(6) NOT NULL,
  `work_hours_start` datetime(6) NOT NULL,
  `working_days` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`working_days`)),
  `service_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `service_date_time`
--

INSERT INTO `service_date_time` (`service_date_time_id`, `time_packages`, `work_hours_end`, `work_hours_start`, `working_days`, `service_id`) VALUES
(1, 9, '2025-04-06 14:04:00.000000', '2025-04-06 08:00:00.000000', '{\"monday\":false,\"tuesday\":true,\"wednesday\":true,\"thursday\":true,\"friday\":false,\"saturday\":false,\"sunday\":false}', 1);

-- --------------------------------------------------------

--
-- Table structure for table `service_provider`
--

CREATE TABLE `service_provider` (
  `provider_id` bigint(20) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `bio` varchar(255) DEFAULT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `experience` int(11) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `is_active` bit(1) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `profile_image` text DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `service_provider`
--

INSERT INTO `service_provider` (`provider_id`, `address`, `bio`, `contact`, `email`, `experience`, `first_name`, `is_active`, `last_name`, `password`, `profile_image`, `username`) VALUES
(1, NULL, NULL, NULL, 'Thilina@email.com', NULL, NULL, NULL, NULL, '$2a$10$JGYNTRewQpbjFUD4DWFXvu/NEtkh.sCaHKxs6mQaXOfuskzmF5jAS', NULL, 'Thilina Madhushanka'),
(2, 'colombo', 'doctor', '0713528865', 'damth@gmail.com', 3, 'Damath', b'0', 'de silwa', '$2a$10$yrl9HSqbyW7xAwKj1IQSJOTFOFPyWYB5sOmPn9mME9BtXUsm4M80G', '', 'Damath de silwa'),
(3, NULL, NULL, NULL, 'induwara@gmail.com', NULL, NULL, NULL, NULL, '$2a$10$xnwAW7oxYuSxT2Je46vWbOFSr2v3lhvnexoGZqVDxZvRRPvawR9qK', NULL, 'induwara');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`booking_id`),
  ADD KEY `FK5nabf4eg18f6llhyg08yk6lfi` (`client_id`),
  ADD KEY `FKcvo4dwld4r3rjprjycubosltb` (`group_id`),
  ADD KEY `FKd6bok0hme4dnt62ldm25tgl7` (`service_id`);

--
-- Indexes for table `consumers`
--
ALTER TABLE `consumers`
  ADD PRIMARY KEY (`client_id`),
  ADD UNIQUE KEY `UK_ayhei5rt7ltp0aw86e5fl30tr` (`email`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`feedback_id`),
  ADD KEY `FKkp94swfdpsgi5qnswsv9881r7` (`consumer_id`),
  ADD KEY `FKr43b69g5fckr6eq9px9brdxru` (`provider_id`);

--
-- Indexes for table `group_booking`
--
ALTER TABLE `group_booking`
  ADD PRIMARY KEY (`group_id`),
  ADD KEY `FKmeman1kbieuiapj2d020dfmx8` (`group_leader_id`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`notification_id`),
  ADD KEY `FK2k589bvvxex5a79rt1bdhnw0r` (`booking_id`),
  ADD KEY `FKdvbglqe6rw1mwxa0qgtdililf` (`client_id`);

--
-- Indexes for table `recurring_appointment`
--
ALTER TABLE `recurring_appointment`
  ADD PRIMARY KEY (`recurrence_id`),
  ADD KEY `FKrmerg04hqpjde9mfhggepv1ml` (`booking_id`);

--
-- Indexes for table `reminder`
--
ALTER TABLE `reminder`
  ADD PRIMARY KEY (`reminder_id`),
  ADD KEY `FKdamcguilh412fq8u0gl6dg1d1` (`booking_id`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`schedule_id`),
  ADD KEY `FK9m0ec79plgvu47n725ysc8lgv` (`provider_id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`service_id`),
  ADD KEY `FKf3n4xvdfd914gkqfuxgahkiqm` (`provider_id`);

--
-- Indexes for table `service_date_time`
--
ALTER TABLE `service_date_time`
  ADD PRIMARY KEY (`service_date_time_id`),
  ADD KEY `FK28hp5t2iutmo2tg8dxd9jn9jg` (`service_id`);

--
-- Indexes for table `service_provider`
--
ALTER TABLE `service_provider`
  ADD PRIMARY KEY (`provider_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `booking_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `consumers`
--
ALTER TABLE `consumers`
  MODIFY `client_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `feedback_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `group_booking`
--
ALTER TABLE `group_booking`
  MODIFY `group_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `notification_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `recurring_appointment`
--
ALTER TABLE `recurring_appointment`
  MODIFY `recurrence_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reminder`
--
ALTER TABLE `reminder`
  MODIFY `reminder_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `schedule_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `service_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `service_date_time`
--
ALTER TABLE `service_date_time`
  MODIFY `service_date_time_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `service_provider`
--
ALTER TABLE `service_provider`
  MODIFY `provider_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `FK5nabf4eg18f6llhyg08yk6lfi` FOREIGN KEY (`client_id`) REFERENCES `consumers` (`client_id`),
  ADD CONSTRAINT `FKcvo4dwld4r3rjprjycubosltb` FOREIGN KEY (`group_id`) REFERENCES `group_booking` (`group_id`),
  ADD CONSTRAINT `FKd6bok0hme4dnt62ldm25tgl7` FOREIGN KEY (`service_id`) REFERENCES `services` (`service_id`);

--
-- Constraints for table `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `FKkp94swfdpsgi5qnswsv9881r7` FOREIGN KEY (`consumer_id`) REFERENCES `consumers` (`client_id`),
  ADD CONSTRAINT `FKr43b69g5fckr6eq9px9brdxru` FOREIGN KEY (`provider_id`) REFERENCES `service_provider` (`provider_id`);

--
-- Constraints for table `group_booking`
--
ALTER TABLE `group_booking`
  ADD CONSTRAINT `FKmeman1kbieuiapj2d020dfmx8` FOREIGN KEY (`group_leader_id`) REFERENCES `consumers` (`client_id`);

--
-- Constraints for table `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `FK2k589bvvxex5a79rt1bdhnw0r` FOREIGN KEY (`booking_id`) REFERENCES `booking` (`booking_id`),
  ADD CONSTRAINT `FKdvbglqe6rw1mwxa0qgtdililf` FOREIGN KEY (`client_id`) REFERENCES `consumers` (`client_id`);

--
-- Constraints for table `recurring_appointment`
--
ALTER TABLE `recurring_appointment`
  ADD CONSTRAINT `FKrmerg04hqpjde9mfhggepv1ml` FOREIGN KEY (`booking_id`) REFERENCES `booking` (`booking_id`);

--
-- Constraints for table `reminder`
--
ALTER TABLE `reminder`
  ADD CONSTRAINT `FKdamcguilh412fq8u0gl6dg1d1` FOREIGN KEY (`booking_id`) REFERENCES `booking` (`booking_id`);

--
-- Constraints for table `schedule`
--
ALTER TABLE `schedule`
  ADD CONSTRAINT `FK9m0ec79plgvu47n725ysc8lgv` FOREIGN KEY (`provider_id`) REFERENCES `service_provider` (`provider_id`);

--
-- Constraints for table `services`
--
ALTER TABLE `services`
  ADD CONSTRAINT `FKf3n4xvdfd914gkqfuxgahkiqm` FOREIGN KEY (`provider_id`) REFERENCES `service_provider` (`provider_id`);

--
-- Constraints for table `service_date_time`
--
ALTER TABLE `service_date_time`
  ADD CONSTRAINT `FK28hp5t2iutmo2tg8dxd9jn9jg` FOREIGN KEY (`service_id`) REFERENCES `services` (`service_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
