-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 05, 2023 at 01:23 PM
-- Server version: 10.6.12-MariaDB-0ubuntu0.22.04.1
-- PHP Version: 8.1.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `s2669_ClientOnBoardDevDB`
--

-- --------------------------------------------------------

--
-- Table structure for table `Test`
--

CREATE TABLE `Test` (
  `TestID` int(11) NOT NULL,
  `Title` varchar(255) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `Description` varchar(255) NOT NULL,
  `Status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `TestBoard`
--

CREATE TABLE `TestBoard` (
  `BoardID` int(255) NOT NULL,
  `Title` varchar(255) NOT NULL,
  `Date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `TestBoardUsers`
--

CREATE TABLE `TestBoardUsers` (
  `BoardID` int(255) NOT NULL,
  `UserID` int(255) NOT NULL,
  `Role` varchar(16) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Testing`
--

CREATE TABLE `Testing` (
  `BoardID` int(255) NOT NULL,
  `TestID` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `TestStep`
--

CREATE TABLE `TestStep` (
  `TestID` int(255) NOT NULL,
  `StepNR` int(255) NOT NULL,
  `Title` varchar(255) NOT NULL,
  `UserID` int(255) NOT NULL,
  `Description` varchar(255) NOT NULL,
  `TestLog` varchar(255) NOT NULL,
  `Weight` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `UserID` int(255) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Test`
--
ALTER TABLE `Test`
  ADD PRIMARY KEY (`TestID`);

--
-- Indexes for table `TestBoard`
--
ALTER TABLE `TestBoard`
  ADD PRIMARY KEY (`BoardID`);

--
-- Indexes for table `TestBoardUsers`
--
ALTER TABLE `TestBoardUsers`
  ADD KEY `BoardID` (`BoardID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indexes for table `Testing`
--
ALTER TABLE `Testing`
  ADD KEY `BoardID` (`BoardID`),
  ADD KEY `TestID` (`TestID`);

--
-- Indexes for table `TestStep`
--
ALTER TABLE `TestStep`
  ADD PRIMARY KEY (`StepNR`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `TestID` (`TestID`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`UserID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Test`
--
ALTER TABLE `Test`
  MODIFY `TestID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `TestBoard`
--
ALTER TABLE `TestBoard`
  MODIFY `BoardID` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
  MODIFY `UserID` int(255) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `TestBoardUsers`
--
ALTER TABLE `TestBoardUsers`
  ADD CONSTRAINT `TestBoardUsers_ibfk_1` FOREIGN KEY (`BoardID`) REFERENCES `TestBoard` (`BoardID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `TestBoardUsers_ibfk_2` FOREIGN KEY (`UserID`) REFERENCES `User` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Testing`
--
ALTER TABLE `Testing`
  ADD CONSTRAINT `Testing_ibfk_1` FOREIGN KEY (`BoardID`) REFERENCES `TestBoard` (`BoardID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Testing_ibfk_2` FOREIGN KEY (`TestID`) REFERENCES `Test` (`TestID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `TestStep`
--
ALTER TABLE `TestStep`
  ADD CONSTRAINT `TestStep_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `User` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `TestStep_ibfk_2` FOREIGN KEY (`TestID`) REFERENCES `Test` (`TestID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
