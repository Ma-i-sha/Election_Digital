-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 03, 2024 at 04:42 PM
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
-- Table structure for table `administrator`
--

CREATE TABLE `administrator` (
  `id` int(11) NOT NULL,
  `admin_id` int(10) DEFAULT NULL,
  `fname` varchar(20) DEFAULT NULL,
  `lname` varchar(20) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `confirm_password` varchar(20) DEFAULT NULL,
  `result` tinyint(1) NOT NULL DEFAULT 0 CHECK (`result` in (0,1))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `administrator`
--

INSERT INTO `administrator` (`id`, `admin_id`, `fname`, `lname`, `password`, `confirm_password`, `result`) VALUES
(1, 2121146042, 'Tamim', 'Haque', '1234ab', '1234ab', 1);

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
  `profile_picture` varchar(255) DEFAULT NULL,
  `vote_count` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `candidate`
--

INSERT INTO `candidate` (`id`, `nid_no`, `fname`, `lname`, `ward`, `city`, `profile_picture`, `vote_count`) VALUES
(1, '1234567890', 'John', 'Doe', '3', 'Dhaka', NULL, 0),
(2, '2121146642', 'Yamim', 'Haque', '3', 'DhakA', 'uploads\\1728331423915.jpg', 0),
(8, '2121146042', 'QAMIM', 'HAQUE', '3', 'Dhaka', 'uploads\\1728844927030.jpg', 0),
(10, '2121146542', 'tamim', 'haque', '3', 'Dhaka', 'uploads\\1728898413163.jpg', 0),
(12, '2121146842', 'TAMIM', 'HASAN', '2', 'Dhaka', 'uploads\\1728920414245.jpg', 0),
(13, '2121146942', 'RAFAT', 'HAQUE', '2', 'Dhaka', 'uploads\\1728920500234.jpg', 1),
(14, '2121146742', 'EAMIM', 'HASAN', '3', 'Dhaka', 'uploads\\1728929536649.jpg', 0),
(15, '2131748043', 'SUDIPTO', 'SARKER', '3', 'Dhaka', 'uploads\\1728969873457.jpg', 1);

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
  `phone_number` varchar(11) DEFAULT NULL,
  `vote_given` tinyint(1) NOT NULL DEFAULT 0 CHECK (`vote_given` in (0,1))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `voter`
--

INSERT INTO `voter` (`id`, `fname`, `lname`, `email`, `gender`, `father_name`, `mother_name`, `nid_no`, `dob`, `blood_group`, `home`, `ward`, `post_office`, `postal_code`, `city`, `country`, `password`, `profile_picture`, `created_at`, `phone_number`, `vote_given`) VALUES
(1, 'grsgf', 'frvsrf', 'sefdaf2gmail.com', 'male', 'dfvfd', 'fvsxzv', 2121146, '2024-10-16', 'O+', 0, '0', 'dvsz', 0, 'Dhaka', 'dv', '$2b$10$6.e7yAm6TrPyTMoA05clpuavjdY4g1bKQf74QPzJ9VYze9OKAc6zq', NULL, '2024-10-04 19:44:15', NULL, 0),
(2, 'bthdtc', 'dfgbh', 'dfgv', 'male', 'fgv', 'fgzv', 2147483647, '2024-10-13', 'O+', 3, '3', 'sfzvg', 1207, 'Dhaka', 'vgxdf', '$2b$10$N/7U/Uwo6o5aKyQnqK0XFeiVRUcB1hEYIbYtrkp4xMO0sBLqhYLpy', NULL, '2024-10-04 20:18:01', NULL, 0),
(16, 'John', 'Doe', 'john@example.com', 'male', 'Father Name', 'Mother Name', 1234567890123, '1990-01-01', 'A+', 12, '5', 'Post Office', 1234, 'Dhaka', 'Bangladesh', 'hashedPassword', 'uploads/12345.jpg', '2024-10-05 07:28:13', '01234567890', 0),
(20, 'gfbn', 'gb', 'bgh', 'male', 'gdb', 'fgb', 2121146742, '2024-10-21', 'O+', 3, '3', 'df', 1207, 'Dhaka', 'dfgh', '$2b$10$rJPY4W8pbwuRyh4wzSoiL.Oo8VG8y/JFrJkYq5ROLLoSX/9dYhk2e', 'uploads\\1728120989439.jpg', '2024-10-05 09:36:29', '01929487006', 0),
(21, 'gffdxg', 'fxg', 'fxg', 'male', 'fgx', 'fxg', 2121146042205, '2024-10-24', 'O+', 3, '3', 'dzxv', 1207, 'Dhaka', 'sdzf', '$2b$10$xfCA4qH2ZhsmmgOx88XaQumdghqH101VTc79ctqgDAGRj/6E6qjfO', 'uploads\\1728152596327.jpg', '2024-10-05 09:37:39', '01929487007', 0),
(25, 'fxb', 'xcb x', 'xvcb ', 'male', 'xvb ', 'vx', 2121146042207, '2024-10-02', 'O+', 22, '2', '222', 1234, 'Dhaka', 'sdg', '$2b$10$gMl5.Djg1LsqjlELz7TgvuICpR0.tawF1w/bRiJPfsv30aVSosCw6', 'C:\\Users\\USER\\Desktop\\Digital_Democracy\\backend\\uploads\\1728152746115.jpg', '2024-10-05 18:25:46', '01932778621', 0),
(34, 'fgf', 'bfx', 'fxb', 'male', 'fbx', 'fbx', 1234567891011, '2024-10-10', 'O+', 3, '3', '33', 1234, 'Dhaka', 'rtfy', '$2b$10$j3ZG3tP/uYZ0TqR8qzwq4eHy8jc94gHSAa9OmDO7ZF3FgoiO/FI0C', 'C:\\Users\\USER\\Desktop\\Digital_Democracy\\backend\\uploads\\1728153031702.jpg', '2024-10-05 18:30:31', '01932778628', 0),
(35, 'rsgv', 'fgxd', 'fxdb', 'male', 'sdvs', 'dvx', 2121146042200, '2024-10-05', 'AB-', 3, '3', '3333', 3333, 'Dhaka', '3333', '$2b$10$3tE0sRSUoHEsD5m4/iXCW.bkaJo3yLKnCTq12sjXV/Z3IMIWRSddu', 'C:\\Users\\USER\\Desktop\\Digital_Democracy\\backend\\uploads\\1728153687884.jpg', '2024-10-05 18:41:27', '01929487000', 0),
(36, 'sfgv', 'fgsxz', 'sfxvsx', 'male', 'sZDC', 'dzsV', 2121146042209, '2024-10-02', 'A-', 3, '3', '3333', 3333, 'Dhaka', '333', '$2b$10$15GRV4uF4m3TNPaEz4ukAu6kzLO1dqEEdQDAcbLivNeofQwv.v2z.', 'C:\\Users\\USER\\Desktop\\Digital_Democracy\\backend\\uploads\\1728153839292.jpg', '2024-10-05 18:43:59', '01932778622', 0),
(41, 'Hamim', 'haque', 'srfgsz', 'male', 'ghbxd', 'dfgdx', 2121146542, '2024-10-02', 'AB+', 3, '3', 'bmb', 1207, 'Dhaka', 'vgnc', '$2b$10$afGlnmoc5l0gO6ZhtfAo4uq0juSiem3b3.lKDTAiZTZUa42AC/hAm', 'uploads\\1728324903667.jpg', '2024-10-07 18:15:03', '01813075310', 0),
(42, 'TAMIM', 'HAQUE', 'tamim@gmail.com', 'male', 'muxa', 'sul', 2121146042, '2024-09-01', 'O+', 3, '3', 'mirpur', 1207, 'Dhaka', 'bng', '$2b$10$Xkm.IJ0XXqv8Brizv6SAXu9RFO4SxbF7QIBsWSJxQYfChJr9CJDpu', 'uploads\\1728838202268.jpg', '2024-10-13 16:50:02', '01813074310', 0),
(43, 'TAMIM', 'HASAN', '@gmail.com', 'male', 'MUXA', 'SUTANA', 2121146642, '2024-09-03', 'O+', 3, '2', 'MIRPUR', 1208, 'Dhaka', 'BANGLADESH', '$2b$10$3HLFfBw9mmem1C8OfvyUN.jUIjB27ChP1tdbz3DIS5XqWDNZKo1y6', 'uploads\\1728929814184.jpg', '2024-10-14 18:16:54', '01929487008', 1);

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
  ADD UNIQUE KEY `nid_no` (`nid_no`);

--
-- Indexes for table `voter`
--
ALTER TABLE `voter`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nid_no` (`nid_no`),
  ADD UNIQUE KEY `nid_no_2` (`nid_no`),
  ADD UNIQUE KEY `phone_number` (`phone_number`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `voter`
--
ALTER TABLE `voter`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
