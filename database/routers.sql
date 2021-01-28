-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1:3307
-- Thời gian đã tạo: Th1 28, 2021 lúc 05:04 AM
-- Phiên bản máy phục vụ: 10.3.23-MariaDB
-- Phiên bản PHP: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `routers`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `idCategory` int(10) NOT NULL AUTO_INCREMENT,
  `nameCategory` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`idCategory`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`idCategory`, `nameCategory`) VALUES
(4, 'Router hai rÃ¢u'),
(5, 'BÄƒng táº§n kÃ©p');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `producers`
--

DROP TABLE IF EXISTS `producers`;
CREATE TABLE IF NOT EXISTS `producers` (
  `idProducer` int(10) NOT NULL AUTO_INCREMENT,
  `nameProducer` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phoneProducer` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `addressProducer` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `yearProducer` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`idProducer`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `producers`
--

INSERT INTO `producers` (`idProducer`, `nameProducer`, `phoneProducer`, `addressProducer`, `yearProducer`) VALUES
(3, 'Totolink', '0987345267', '23 Hai BÃ  TrÆ°ng, Quáº­n 1', '23/10/1990'),
(4, 'Xiaomi', '0978234156', '128 Tháº£o Äiá»n, Quáº­n 2', '12/12/2010');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `idRouter` int(10) NOT NULL AUTO_INCREMENT,
  `nameRouter` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `yearRouter` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `addressRouter` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `maLoaiRouter` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL,
  `maNsxRouter` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL,
  `infoRouter` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `emailUser` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dayPost` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`idRouter`),
  KEY `maLoaiRouter` (`maLoaiRouter`),
  KEY `maNsxRouter` (`maNsxRouter`),
  KEY `emailUser` (`emailUser`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`idRouter`, `nameRouter`, `yearRouter`, `addressRouter`, `maLoaiRouter`, `maNsxRouter`, `infoRouter`, `emailUser`, `dayPost`) VALUES
(7, 'Router Wifi Xiaomi Gen 4C', '12/12/2019', 'Trung Quoc', '5', '4', 'Router wifi Xiaomi Gen 4C - Thiáº¿t káº¿ nhá» gá»n, bá»n bá»‰ vÃ  kháº£ nÄƒng káº¿t ná»‘i rá»™ng lá»›n.', 'vinh@gmail.com', '23/01/2021'),
(8, 'Router Wifi Xiaomi Gen 3', '23/03/2018', 'Trung Quoc', '5', '4', 'Best router', 'hang@gmail.com', '23/01/2021');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nameUser` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `passwordUser` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `gender` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`email`, `nameUser`, `phone`, `passwordUser`, `gender`) VALUES
('vinh@gmail.com', 'Nguyá»…n ÄÃ¬nh Vinh', '0976541951', '202cb962ac59075b964b07152d234b70', 'Nam'),
('admin', 'admin', '0976541951', '202cb962ac59075b964b07152d234b70', ''),
('hang@gmail.com', 'Tráº§n Thá»‹ Háº±ng', '0988765432', '202cb962ac59075b964b07152d234b70', 'Ná»¯');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
