-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 07, 2024 at 10:51 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

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
-- Table structure for table `administrator`
--

CREATE TABLE `administrator` (
  `id` int(11) NOT NULL,
  `admin_id` int(10) DEFAULT NULL,
  `fname` varchar(20) DEFAULT NULL,
  `lname` varchar(20) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `confirm_password` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `administrator`
--

INSERT INTO `administrator` (`id`, `admin_id`, `fname`, `lname`, `password`, `confirm_password`) VALUES
(1, 2121146042, 'Tamim', 'Haque', '1234ab', '1234ab');

-- --------------------------------------------------------

--
-- Table structure for table `candidate`
--

CREATE TABLE `candidate` (
  `id` int(11) NOT NULL,
  `nid_no` varchar(10) NOT NULL,
  `fname` varchar(20) NOT NULL,
  `lname` varchar(20) NOT NULL,
  `ward` varchar(100) NOT NULL,
  `city` varchar(50) NOT NULL,
  `profile_picture` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `candidate`
--

INSERT INTO `candidate` (`id`, `nid_no`, `fname`, `lname`, `ward`, `city`, `profile_picture`) VALUES
(1, '1234567890', 'John', 'Doe', '3', 'Dhaka', NULL),
(2, '2121146042', 'Tamim', 'Haque', '3', 'Dhaka', '1728331423915.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `voter`
--

CREATE TABLE `voter` (
  `id` int(11) NOT NULL,
  `fname` varchar(50) DEFAULT NULL,
  `lname` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `father_name` varchar(100) DEFAULT NULL,
  `mother_name` varchar(100) DEFAULT NULL,
  `nid_no` bigint(20) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `blood_group` varchar(5) DEFAULT NULL,
  `home` int(3) DEFAULT NULL,
  `ward` varchar(255) DEFAULT NULL,
  `post_office` varchar(50) DEFAULT NULL,
  `postal_code` int(4) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `phone_number` varchar(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `voter`
--

INSERT INTO `voter` (`id`, `fname`, `lname`, `email`, `gender`, `father_name`, `mother_name`, `nid_no`, `dob`, `blood_group`, `home`, `ward`, `post_office`, `postal_code`, `city`, `country`, `password`, `profile_picture`, `created_at`, `phone_number`) VALUES
(1, 'grsgf', 'frvsrf', 'sefdaf2gmail.com', 'male', 'dfvfd', 'fvsxzv', 2121146, '2024-10-16', 'O+', 0, '0', 'dvsz', 0, 'Dhaka', 'dv', '$2b$10$6.e7yAm6TrPyTMoA05clpuavjdY4g1bKQf74QPzJ9VYze9OKAc6zq', NULL, '2024-10-04 19:44:15', NULL),
(2, 'bthdtc', 'dfgbh', 'dfgv', 'male', 'fgv', 'fgzv', 2147483647, '2024-10-13', 'O+', 3, '3', 'sfzvg', 1207, 'Dhaka', 'vgxdf', '$2b$10$N/7U/Uwo6o5aKyQnqK0XFeiVRUcB1hEYIbYtrkp4xMO0sBLqhYLpy', NULL, '2024-10-04 20:18:01', NULL),
(16, 'John', 'Doe', 'john@example.com', 'male', 'Father Name', 'Mother Name', 1234567890123, '1990-01-01', 'A+', 12, '5', 'Post Office', 1234, 'Dhaka', 'Bangladesh', 'hashedPassword', 'uploads/12345.jpg', '2024-10-05 07:28:13', '01234567890'),
(20, 'gfbn', 'gb', 'bgh', 'male', 'gdb', 'fgb', 2121146042204, '2024-10-21', 'O+', 3, '3', 'df', 1207, 'Dhaka', 'dfgh', '$2b$10$rJPY4W8pbwuRyh4wzSoiL.Oo8VG8y/JFrJkYq5ROLLoSX/9dYhk2e', 'uploads\\1728120989439.jpg', '2024-10-05 09:36:29', '01929487006'),
(21, 'gffdxg', 'fxg', 'fxg', 'male', 'fgx', 'fxg', 2121146042205, '2024-10-24', 'O+', 3, '3', 'dzxv', 1207, 'Dhaka', 'sdzf', '$2b$10$xfCA4qH2ZhsmmgOx88XaQumdghqH101VTc79ctqgDAGRj/6E6qjfO', 'uploads\\1728152596327.jpg', '2024-10-05 09:37:39', '01929487007'),
(24, 'TAMIM', 'HAQUE', 'dfsd', 'male', 'sdgvs', 'sdz', 2121146042202, '2024-10-05', 'O+', 3, '3', 'gf', 1207, 'Dhaka', 'bng', '$2b$10$GDFuYhblrqU4tuhAxNCaiOzu31WdOlTNsCxBc1ByPERf.H50LwMg6', 'uploads\\1728152596327.jpg', '2024-10-05 18:23:16', '01929487008'),
(25, 'fxb', 'xcb x', 'xvcb ', 'male', 'xvb ', 'vx', 2121146042207, '2024-10-02', 'O+', 22, '2', '222', 1234, 'Dhaka', 'sdg', '$2b$10$gMl5.Djg1LsqjlELz7TgvuICpR0.tawF1w/bRiJPfsv30aVSosCw6', 'C:\\Users\\USER\\Desktop\\Digital_Democracy\\backend\\uploads\\1728152746115.jpg', '2024-10-05 18:25:46', '01932778621'),
(34, 'fgf', 'bfx', 'fxb', 'male', 'fbx', 'fbx', 1234567891011, '2024-10-10', 'O+', 3, '3', '33', 1234, 'Dhaka', 'rtfy', '$2b$10$j3ZG3tP/uYZ0TqR8qzwq4eHy8jc94gHSAa9OmDO7ZF3FgoiO/FI0C', 'C:\\Users\\USER\\Desktop\\Digital_Democracy\\backend\\uploads\\1728153031702.jpg', '2024-10-05 18:30:31', '01932778628'),
(35, 'rsgv', 'fgxd', 'fxdb', 'male', 'sdvs', 'dvx', 2121146042200, '2024-10-05', 'AB-', 3, '3', '3333', 3333, 'Dhaka', '3333', '$2b$10$3tE0sRSUoHEsD5m4/iXCW.bkaJo3yLKnCTq12sjXV/Z3IMIWRSddu', 'C:\\Users\\USER\\Desktop\\Digital_Democracy\\backend\\uploads\\1728153687884.jpg', '2024-10-05 18:41:27', '01929487000'),
(36, 'sfgv', 'fgsxz', 'sfxvsx', 'male', 'sZDC', 'dzsV', 2121146042209, '2024-10-02', 'A-', 3, '3', '3333', 3333, 'Dhaka', '333', '$2b$10$15GRV4uF4m3TNPaEz4ukAu6kzLO1dqEEdQDAcbLivNeofQwv.v2z.', 'C:\\Users\\USER\\Desktop\\Digital_Democracy\\backend\\uploads\\1728153839292.jpg', '2024-10-05 18:43:59', '01932778622'),
(41, 'Hamim', 'haque', 'srfgsz', 'male', 'ghbxd', 'dfgdx', 2121146542, '2024-10-02', 'AB+', 3, '3', 'bmb', 1207, 'Dhaka', 'vgnc', '$2b$10$afGlnmoc5l0gO6ZhtfAo4uq0juSiem3b3.lKDTAiZTZUa42AC/hAm', 'uploads\\1728324903667.jpg', '2024-10-07 18:15:03', '01813075310');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `administrator`
--
ALTER TABLE `administrator`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `admin_id` (`admin_id`);

--
-- Indexes for table `candidate`
--
ALTER TABLE `candidate`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nid_no` (`nid_no`),
  ADD KEY `fk_city` (`city`),
  ADD KEY `fk_ward` (`ward`);

--
-- Indexes for table `voter`
--
ALTER TABLE `voter`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nid_no` (`nid_no`),
  ADD UNIQUE KEY `nid_no_2` (`nid_no`),
  ADD UNIQUE KEY `phone_number` (`phone_number`),
  ADD KEY `idx_city` (`city`),
  ADD KEY `idx_ward` (`ward`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `administrator`
--
ALTER TABLE `administrator`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `candidate`
--
ALTER TABLE `candidate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `voter`
--
ALTER TABLE `voter`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `candidate`
--
ALTER TABLE `candidate`
  ADD CONSTRAINT `fk_city` FOREIGN KEY (`city`) REFERENCES `voter` (`city`),
  ADD CONSTRAINT `fk_ward` FOREIGN KEY (`ward`) REFERENCES `voter` (`ward`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
