-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 06, 2024 at 02:41 PM
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
-- Database: `digitaldemocracy`
--

-- --------------------------------------------------------

--
-- Table structure for table `voter`
--

CREATE TABLE `voter` (
  `id` int(11) NOT NULL,
  `fname` varchar(50) NOT NULL,
  `lname` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `father_name` varchar(50) NOT NULL,
  `mother_name` varchar(50) NOT NULL,
  `nid_no` int(10) NOT NULL,
  `dob` date NOT NULL,
  `blood_group` varchar(5) NOT NULL,
  `home` int(3) NOT NULL,
  `road` int(3) NOT NULL,
  `post_office` varchar(50) NOT NULL,
  `postal_code` int(4) NOT NULL,
  `city` varchar(50) NOT NULL,
  `country` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `phone_number` varchar(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `voter`
--

INSERT INTO `voter` (`id`, `fname`, `lname`, `email`, `gender`, `father_name`, `mother_name`, `nid_no`, `dob`, `blood_group`, `home`, `road`, `post_office`, `postal_code`, `city`, `country`, `password`, `profile_picture`, `phone_number`) VALUES
(1, 'sdvc', 'dvs', 'sdvcz', 'male', 'sdzjvcnsvjkn', 'sdfvhcbs', 2121146042, '2024-10-01', 'O+', 3, 3, 'mohakhali', 1207, 'Dhaka', 'bng', '$2b$10$sM2PJKiIhh7rTXLqCbkzqOam0WIkJKigPsR.Azy3FdvZQVLSaMay.', 'uploads/1728183115082.jpg', '01929487008'),
(2, 'sdnc', 'sdjkbv', 'kdshvb', 'male', 'dvc', 'sdv', 2121146642, '2024-09-27', 'B+', 2, 2, 'dvs', 1234, 'Dhaka', 'bng', '$2b$10$2SVASjrr9vJaW6eCuD8o3eF1Vbg.58f9sKDCNAYjq2t2rkAPtygUW', 'uploads/1728183328472.jpg', '01929487008');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `voter`
--
ALTER TABLE `voter`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nid_no` (`nid_no`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `voter`
--
ALTER TABLE `voter`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
