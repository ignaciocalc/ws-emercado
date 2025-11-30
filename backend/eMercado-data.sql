-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         11.8.5-MariaDB - MariaDB Server
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.11.0.7065
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para emercado
CREATE DATABASE IF NOT EXISTS `emercado` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci */;
USE `emercado`;

-- Volcando estructura para tabla emercado.carts
CREATE TABLE IF NOT EXISTS `carts` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `currency` varchar(50) DEFAULT NULL,
  `cantProduct` int(11) DEFAULT NULL,
  `shipmentType` varchar(50) DEFAULT NULL,
  `products` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`products`)),
  PRIMARY KEY (`id_user`),
  KEY `id_user` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Volcando datos para la tabla emercado.carts: ~1 rows (aproximadamente)
REPLACE INTO `carts` (`id_user`, `currency`, `cantProduct`, `shipmentType`, `products`) VALUES
	(1, 'null', 0, 'null', 'null');

-- Volcando estructura para tabla emercado.categories
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(100) NOT NULL,
  `productCount` varchar(50) NOT NULL,
  `imgID` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `imgID` (`imgID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Volcando datos para la tabla emercado.categories: ~9 rows (aproximadamente)
REPLACE INTO `categories` (`id`, `name`, `description`, `productCount`, `imgID`) VALUES
	(101, 'Autos', 'Los mejores precios en autos 0 kilómetro, de alta y media gama.', '5', 1),
	(102, 'Juguetes', 'Encuentra aquí los mejores precios para niños/as de cualquier edad.', '4', 15),
	(103, 'Muebles', 'Muebles antiguos, nuevos y para ser armados por uno mismo.', '4', 24),
	(104, 'Herramientas', 'Herramientas para cualquier tipo de trabajo.', '0', 37),
	(105, 'Computadoras', 'Todo en cuanto a computadoras, para uso de oficina y/o juegos.', '1', 50),
	(106, 'Vestimenta', 'Gran variedad de ropa, nueva y de segunda mano.', '0', 57),
	(107, 'Electrodomésticos', 'Todos los electrodomésticos modernos y de bajo consumo.', '0', 63),
	(108, 'Deporte', 'Toda la variedad de indumentaria para todo tipo de deporte.', '0', 64),
	(109, 'Celulares', 'Celulares de todo tipo para cubrir todas las necesidades.', '0', 65);

-- Volcando estructura para tabla emercado.comments
CREATE TABLE IF NOT EXISTS `comments` (
  `product_Id` int(11) NOT NULL,
  `score` int(11) NOT NULL,
  `description` varchar(100) NOT NULL DEFAULT '',
  `user` varchar(50) NOT NULL DEFAULT '',
  `dateTime` varchar(100) NOT NULL DEFAULT '',
  KEY `product_ID` (`product_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Volcando datos para la tabla emercado.comments: ~31 rows (aproximadamente)
REPLACE INTO `comments` (`product_Id`, `score`, `description`, `user`, `dateTime`) VALUES
	(50741, 5, 'Precioso, a mi nena le encantó', 'silvia_fagundez', '2021-02-20 14:00:42'),
	(50742, 5, 'Perfecta. La que me recomendó el entrenador', 'karen_gonzalez', '2022-05-21 23:10:41'),
	(50741, 4, 'Esperaba que fuera más grande, pero es muy lindo.', 'majo_sanchez', '2021-01-11 16:26:10'),
	(50742, 4, 'Es lo que esperaba. Ahora a entrenar mucho!', 'luis_salgueiro', '2021-10-30 06:33:53'),
	(50741, 5, 'Hermoso el oso. Quedamos encantados, lo recomiendo.', 'raul_añez', '2020-12-16 19:55:19'),
	(50742, 5, 'Muy buena calidad.', 'carlos_diaz', '2020-11-02 09:28:45'),
	(50742, 5, 'Excelente. Para rememorar viejos tiempos y volver a sentirse un campeón.', 'scottie_pippen', '2019-11-09 21:15:29'),
	(50741, 1, 'Se lo regalé a mi novia para que me perdone, pero no funcionó', 'flynn_rider', '2020-02-14 23:19:09'),
	(50743, 5, 'Un lujo. Se la compré a mis hijos, pero creo que me la quedo yo.', 'saul_dominguez', '2022-04-18 13:20:56'),
	(50744, 5, 'Compra de último momento para la navidad. A mi nieto le gustó.', 'ignacio_paremon', '2021-12-24 23:59:59'),
	(50921, 3, 'Ya llevo un año con este auto y la verdad que tiene sus ventajas y desventajas', 'juan_pedro', '2020-02-25 18:03:52'),
	(50743, 5, 'Increibles los gráficos que tiene.', 'lucia_ralek', '2022-04-05 11:20:09'),
	(50922, 3, 'Es un buen auto, pero el precio me pareció algo elevado', 'ema_perez', '2022-04-05 15:29:40'),
	(50744, 2, 'Les pedí azul y me mandaron verde. La bicicleta es buena', 'mia_barboza', '2021-09-15 01:27:19'),
	(50921, 5, 'Es un auto muy cómodo y en relación precio/calidad vale la pena!', 'maria_sanchez', '2020-01-17 13:42:18'),
	(50743, 5, 'IM PRE SIO NAN TE.', 'mateo_diestre', '2022-03-21 22:38:39'),
	(50922, 5, 'Muy buen auto, vale cada centavo', 'javier_santoalla', '2021-11-15 19:32:10'),
	(50744, 3, 'Es buena, pero le faltaron las rueditas.', 'julian_surech', '2021-03-24 20:11:19'),
	(50921, 4, 'Casi todo bien!, excepto por algún detalle de gusto personal', 'paola_perez', '2020-03-14 09:05:13'),
	(50922, 5, 'Me gusta como se comporta en tierra y pista', 'gonza_rodriguez', '2020-02-21 15:05:22'),
	(50743, 5, 'Me cuesta creer lo que han avanzado las consolas', 'ralph_baer', '2022-01-04 11:16:48'),
	(50744, 4, 'Perfecta para que mis hijos vayan empezando a practicar.', 'mariana_pajon', '2021-01-18 05:22:50'),
	(50921, 5, 'Un espectáculo el auto!', 'gustavo_trelles', '2020-02-21 15:05:22'),
	(50923, 5, 'Gran opción. Bueno, bonito y barato', 'alfredo_bioy', '2022-02-15 20:19:20'),
	(50924, 5, 'Espectacular. Sport con potencia y confort.', 'maite_caceres', '2022-06-24 20:19:20'),
	(60801, 3, 'Es algo chico, pero está bien para una familia pequeña.', 'jaime_gil', '2021-12-02 11:23:32'),
	(60802, 4, 'Muy cómodo. Ideal para las siestas', 'ximena_fagundez', '2022-03-29 09:15:01'),
	(50923, 4, 'No había el color que yo quería, pero lo demás está perfecto.', 'pablo_cibeles', '2021-05-24 19:25:43'),
	(60803, 5, 'Es grande. Entra más de lo que parece', 'bruno_diaz', '2022-11-21 03:33:41'),
	(60802, 5, 'Lo compré para ver los partidos con mis amigos. Valió la pena.', 'marcelo_sosa', '2021-08-09 22:05:12'),
	(50923, 5, 'Lo que busco cuando no compito', 'santiago_urrutia', '2020-12-03 14:15:33');

-- Volcando estructura para tabla emercado.images
CREATE TABLE IF NOT EXISTS `images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_product` int(11) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL,
  `id_cat` int(11) DEFAULT NULL,
  `ruta` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_producto` (`id_product`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Volcando datos para la tabla emercado.images: ~65 rows (aproximadamente)
REPLACE INTO `images` (`id`, `id_product`, `id_user`, `id_cat`, `ruta`) VALUES
	(1, NULL, NULL, 101, 'img/cat101_1.jpg'),
	(2, 40281, NULL, NULL, 'img/prod40281_1.jpg'),
	(3, 40281, NULL, NULL, 'img/prod40281_2.jpg'),
	(4, 50742, NULL, NULL, 'img/prod50742_1.jpg'),
	(5, 50743, NULL, NULL, 'img/prod50743_1.jpg'),
	(6, 50741, NULL, NULL, 'img/prod50741_1.jpg'),
	(7, 40281, NULL, NULL, 'img/prod40281_3.jpg'),
	(8, 50742, NULL, NULL, 'img/prod50742_2.jpg'),
	(9, 50743, NULL, NULL, 'img/prod50743_2.jpg'),
	(10, 50741, NULL, NULL, 'img/prod50741_2.jpg'),
	(11, 50742, NULL, NULL, 'img/prod50742_3.jpg'),
	(12, 40281, NULL, NULL, 'img/prod40281_4.jpg'),
	(13, 50743, NULL, NULL, 'img/prod50743_3.jpg'),
	(14, 50741, NULL, NULL, 'img/prod50741_3.jpg'),
	(15, NULL, NULL, 102, 'img/cat102_1.jpg'),
	(16, 50742, NULL, NULL, 'img/prod50742_4.jpg'),
	(17, 50743, NULL, NULL, 'img/prod50743_4.jpg'),
	(18, 50741, NULL, NULL, 'img/prod50741_4.jpg'),
	(19, 50744, NULL, NULL, 'img/prod50744_1.jpg'),
	(20, 50744, NULL, NULL, 'img/prod50744_2.jpg'),
	(21, 50921, NULL, NULL, 'img/prod50921_1.jpg'),
	(22, 50922, NULL, NULL, 'img/prod50922_1.jpg'),
	(23, 50923, NULL, NULL, 'img/prod50923_1.jpg'),
	(24, NULL, NULL, 103, 'img/cat103_1.jpg'),
	(25, 50922, NULL, NULL, 'img/prod50922_2.jpg'),
	(26, 50744, NULL, NULL, 'img/prod50744_3.jpg'),
	(27, 50921, NULL, NULL, 'img/prod50921_2.jpg'),
	(28, 50923, NULL, NULL, 'img/prod50923_2.jpg'),
	(29, 50921, NULL, NULL, 'img/prod50921_3.jpg'),
	(30, 50744, NULL, NULL, 'img/prod50744_4.jpg'),
	(31, 50922, NULL, NULL, 'img/prod50922_3.jpg'),
	(32, 50923, NULL, NULL, 'img/prod50923_3.jpg'),
	(33, 50922, NULL, NULL, 'img/prod50922_4.jpg'),
	(34, 50921, NULL, NULL, 'img/prod50921_4.jpg'),
	(35, 50923, NULL, NULL, 'img/prod50923_4.jpg'),
	(36, 50924, NULL, NULL, 'img/prod50924_1.jpg'),
	(37, NULL, NULL, 104, 'img/cat104_1.jpg'),
	(38, 50925, NULL, NULL, 'img/prod50925_1.jpg'),
	(39, 50924, NULL, NULL, 'img/prod50924_2.jpg'),
	(40, 60801, NULL, NULL, 'img/prod60801_1.jpg'),
	(41, 60802, NULL, NULL, 'img/prod60802_1.jpg'),
	(42, 50925, NULL, NULL, 'img/prod50925_2.jpg'),
	(43, 50924, NULL, NULL, 'img/prod50924_3.jpg'),
	(44, 60802, NULL, NULL, 'img/prod60802_2.jpg'),
	(45, 60801, NULL, NULL, 'img/prod60801_2.jpg'),
	(46, 50925, NULL, NULL, 'img/prod50925_3.jpg'),
	(47, 50924, NULL, NULL, 'img/prod50924_4.jpg'),
	(48, 60801, NULL, NULL, 'img/prod60801_3.jpg'),
	(49, 60802, NULL, NULL, 'img/prod60802_3.jpg'),
	(50, NULL, NULL, 105, 'img/cat105_1.jpg'),
	(51, 50925, NULL, NULL, 'img/prod50925_4.jpg'),
	(52, 60802, NULL, NULL, 'img/prod60802_4.jpg'),
	(53, 60801, NULL, NULL, 'img/prod60801_4.jpg'),
	(54, 60803, NULL, NULL, 'img/prod60803_1.jpg'),
	(55, 60804, NULL, NULL, 'img/prod60804_1.jpg'),
	(56, 60803, NULL, NULL, 'img/prod60803_2.jpg'),
	(57, NULL, NULL, 106, 'img/cat106_1.jpg'),
	(58, 60804, NULL, NULL, 'img/prod60804_2.jpg'),
	(59, 60803, NULL, NULL, 'img/prod60803_3.jpg'),
	(60, 60804, NULL, NULL, 'img/prod60804_3.jpg'),
	(61, 60803, NULL, NULL, 'img/prod60803_4.jpg'),
	(62, 60804, NULL, NULL, 'img/prod60804_4.jpg'),
	(63, NULL, NULL, 107, 'img/cat107_1.jpg'),
	(64, NULL, NULL, 108, 'img/cat108_1.jpg'),
	(65, NULL, NULL, 109, 'img/cat109_1.jpg');

-- Volcando estructura para tabla emercado.products
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
) ENGINE=InnoDB AUTO_INCREMENT=60805 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Volcando datos para la tabla emercado.products: ~12 rows (aproximadamente)
REPLACE INTO `products` (`id`, `name`, `description`, `cost`, `currency`, `soldCount`, `category`, `relatedProducts`) VALUES
	(40281, 'Computadora de escritorio', 'Computadora de escritorio. Potencia y rendimiento, para juegos o trabajo', 2599, 'USD', 11, 'Computadoras', '[50743,50744]'),
	(50741, 'Oso de peluche', 'Oso de peluche gigante, con el bebé. Resistente y lavable. Tus hijos los amarán', 2400, 'UYU', 97, 'Juguetes', '[50742,50744]'),
	(50742, 'Pelota de básquetbol', 'Balón de baloncesto profesional, para interiores, tamaño 5, 27.5 pulgadas. Oficial de la NBA', 2999, 'UYU', 11, 'Juguetes', '[50741,50743]'),
	(50743, 'PlayStation 5', 'Maravíllate con increíbles gráficos y disfruta de nuevas funciones de PS5. Con E/S integrada.', 59999, 'UYU', 16, 'Juguetes', '[50742,50744]'),
	(50744, 'Bicicleta', '¡La mejor BMX pequeña del mercado! Frenos traseros y cuadro duradero de acero Hi-Ten.', 10999, 'UYU', 8, 'Juguetes', '[50741,50743]'),
	(50921, 'Chevrolet Onix Joy', 'Generación 2019, variedad de colores. Motor 1.0, ideal para ciudad.', 13500, 'USD', 14, 'Autos', '[50924,50922]'),
	(50922, 'Fiat Way', 'La versión de Fiat que brinda confort y a un precio accesible.', 14500, 'USD', 52, 'Autos', '[50921,50923]'),
	(50923, 'Suzuki Celerio', 'Un auto que se ha ganado la buena fama por su economía con el combustible.', 12500, 'USD', 25, 'Autos', '[50924,50922]'),
	(50924, 'Peugeot 208', 'El modelo de auto que se sigue renovando y manteniendo su prestigio en comodidad.', 15200, 'USD', 17, 'Autos', '[50921,50923]'),
	(50925, 'Bugatti Chiron', 'El mejor hiperdeportivo de mundo. Producción limitada a 500 unidades.', 3500000, 'USD', 0, 'Autos', '[50924,50921]'),
	(60801, 'Juego de comedor', 'Un conjunto sencillo y sólido, ideal para zonas de comedor pequeñas, hecho en madera maciza de pino', 4000, 'UYU', 88, 'Muebles', '[60802,60804]'),
	(60802, 'Sofá', 'Cómodo sofá de tres cuerpos, con chaiselongue intercambiable. Ideal para las siestas', 24000, 'UYU', 12, 'Muebles', '[60801,60803]'),
	(60803, 'Armario', 'Diseño clásico con puertas con forma de panel. Espejo de cuerpo entero para ver cómo te queda la ropa', 8000, 'UYU', 24, 'Muebles', '[60802,60804]'),
	(60804, 'Mesa de centro', 'Añade más funciones a tu sala de estar, ya que te permite cambiar fácilmente de actividad.', 10000, 'UYU', 37, 'Muebles', '[60801,60803]');

-- Volcando estructura para tabla emercado.users
CREATE TABLE IF NOT EXISTS `users` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `lastName` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(50) NOT NULL,
  `phoneNumber` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_user`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Volcando datos para la tabla emercado.users: ~1 rows (aproximadamente)
REPLACE INTO `users` (`id_user`, `name`, `lastName`, `email`, `password`, `phoneNumber`) VALUES
	(1, 'Admin', 'Grupo6', 'Admin@grupo6.com', 'Admin', '099888777');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
