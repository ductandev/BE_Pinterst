/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `binh_luan` (
  `binh_luan_id` int NOT NULL AUTO_INCREMENT,
  `nguoi_dung_id` int DEFAULT NULL,
  `hinh_id` int DEFAULT NULL,
  `ngay_binh_luan` date DEFAULT NULL,
  `noi_dung` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`binh_luan_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  KEY `hinh_id` (`hinh_id`),
  CONSTRAINT `binh_luan_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`),
  CONSTRAINT `binh_luan_ibfk_2` FOREIGN KEY (`hinh_id`) REFERENCES `hinh_anh` (`hinh_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `hinh_anh` (
  `hinh_id` int NOT NULL AUTO_INCREMENT,
  `ten_hinh` varchar(300) DEFAULT NULL,
  `duong_dan` varchar(500) DEFAULT NULL,
  `mo_ta` varchar(300) DEFAULT NULL,
  `nguoi_dung_id` int DEFAULT NULL,
  PRIMARY KEY (`hinh_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  CONSTRAINT `hinh_anh_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `luu_anh` (
  `nguoi_dung_id` int NOT NULL,
  `hinh_id` int NOT NULL,
  `ngay_luu` date DEFAULT NULL,
  PRIMARY KEY (`nguoi_dung_id`,`hinh_id`),
  KEY `hinh_id` (`hinh_id`),
  CONSTRAINT `luu_anh_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`),
  CONSTRAINT `luu_anh_ibfk_2` FOREIGN KEY (`hinh_id`) REFERENCES `hinh_anh` (`hinh_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `nguoi_dung` (
  `nguoi_dung_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(200) DEFAULT NULL,
  `mat_khau` varchar(255) DEFAULT NULL,
  `ho_ten` varchar(100) DEFAULT NULL,
  `tuoi` int DEFAULT NULL,
  `anh_dai_dien` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`nguoi_dung_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `binh_luan` (`binh_luan_id`, `nguoi_dung_id`, `hinh_id`, `ngay_binh_luan`, `noi_dung`) VALUES
(1, 1, 1, '2023-09-06', 'Bình luận hình 1');
INSERT INTO `binh_luan` (`binh_luan_id`, `nguoi_dung_id`, `hinh_id`, `ngay_binh_luan`, `noi_dung`) VALUES
(2, 2, 2, '2023-09-07', 'Bình luận hình 2');
INSERT INTO `binh_luan` (`binh_luan_id`, `nguoi_dung_id`, `hinh_id`, `ngay_binh_luan`, `noi_dung`) VALUES
(3, 3, 3, '2023-09-08', 'Bình luận hình 3');
INSERT INTO `binh_luan` (`binh_luan_id`, `nguoi_dung_id`, `hinh_id`, `ngay_binh_luan`, `noi_dung`) VALUES
(4, 4, 4, '2023-09-09', 'Bình luận hình 4'),
(5, 5, 5, '2023-09-10', 'Bình luận hình 5'),
(6, 1, 2, '2023-09-14', 'Hình nhìn ok quá ní !'),
(7, 1, 2, '2023-09-14', 'Hình nhìn ok quá ní !'),
(8, 5, 3, '2023-09-14', 'Hình nhìn ok quá ní !'),
(9, 5, 3, '2023-09-14', 'Hình nhìn ok quá ní !'),
(10, 6, 5, '2023-09-14', 'Test bình luận');

INSERT INTO `hinh_anh` (`hinh_id`, `ten_hinh`, `duong_dan`, `mo_ta`, `nguoi_dung_id`) VALUES
(1, 'Hình 1', 'duongdanhinhanh1.jpg', 'Mô tả hình 1', 1);
INSERT INTO `hinh_anh` (`hinh_id`, `ten_hinh`, `duong_dan`, `mo_ta`, `nguoi_dung_id`) VALUES
(2, 'Hình 2', 'duongdanhinhanh2.jpg', 'Mô tả hình 2', 2);
INSERT INTO `hinh_anh` (`hinh_id`, `ten_hinh`, `duong_dan`, `mo_ta`, `nguoi_dung_id`) VALUES
(3, 'Hình 3', 'duongdanhinhanh3.jpg', 'Mô tả hình 3', 3);
INSERT INTO `hinh_anh` (`hinh_id`, `ten_hinh`, `duong_dan`, `mo_ta`, `nguoi_dung_id`) VALUES
(4, 'Hình 4', 'duongdanhinhanh4.jpg', 'Mô tả hình 4', 4),
(5, 'Hình 5', 'duongdanhinhanh5.jpg', 'Mô tả hình 5', 5),
(11, '1694877683982_Box.jpg', 'C:\\Users\\Admin\\Desktop\\Cybersoft\\NodeJS33\\7_bt_printerest/public/img/1694877683982_Box.jpg', 'hình đẹp', 6);

INSERT INTO `luu_anh` (`nguoi_dung_id`, `hinh_id`, `ngay_luu`) VALUES
(1, 1, '2023-09-06');
INSERT INTO `luu_anh` (`nguoi_dung_id`, `hinh_id`, `ngay_luu`) VALUES
(2, 2, '2023-09-07');
INSERT INTO `luu_anh` (`nguoi_dung_id`, `hinh_id`, `ngay_luu`) VALUES
(3, 3, '2023-09-08');
INSERT INTO `luu_anh` (`nguoi_dung_id`, `hinh_id`, `ngay_luu`) VALUES
(4, 4, '2023-09-09'),
(5, 5, '2023-09-10'),
(6, 11, '2023-09-16');

INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `mat_khau`, `ho_ten`, `tuoi`, `anh_dai_dien`) VALUES
(1, 'nguoidung1@gmail.com', '$2b$10$9H5pWFDbCAKBN0HL33Eti.9qMRzxTIuiPxsbI.peTyHzXFnNFyZVi', 'Người Dùng 1', 25, 'duongdananh1.jpg');
INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `mat_khau`, `ho_ten`, `tuoi`, `anh_dai_dien`) VALUES
(2, 'nguoidung2@gmail.com', '$2b$10$9H5pWFDbCAKBN0HL33Eti.9qMRzxTIuiPxsbI.peTyHzXFnNFyZVi', 'Người Dùng 2', 30, 'duongdananh2.jpg');
INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `mat_khau`, `ho_ten`, `tuoi`, `anh_dai_dien`) VALUES
(3, 'nguoidung3@gmail.com', '$2b$10$9H5pWFDbCAKBN0HL33Eti.9qMRzxTIuiPxsbI.peTyHzXFnNFyZVi', 'Người Dùng 3', 28, 'duongdananh3.jpg');
INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `mat_khau`, `ho_ten`, `tuoi`, `anh_dai_dien`) VALUES
(4, 'nguoidung4@gmail.com', '$2b$10$9H5pWFDbCAKBN0HL33Eti.9qMRzxTIuiPxsbI.peTyHzXFnNFyZVi', 'Người Dùng 4', 22, 'duongdananh4.jpg'),
(5, 'nguoidung5@gmail.com', '$2b$10$9H5pWFDbCAKBN0HL33Eti.9qMRzxTIuiPxsbI.peTyHzXFnNFyZVi', 'Người Dùng 5', 35, 'duongdananh5.jpg'),
(6, 'nguoidung6@gmail.com', '$2b$10$5BqHQ0dBDPgXolWGE7ggyuzt8CTMss3onCrqq8DpVvIJAZvhFMUjO', 'NguyenDuctannnn', 30, 'duongdananh6.jpg');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;