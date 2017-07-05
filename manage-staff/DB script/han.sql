/*
MySQL Backup
Source Server Version: 5.5.5
Source Database: db_manage_staff
Date: 7/5/2017 16:50:27
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
--  Table structure for `articles`
-- ----------------------------
DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) DEFAULT NULL,
  `cdate` datetime DEFAULT NULL,
  `content` varchar(10000) DEFAULT NULL,
  `sub_title` varchar(200) DEFAULT NULL,
  `author` varchar(50) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `categories`
-- ----------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `feedbacks`
-- ----------------------------
DROP TABLE IF EXISTS `feedbacks`;
CREATE TABLE `feedbacks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) DEFAULT NULL,
  `cdate` datetime DEFAULT NULL,
  `content` varchar(200) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `feedbacks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `orders`
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `cdate` datetime DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `price` double DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `total` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `products`
-- ----------------------------
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `characteristic` varchar(10000) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `image_url` varchar(200) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `cdate` datetime DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `made_in` varchar(50) DEFAULT NULL,
  `mail_product` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `products_ibfk_1` (`category_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `revenues`
-- ----------------------------
DROP TABLE IF EXISTS `revenues`;
CREATE TABLE `revenues` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `cdate` datetime DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `value` double DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `revenues_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `roles`
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role` varchar(10) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `roles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `enable` tinyint(1) DEFAULT NULL,
  `cdate` datetime DEFAULT NULL,
  `signup_date` datetime DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `bank_name` varchar(50) DEFAULT NULL,
  `bank_account` varchar(50) DEFAULT NULL,
  `bank_branch` varchar(50) DEFAULT NULL,
  `bank_user` varchar(255) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `child_id` varchar(1000) NOT NULL,
  `lever` int(11) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `identifier` varchar(20) DEFAULT NULL COMMENT 'chung minh thu / ho chieu',
  `address` varchar(100) DEFAULT NULL,
  `avatar` blob,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=100001 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records 
-- ----------------------------
INSERT INTO `articles` VALUES ('1','NHỮNG XU HƯỚNG TRANG ĐIỂM HOT NHẤT HIỆN NAY CỦA GIỚI TRẺ','2017-07-05 16:04:01','<p>Bạn c&oacute; c&ograve;n nhớ xu hướng son m&agrave;u đỏ n&acirc;u từng l&agrave;m mưa l&agrave;m gi&oacute; một thời chứ? V&agrave; b&acirc;y giờ, kh&ocirc;ng chỉ m&agrave;u son, m&agrave; c&aacute;c c&ocirc; n&agrave;ng c&ograve;n sử dụng sắc m&agrave;u n&agrave;y cho g&ograve; m&aacute; của m&igrave;nh.</p>\n\n<p>Xu hướng trang điểm n&agrave;y sẽ t&ocirc;n l&ecirc;n vẻ tươi tắn, đầy sức sống tr&ecirc;n gương mặt bạn. B&ecirc;n cạnh đ&oacute;, nhiều c&ocirc; n&agrave;ng cũng chia sẻ rằng m&agrave;u m&aacute; ửng đ&oacute; khiến họ cảm thấy bản th&acirc;n trở n&ecirc;n tinh tế, cổ điển hơn hẳn.</p>\n\n<p>Đặc biệt, nếu bạn c&oacute; m&agrave;u da s&aacute;ng th&igrave; đừng ngần ngại thử sức với xu hướng trang điểm n&agrave;y nh&eacute;.&nbsp;Chắc chắn mọi người đều sẽ phải sửng sốt với sự thay đổi của bạn đấy!</p>\n\n<p><strong>L&ocirc;ng m&agrave;y&nbsp;ngang tự nhi&ecirc;n</strong></p>\n\n<p>Qua rồi c&aacute;i thời l&ocirc;ng m&agrave;y s&acirc;u r&oacute;m, l&ocirc;ng m&agrave;y h&igrave;nh v&ograve;m cung, xu hướng trang điểm b&acirc;y giờ l&agrave; tự nhi&ecirc;n, tự nhi&ecirc;n, tự nhi&ecirc;n! Cứ tự nhi&ecirc;n m&agrave; tiến tới th&ocirc;i!</p>\n\n<p><img alt=\"\" src=\"http://www.princesswhite.vn/upload/images/long%20may%20ngang.png\" style=\"height:468px; width:700px\" /></p>\n\n<p>Nhưng nếu bạn cảm thấy chưa đủ tự tin với cặp l&ocirc;ng m&agrave;y của m&igrave;nh, th&igrave; cứ kẻ một v&agrave;i đường để h&agrave;ng l&ocirc;ng m&agrave;y th&ecirc;m thanh tho&aacute;t, mềm mại nh&eacute;!</p>\n\n<p>Đừng bao giờ kẻ l&ocirc;ng m&agrave;y qu&aacute; đậm, bởi điều đ&oacute; sẽ khiến h&agrave;ng l&ocirc;ng m&agrave;y của bạn trở n&ecirc;n k&eacute;m tự nhi&ecirc;n, cũng khiến gương mặt bạn nh&igrave;n &ldquo;dữ&rdquo; hơn đấy.</p>\n\n<p><strong>M&agrave;u son m&ocirc;i nổi bật</strong></p>\n\n<p>Kh&ocirc;ng c&oacute; thời gian để thực hiện c&aacute;c bước trang điểm phức tạp? Bạn cũng kh&ocirc;ng muốn gương mặt m&igrave;nh phải &ldquo;chịu khổ&rdquo; bởi mỹ phẩm trang điểm trong thời tiết n&oacute;ng bức của m&ugrave;a h&egrave; n&agrave;y? Kh&ocirc;ng sao cả, h&atilde;y chỉ tập trung v&agrave;o đ&ocirc;i m&ocirc;i của m&igrave;nh l&agrave; được.</p>\n\n<p><img alt=\"\" src=\"http://www.princesswhite.vn/upload/images/2015521lipstik2780x390.jpg\" style=\"height:375px; width:750px\" /></p>\n\n<p>Để khiến đ&ocirc;i m&ocirc;i trở th&agrave;nh điểm nhấn, h&atilde;y bỏ qua c&aacute;c t&ocirc;ng m&agrave;u nhợt nhạt v&agrave; &ldquo;dũng cảm&rdquo; chọn những m&agrave;u nổi bật như đỏ, cam hoặc hồng để t&ocirc; điểm cho đ&ocirc;i m&ocirc;i nh&eacute;!</p>\n\n<p>Xu hướng trang điểm với m&agrave;u m&ocirc;i nổi bật l&agrave; điểm nhấn đang được giới trẻ t&iacute;ch cực lăng x&ecirc;.</p>\n\n<p><strong>Makeup đơn giản</strong></p>\n\n<p>Xu hướng trang điểm theo lối tự nhi&ecirc;n như c&oacute; như kh&ocirc;ng n&agrave;y vẫn lu&ocirc;n l&agrave;m mưa l&agrave;m gi&oacute; trong suốt năm 2016, v&agrave; hứa hẹn sẽ tiếp tục k&eacute;o d&agrave;i đến nhiều năm sau nữa. Bởi dường như c&aacute;c c&ocirc; g&aacute;i lu&ocirc;n nghi&ecirc;ng về &ldquo;vẻ đẹp tự nhi&ecirc;n&rdquo; nhiều hơn.</p>\n\n<p><img alt=\"\" src=\"http://www.princesswhite.vn/upload/images/da-1(1).jpg\" style=\"height:520px; width:780px\" /></p>\n\n<p>Make-up tối giản gi&uacute;p bạn tiết kiệm được kha kh&aacute; &hellip; m&agrave;u mắt, m&agrave;u son, tuy nhi&ecirc;n, vẫn khiến cho gương mặt kh&ocirc;ng bị nhợt nhạt do kh&ocirc;ng trang điểm.</p>\n\n<p>Xu hướng trang điểm n&agrave;y t&ocirc;n vinh vẻ đẹp tự nhi&ecirc;n tr&ecirc;n gương mặt, gi&uacute;p c&aacute;c bạn g&aacute;i to&aacute;t l&ecirc;n vẻ đẹp nhẹ nh&agrave;ng, dịu d&agrave;ng v&agrave; thanh tho&aacute;t. B&ecirc;n cạnh đ&oacute;, kiểu trang điểm n&agrave;y c&ograve;n được ưa th&iacute;ch v&igrave; kh&ocirc;ng đ&ograve;i hỏi qu&aacute; nhiều thời gian chuẩn bị v&agrave; c&oacute; thể &aacute;p dụng tại nhiều trường hợp như đi chơi, đi l&agrave;m &hellip;</p>\n\n<p>Để Makeup đơn giản, Princess White m&aacute;ch bạn một b&iacute; quyết cực kỳ quan trọng. Đ&oacute; ch&iacute;nh l&agrave;&nbsp;<strong>Kem dưỡng trắng da che khuyết điểm CC Cream Crystal &ndash;&nbsp;</strong>một sản phẩm rất được giới trẻ ưa chuộng hiện nay.</p>\n','Nếu vào năm 2016, trào lưu trang điểm đậm với tông màu nude được các cô gái ưu ái lựa chọn thì trong năm nay, phong cách trang điểm nữ tính và tự nhiên được giới trẻ chào đón và hưởng ứng nồng nhiệt. ','SPADMIN',NULL);
INSERT INTO `categories` VALUES ('1','Th?i trang'), ('2','M? ph?m');
INSERT INTO `products` VALUES ('1','Đầm sọc thắt nơ','<p><s><strong>Voan l&agrave; chất liệu mềm mại,</strong></s> m&aacute;t ph&ugrave; hợp cho thời tiết oi bức. Sự mềm mại v&agrave; tho&aacute;ng m&aacute;t của vải voan c&ograve;n mang đến cho nữ giới phong c&aacute;ch l&atilde;ng mạn, nữ t&iacute;nh. Trang hục l&agrave;m từ chất liệu voan mềm mại đem đến cảm gi&aacute;c tươi m&aacute;t v&agrave; quyến rũ. Remoingay xin giới thiệu đến c&aacute;c bạn một sản phẩm thời trang nữ l&agrave;m đi&ecirc;n đảo c&aacute;c n&agrave;ng trong thời gian gần đ&acirc;y đ&oacute; ch&iacute;nh l&agrave;: &Aacute;o tay b&egrave;o k&egrave;m thắt nơ. Sản phẩm c&oacute; thiết kế đơn giản, lịch sự nhưng kh&ocirc;ng k&eacute;m phần thời trang, dễ d&agrave;ng kết hợp với kiểu quần t&acirc;y, quần jean, ch&acirc;n v&aacute;y ngắn. H&atilde;y nhanh tay click mua ngay để được sở hữu v&agrave; hưởng trọn những dịch vụ tốt nhất m&agrave; remoingay mang đến cho c&aacute;c bạn nh&eacute;!&nbsp;</p>\n','<p>&Aacute;o tay b&egrave;o k&egrave;m thắt nơ được thiết kế với kiểu d&aacute;ng đơn giản nhung kh&ocirc;ng k&eacute;m phần tinh tế, cho c&aacute;c n&agrave;ng vẻ đẹp ki&ecirc;u xa nổi b&acirc;t, v&agrave; nữ t&iacute;nh hơn mỗi khi xuất hiện nơi đ&ocirc;ng người.</p>\n','1','/static/images/product/20170527090514_24256.jpg','1230000','1899-12-31 00:00:00','1','1','1'), ('2','??m blue tay s?c th?t n?1','<p>??m blue tay s?c th?t n?</p>\n','<p>??m blue tay s?c th?t n?121</p>\n','1','/static/images/product/20170705100712_59548.jpg','1000000','1899-12-31 00:00:00','1','1','1'), ('3','Đầm tay loe thắt nơ','<p>V&aacute;y đầm x&ograve;e l&agrave; một trong những trang phục kh&ocirc;ng thể thiếu của c&aacute;c c&ocirc; n&agrave;ng thục nữ, th&ocirc;ng thường c&aacute;c c&ocirc; g&aacute;i sẽ chọn cho m&igrave;nh những chiếc đầm x&ograve;e với chất liệu cứng như gấm, mềm mại như voan... Tuy nhi&ecirc;n h&egrave; 2017 c&aacute;c sao việt như&nbsp;Angela Phương Trinh, Ngọc Trinh, Thu Thảo&hellip; đều lựa chọn cho m&igrave;nh một chiếc đầm x&ograve;e kate mịn&nbsp;tay loe &oacute;ng mượt nữ t&iacute;nh t&ocirc;n l&ecirc;n v&oacute;c d&aacute;ng người con g&aacute;i v&agrave; cả sự sang trọng ẩn trong sự dịu d&agrave;ng. C&aacute;c n&agrave;ng đ&atilde; c&oacute; cho m&igrave;nh chiếc đầm chất liệu kate mịn&nbsp;n&agrave;y chưa. Đ&acirc;y l&agrave; chất liệu được sử dụng rất nhiều với&nbsp;chất vải mềm mại nhưng lại mang đến sự thoải m&aacute;i cũng như độ sang trọng của n&oacute;. H&atilde;y c&ugrave;ng remoingay tham khảo những mẫu đầm</p>\n','<p>Đầm tay loe với chất liệu kate mịn&nbsp;mềm mại, form d&aacute;ng x&ograve;e rộng cho người mặc sự thoải m&aacute;i duy&ecirc;n d&aacute;ng hơn trong những lần dạo phố hay đi chơi với bạn b&egrave;.</p>\n\n<p>✔&nbsp;Chất liệu: Kate mịn&nbsp;<br />\n✔&nbsp;M&agrave;u sắc: Đen</p>\n\n<p>✔ Kiểu d&aacute;ng: Tay loe, thắt nơ eo</p>\n\n<p>✔ Mục đ&iacute;ch: Dạo phố, dạ tiệc.&nbsp;</p>\n\n<p>✔ Xuất xứ: Việt nam<br />\n✔&nbsp;Sản phẩm đầm tay loe thắt nơ&nbsp;c&oacute; 2 size S - M</p>\n','1','/static/images/product/20170510160501_48885.jpg','1200000','2017-07-05 15:24:18',NULL,NULL,'0');
INSERT INTO `roles` VALUES ('1','SPADMIN','100000');
INSERT INTO `users` VALUES ('100000',NULL,'$2a$10$DWjgKn32UUkM/ryxmnvCTOLvf.5EVLPuhOTVabdp3uMq49nOvhy7G','SPADMIN',NULL,'1','2017-07-05 09:40:36',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'100000',NULL,NULL,NULL,NULL,NULL);
