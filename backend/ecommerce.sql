CREATE DATABASE IF NOT EXISTS `emercado`;
USE `emercado`;

-- Crea tabla carts
CREATE TABLE IF NOT EXISTS `carts` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `currency` varchar(50) DEFAULT NULL,
  `cantProduct` int(11) DEFAULT NULL,
  `shipmentType` varchar(50) DEFAULT NULL,
  `products` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`products`)),
  PRIMARY KEY (`id_user`),
  KEY `id_user` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;


-- Crea tabla categories
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(100) NOT NULL,
  `productCount` varchar(50) NOT NULL,
  `imgID` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `imgID` (`imgID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Crea tabla comments
CREATE TABLE IF NOT EXISTS `comments` (
  `product_Id` int(11) NOT NULL,
  `score` int(11) NOT NULL,
  `description` varchar(100) NOT NULL DEFAULT '',
  `user` varchar(50) NOT NULL DEFAULT '',
  `dateTime` varchar(100) NOT NULL DEFAULT '',
  KEY `product_ID` (`product_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Crea tabla images
CREATE TABLE IF NOT EXISTS `images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_product` int(11) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL,
  `id_cat` int(11) DEFAULT NULL,
  `ruta` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_producto` (`id_product`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Crea tabla products
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(200) NOT NULL,
  `cost` int(11) NOT NULL DEFAULT 0,
  `currency` varchar(5) NOT NULL DEFAULT '0',
  `soldCount` int(11) NOT NULL DEFAULT 0,
  `category` varchar(50) NOT NULL DEFAULT '0',
  `relatedProducts` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`relatedProducts`)),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- users
CREATE TABLE IF NOT EXISTS `users` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `lastName` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(50) NOT NULL,
  `phoneNumber` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_user`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;