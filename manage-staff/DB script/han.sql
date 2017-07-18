/*
MySQL Backup
Source Server Version: 5.5.5
Source Database: db_manage_staff
Date: 7/7/2017 17:41:38
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
  `image_url` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `categories`
-- ----------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `category_key` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

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

CREATE TABLE `banners` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `cdate` datetime DEFAULT NULL,
  `image_url` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records 
-- ----------------------------
INSERT INTO `articles` VALUES ('1','NHỮNG XU HƯỚNG TRANG ĐIỂM HOT NHẤT HIỆN NAY CỦA GIỚI TRẺ','2017-07-05 16:04:01','<p>Bạn c&oacute; c&ograve;n nhớ xu hướng son m&agrave;u đỏ n&acirc;u từng l&agrave;m mưa l&agrave;m gi&oacute; một thời chứ? V&agrave; b&acirc;y giờ, kh&ocirc;ng chỉ m&agrave;u son, m&agrave; c&aacute;c c&ocirc; n&agrave;ng c&ograve;n sử dụng sắc m&agrave;u n&agrave;y cho g&ograve; m&aacute; của m&igrave;nh.</p>\n\n<p>Xu hướng trang điểm n&agrave;y sẽ t&ocirc;n l&ecirc;n vẻ tươi tắn, đầy sức sống tr&ecirc;n gương mặt bạn. B&ecirc;n cạnh đ&oacute;, nhiều c&ocirc; n&agrave;ng cũng chia sẻ rằng m&agrave;u m&aacute; ửng đ&oacute; khiến họ cảm thấy bản th&acirc;n trở n&ecirc;n tinh tế, cổ điển hơn hẳn.</p>\n\n<p>Đặc biệt, nếu bạn c&oacute; m&agrave;u da s&aacute;ng th&igrave; đừng ngần ngại thử sức với xu hướng trang điểm n&agrave;y nh&eacute;.&nbsp;Chắc chắn mọi người đều sẽ phải sửng sốt với sự thay đổi của bạn đấy!</p>\n','Nếu vào năm 2016, trào lưu trang điểm đậm với tông màu nude được các cô gái ưu ái lựa chọn thì trong năm nay, phong cách trang điểm nữ tính và tự nhiên được giới trẻ chào đón và hưởng ứng nồng nhiệt. ','SPADMIN',NULL,'/static/images/article/CustomerComment.jpg'), ('2','NHỮNG XU HƯỚNG TRANG ĐIỂM HOT NHẤT HIỆN NAY CỦA GIỚI TRẺ','2017-07-05 16:04:01','<p>Bạn c&oacute; c&ograve;n nhớ xu hướng son m&agrave;u đỏ n&acirc;u từng l&agrave;m mưa l&agrave;m gi&oacute; một thời chứ? V&agrave; b&acirc;y giờ, kh&ocirc;ng chỉ m&agrave;u son, m&agrave; c&aacute;c c&ocirc; n&agrave;ng c&ograve;n sử dụng sắc m&agrave;u n&agrave;y cho g&ograve; m&aacute; của m&igrave;nh.</p>\n\n<p>Xu hướng trang điểm n&agrave;y sẽ t&ocirc;n l&ecirc;n vẻ tươi tắn, đầy sức sống tr&ecirc;n gương mặt bạn. B&ecirc;n cạnh đ&oacute;, nhiều c&ocirc; n&agrave;ng cũng chia sẻ rằng m&agrave;u m&aacute; ửng đ&oacute; khiến họ cảm thấy bản th&acirc;n trở n&ecirc;n tinh tế, cổ điển hơn hẳn.</p>\n\n<p>Đặc biệt, nếu bạn c&oacute; m&agrave;u da s&aacute;ng th&igrave; đừng ngần ngại thử sức với xu hướng trang điểm n&agrave;y nh&eacute;.&nbsp;Chắc chắn mọi người đều sẽ phải sửng sốt với sự thay đổi của bạn đấy!</p>\n','Nếu vào năm 2016, trào lưu trang điểm đậm với tông màu nude được các cô gái ưu ái lựa chọn thì trong năm nay, phong cách trang điểm nữ tính và tự nhiên được giới trẻ chào đón và hưởng ứng nồng nhiệt. ','SPADMIN',NULL,'/static/images/article/CustomerComment.jpg');
INSERT INTO `categories` VALUES ('1','Thời Trang','thoitrang'), ('2','Mỹ Phẩm','mypham'), ('3','Thực Phẩm Chức Năng','thucphamchucnang');
INSERT INTO `products` VALUES ('1','Đầm sọc thắt nơ','<p><s><strong>Voan l&agrave; chất liệu mềm mại,</strong></s> m&aacute;t ph&ugrave; hợp cho thời tiết oi bức. Sự mềm mại v&agrave; tho&aacute;ng m&aacute;t của vải voan c&ograve;n mang đến cho nữ giới phong c&aacute;ch l&atilde;ng mạn, nữ t&iacute;nh. Trang hục l&agrave;m từ chất liệu voan mềm mại đem đến cảm gi&aacute;c tươi m&aacute;t v&agrave; quyến rũ. Remoingay xin giới thiệu đến c&aacute;c bạn một sản phẩm thời trang nữ l&agrave;m đi&ecirc;n đảo c&aacute;c n&agrave;ng trong thời gian gần đ&acirc;y đ&oacute; ch&iacute;nh l&agrave;: &Aacute;o tay b&egrave;o k&egrave;m thắt nơ. Sản phẩm c&oacute; thiết kế đơn giản, lịch sự nhưng kh&ocirc;ng k&eacute;m phần thời trang, dễ d&agrave;ng kết hợp với kiểu quần t&acirc;y, quần jean, ch&acirc;n v&aacute;y ngắn. H&atilde;y nhanh tay click mua ngay để được sở hữu v&agrave; hưởng trọn những dịch vụ tốt nhất m&agrave; remoingay mang đến cho c&aacute;c bạn nh&eacute;!&nbsp;</p>\n','<p>&Aacute;o tay b&egrave;o k&egrave;m thắt nơ được thiết kế với kiểu d&aacute;ng đơn giản nhung kh&ocirc;ng k&eacute;m phần tinh tế, cho c&aacute;c n&agrave;ng vẻ đẹp ki&ecirc;u xa nổi b&acirc;t, v&agrave; nữ t&iacute;nh hơn mỗi khi xuất hiện nơi đ&ocirc;ng người.</p>\n','1','/static/images/product/20170527090514_24256.jpg','1230000','1899-12-31 00:00:00','1','1','1'), ('2','Mỹ phẩm','<p>??m blue tay s?c th?t n?</p>\n','<p>??m blue tay s?c th?t n?121</p>\n','2','/static/images/product/20170705100712_59548.jpg','1000000','1899-12-31 00:00:00','1','1','1'), ('3','thực phẩm chức năng1','<p>V&aacute;y đầm x&ograve;e l&agrave; một trong những trang phục kh&ocirc;ng thể thiếu của c&aacute;c c&ocirc; n&agrave;ng thục nữ, th&ocirc;ng thường c&aacute;c c&ocirc; g&aacute;i sẽ chọn cho m&igrave;nh những chiếc đầm x&ograve;e với chất liệu cứng như gấm, mềm mại như voan... Tuy nhi&ecirc;n h&egrave; 2017 c&aacute;c sao việt như&nbsp;Angela Phương Trinh, Ngọc Trinh, Thu Thảo&hellip; đều lựa chọn cho m&igrave;nh một chiếc đầm x&ograve;e kate mịn&nbsp;tay loe &oacute;ng mượt nữ t&iacute;nh t&ocirc;n l&ecirc;n v&oacute;c d&aacute;ng người con g&aacute;i v&agrave; cả sự sang trọng ẩn trong sự dịu d&agrave;ng. C&aacute;c n&agrave;ng đ&atilde; c&oacute; cho m&igrave;nh chiếc đầm chất liệu kate mịn&nbsp;n&agrave;y chưa. Đ&acirc;y l&agrave; chất liệu được sử dụng rất nhiều với&nbsp;chất vải mềm mại nhưng lại mang đến sự thoải m&aacute;i cũng như độ sang trọng của n&oacute;. H&atilde;y c&ugrave;ng remoingay tham khảo những mẫu đầm</p>\n','<p>Đầm tay loe với chất liệu kate mịn&nbsp;mềm mại, form d&aacute;ng x&ograve;e rộng cho người mặc sự thoải m&aacute;i duy&ecirc;n d&aacute;ng hơn trong những lần dạo phố hay đi chơi với bạn b&egrave;.</p>\n\n<p>✔&nbsp;Chất liệu: Kate mịn&nbsp;<br />\n✔&nbsp;M&agrave;u sắc: Đen</p>\n\n<p>✔ Kiểu d&aacute;ng: Tay loe, thắt nơ eo</p>\n\n<p>✔ Mục đ&iacute;ch: Dạo phố, dạ tiệc.&nbsp;</p>\n\n<p>✔ Xuất xứ: Việt nam<br />\n✔&nbsp;Sản phẩm đầm tay loe thắt nơ&nbsp;c&oacute; 2 size S - M</p>\n','3','/static/images/product/CustomerComment.jpg','1200000','2017-07-05 15:24:18',NULL,NULL,'0'), ('4','thực phẩm chức năng','<p>V&aacute;y đầm x&ograve;e l&agrave; một trong những trang phục kh&ocirc;ng thể thiếu của c&aacute;c c&ocirc; n&agrave;ng thục nữ, th&ocirc;ng thường c&aacute;c c&ocirc; g&aacute;i sẽ chọn cho m&igrave;nh những chiếc đầm x&ograve;e với chất liệu cứng như gấm, mềm mại như voan... Tuy nhi&ecirc;n h&egrave; 2017 c&aacute;c sao việt như&nbsp;Angela Phương Trinh, Ngọc Trinh, Thu Thảo&hellip; đều lựa chọn cho m&igrave;nh một chiếc đầm x&ograve;e kate mịn&nbsp;tay loe &oacute;ng mượt nữ t&iacute;nh t&ocirc;n l&ecirc;n v&oacute;c d&aacute;ng người con g&aacute;i v&agrave; cả sự sang trọng ẩn trong sự dịu d&agrave;ng. C&aacute;c n&agrave;ng đ&atilde; c&oacute; cho m&igrave;nh chiếc đầm chất liệu kate mịn&nbsp;n&agrave;y chưa. Đ&acirc;y l&agrave; chất liệu được sử dụng rất nhiều với&nbsp;chất vải mềm mại nhưng lại mang đến sự thoải m&aacute;i cũng như độ sang trọng của n&oacute;. H&atilde;y c&ugrave;ng remoingay tham khảo những mẫu đầm</p>\n','<p>Đầm tay loe với chất liệu kate mịn&nbsp;mềm mại, form d&aacute;ng x&ograve;e rộng cho người mặc sự thoải m&aacute;i duy&ecirc;n d&aacute;ng hơn trong những lần dạo phố hay đi chơi với bạn b&egrave;.</p>\n\n<p>✔&nbsp;Chất liệu: Kate mịn&nbsp;<br />\n✔&nbsp;M&agrave;u sắc: Đen</p>\n\n<p>✔ Kiểu d&aacute;ng: Tay loe, thắt nơ eo</p>\n\n<p>✔ Mục đ&iacute;ch: Dạo phố, dạ tiệc.&nbsp;</p>\n\n<p>✔ Xuất xứ: Việt nam<br />\n✔&nbsp;Sản phẩm đầm tay loe thắt nơ&nbsp;c&oacute; 2 size S - M</p>\n','3','/static/images/product/CustomerComment.jpg','1200000','2017-07-05 15:24:18','','','0'), ('5','thực phẩm chức năng','<p>V&aacute;y đầm x&ograve;e l&agrave; một trong những trang phục kh&ocirc;ng thể thiếu của c&aacute;c c&ocirc; n&agrave;ng thục nữ, th&ocirc;ng thường c&aacute;c c&ocirc; g&aacute;i sẽ chọn cho m&igrave;nh những chiếc đầm x&ograve;e với chất liệu cứng như gấm, mềm mại như voan... Tuy nhi&ecirc;n h&egrave; 2017 c&aacute;c sao việt như&nbsp;Angela Phương Trinh, Ngọc Trinh, Thu Thảo&hellip; đều lựa chọn cho m&igrave;nh một chiếc đầm x&ograve;e kate mịn&nbsp;tay loe &oacute;ng mượt nữ t&iacute;nh t&ocirc;n l&ecirc;n v&oacute;c d&aacute;ng người con g&aacute;i v&agrave; cả sự sang trọng ẩn trong sự dịu d&agrave;ng. C&aacute;c n&agrave;ng đ&atilde; c&oacute; cho m&igrave;nh chiếc đầm chất liệu kate mịn&nbsp;n&agrave;y chưa. Đ&acirc;y l&agrave; chất liệu được sử dụng rất nhiều với&nbsp;chất vải mềm mại nhưng lại mang đến sự thoải m&aacute;i cũng như độ sang trọng của n&oacute;. H&atilde;y c&ugrave;ng remoingay tham khảo những mẫu đầm</p>\n','<p>Đầm tay loe với chất liệu kate mịn&nbsp;mềm mại, form d&aacute;ng x&ograve;e rộng cho người mặc sự thoải m&aacute;i duy&ecirc;n d&aacute;ng hơn trong những lần dạo phố hay đi chơi với bạn b&egrave;.</p>\n\n<p>✔&nbsp;Chất liệu: Kate mịn&nbsp;<br />\n✔&nbsp;M&agrave;u sắc: Đen</p>\n\n<p>✔ Kiểu d&aacute;ng: Tay loe, thắt nơ eo</p>\n\n<p>✔ Mục đ&iacute;ch: Dạo phố, dạ tiệc.&nbsp;</p>\n\n<p>✔ Xuất xứ: Việt nam<br />\n✔&nbsp;Sản phẩm đầm tay loe thắt nơ&nbsp;c&oacute; 2 size S - M</p>\n','3','/static/images/product/CustomerComment.jpg','1200000','2017-07-05 15:24:18','','','0'), ('6','thực phẩm chức năng','<p>V&aacute;y đầm x&ograve;e l&agrave; một trong những trang phục kh&ocirc;ng thể thiếu của c&aacute;c c&ocirc; n&agrave;ng thục nữ, th&ocirc;ng thường c&aacute;c c&ocirc; g&aacute;i sẽ chọn cho m&igrave;nh những chiếc đầm x&ograve;e với chất liệu cứng như gấm, mềm mại như voan... Tuy nhi&ecirc;n h&egrave; 2017 c&aacute;c sao việt như&nbsp;Angela Phương Trinh, Ngọc Trinh, Thu Thảo&hellip; đều lựa chọn cho m&igrave;nh một chiếc đầm x&ograve;e kate mịn&nbsp;tay loe &oacute;ng mượt nữ t&iacute;nh t&ocirc;n l&ecirc;n v&oacute;c d&aacute;ng người con g&aacute;i v&agrave; cả sự sang trọng ẩn trong sự dịu d&agrave;ng. C&aacute;c n&agrave;ng đ&atilde; c&oacute; cho m&igrave;nh chiếc đầm chất liệu kate mịn&nbsp;n&agrave;y chưa. Đ&acirc;y l&agrave; chất liệu được sử dụng rất nhiều với&nbsp;chất vải mềm mại nhưng lại mang đến sự thoải m&aacute;i cũng như độ sang trọng của n&oacute;. H&atilde;y c&ugrave;ng remoingay tham khảo những mẫu đầm</p>\n','<p>Đầm tay loe với chất liệu kate mịn&nbsp;mềm mại, form d&aacute;ng x&ograve;e rộng cho người mặc sự thoải m&aacute;i duy&ecirc;n d&aacute;ng hơn trong những lần dạo phố hay đi chơi với bạn b&egrave;.</p>\n\n<p>✔&nbsp;Chất liệu: Kate mịn&nbsp;<br />\n✔&nbsp;M&agrave;u sắc: Đen</p>\n\n<p>✔ Kiểu d&aacute;ng: Tay loe, thắt nơ eo</p>\n\n<p>✔ Mục đ&iacute;ch: Dạo phố, dạ tiệc.&nbsp;</p>\n\n<p>✔ Xuất xứ: Việt nam<br />\n✔&nbsp;Sản phẩm đầm tay loe thắt nơ&nbsp;c&oacute; 2 size S - M</p>\n','3','/static/images/product/CustomerComment.jpg','1200000','2017-07-05 15:24:18','','','0'), ('7','thực phẩm chức năng','<p>V&aacute;y đầm x&ograve;e l&agrave; một trong những trang phục kh&ocirc;ng thể thiếu của c&aacute;c c&ocirc; n&agrave;ng thục nữ, th&ocirc;ng thường c&aacute;c c&ocirc; g&aacute;i sẽ chọn cho m&igrave;nh những chiếc đầm x&ograve;e với chất liệu cứng như gấm, mềm mại như voan... Tuy nhi&ecirc;n h&egrave; 2017 c&aacute;c sao việt như&nbsp;Angela Phương Trinh, Ngọc Trinh, Thu Thảo&hellip; đều lựa chọn cho m&igrave;nh một chiếc đầm x&ograve;e kate mịn&nbsp;tay loe &oacute;ng mượt nữ t&iacute;nh t&ocirc;n l&ecirc;n v&oacute;c d&aacute;ng người con g&aacute;i v&agrave; cả sự sang trọng ẩn trong sự dịu d&agrave;ng. C&aacute;c n&agrave;ng đ&atilde; c&oacute; cho m&igrave;nh chiếc đầm chất liệu kate mịn&nbsp;n&agrave;y chưa. Đ&acirc;y l&agrave; chất liệu được sử dụng rất nhiều với&nbsp;chất vải mềm mại nhưng lại mang đến sự thoải m&aacute;i cũng như độ sang trọng của n&oacute;. H&atilde;y c&ugrave;ng remoingay tham khảo những mẫu đầm</p>\n','<p>Đầm tay loe với chất liệu kate mịn&nbsp;mềm mại, form d&aacute;ng x&ograve;e rộng cho người mặc sự thoải m&aacute;i duy&ecirc;n d&aacute;ng hơn trong những lần dạo phố hay đi chơi với bạn b&egrave;.</p>\n\n<p>✔&nbsp;Chất liệu: Kate mịn&nbsp;<br />\n✔&nbsp;M&agrave;u sắc: Đen</p>\n\n<p>✔ Kiểu d&aacute;ng: Tay loe, thắt nơ eo</p>\n\n<p>✔ Mục đ&iacute;ch: Dạo phố, dạ tiệc.&nbsp;</p>\n\n<p>✔ Xuất xứ: Việt nam<br />\n✔&nbsp;Sản phẩm đầm tay loe thắt nơ&nbsp;c&oacute; 2 size S - M</p>\n','3','/static/images/product/CustomerComment.jpg','1200000','2017-07-05 15:24:18','','','0'), ('8','thực phẩm chức năng','<p>V&aacute;y đầm x&ograve;e l&agrave; một trong những trang phục kh&ocirc;ng thể thiếu của c&aacute;c c&ocirc; n&agrave;ng thục nữ, th&ocirc;ng thường c&aacute;c c&ocirc; g&aacute;i sẽ chọn cho m&igrave;nh những chiếc đầm x&ograve;e với chất liệu cứng như gấm, mềm mại như voan... Tuy nhi&ecirc;n h&egrave; 2017 c&aacute;c sao việt như&nbsp;Angela Phương Trinh, Ngọc Trinh, Thu Thảo&hellip; đều lựa chọn cho m&igrave;nh một chiếc đầm x&ograve;e kate mịn&nbsp;tay loe &oacute;ng mượt nữ t&iacute;nh t&ocirc;n l&ecirc;n v&oacute;c d&aacute;ng người con g&aacute;i v&agrave; cả sự sang trọng ẩn trong sự dịu d&agrave;ng. C&aacute;c n&agrave;ng đ&atilde; c&oacute; cho m&igrave;nh chiếc đầm chất liệu kate mịn&nbsp;n&agrave;y chưa. Đ&acirc;y l&agrave; chất liệu được sử dụng rất nhiều với&nbsp;chất vải mềm mại nhưng lại mang đến sự thoải m&aacute;i cũng như độ sang trọng của n&oacute;. H&atilde;y c&ugrave;ng remoingay tham khảo những mẫu đầm</p>\n','<p>Đầm tay loe với chất liệu kate mịn&nbsp;mềm mại, form d&aacute;ng x&ograve;e rộng cho người mặc sự thoải m&aacute;i duy&ecirc;n d&aacute;ng hơn trong những lần dạo phố hay đi chơi với bạn b&egrave;.</p>\n\n<p>✔&nbsp;Chất liệu: Kate mịn&nbsp;<br />\n✔&nbsp;M&agrave;u sắc: Đen</p>\n\n<p>✔ Kiểu d&aacute;ng: Tay loe, thắt nơ eo</p>\n\n<p>✔ Mục đ&iacute;ch: Dạo phố, dạ tiệc.&nbsp;</p>\n\n<p>✔ Xuất xứ: Việt nam<br />\n✔&nbsp;Sản phẩm đầm tay loe thắt nơ&nbsp;c&oacute; 2 size S - M</p>\n','3','/static/images/product/CustomerComment.jpg','1200000','2017-07-05 15:24:18','','','0'), ('9','thực phẩm chức năng','<p>V&aacute;y đầm x&ograve;e l&agrave; một trong những trang phục kh&ocirc;ng thể thiếu của c&aacute;c c&ocirc; n&agrave;ng thục nữ, th&ocirc;ng thường c&aacute;c c&ocirc; g&aacute;i sẽ chọn cho m&igrave;nh những chiếc đầm x&ograve;e với chất liệu cứng như gấm, mềm mại như voan... Tuy nhi&ecirc;n h&egrave; 2017 c&aacute;c sao việt như&nbsp;Angela Phương Trinh, Ngọc Trinh, Thu Thảo&hellip; đều lựa chọn cho m&igrave;nh một chiếc đầm x&ograve;e kate mịn&nbsp;tay loe &oacute;ng mượt nữ t&iacute;nh t&ocirc;n l&ecirc;n v&oacute;c d&aacute;ng người con g&aacute;i v&agrave; cả sự sang trọng ẩn trong sự dịu d&agrave;ng. C&aacute;c n&agrave;ng đ&atilde; c&oacute; cho m&igrave;nh chiếc đầm chất liệu kate mịn&nbsp;n&agrave;y chưa. Đ&acirc;y l&agrave; chất liệu được sử dụng rất nhiều với&nbsp;chất vải mềm mại nhưng lại mang đến sự thoải m&aacute;i cũng như độ sang trọng của n&oacute;. H&atilde;y c&ugrave;ng remoingay tham khảo những mẫu đầm</p>\n','<p>Đầm tay loe với chất liệu kate mịn&nbsp;mềm mại, form d&aacute;ng x&ograve;e rộng cho người mặc sự thoải m&aacute;i duy&ecirc;n d&aacute;ng hơn trong những lần dạo phố hay đi chơi với bạn b&egrave;.</p>\n\n<p>✔&nbsp;Chất liệu: Kate mịn&nbsp;<br />\n✔&nbsp;M&agrave;u sắc: Đen</p>\n\n<p>✔ Kiểu d&aacute;ng: Tay loe, thắt nơ eo</p>\n\n<p>✔ Mục đ&iacute;ch: Dạo phố, dạ tiệc.&nbsp;</p>\n\n<p>✔ Xuất xứ: Việt nam<br />\n✔&nbsp;Sản phẩm đầm tay loe thắt nơ&nbsp;c&oacute; 2 size S - M</p>\n','3','/static/images/product/CustomerComment.jpg','1200000','2017-07-05 15:24:18','','','0'), ('10','thực phẩm chức năng','<p>V&aacute;y đầm x&ograve;e l&agrave; một trong những trang phục kh&ocirc;ng thể thiếu của c&aacute;c c&ocirc; n&agrave;ng thục nữ, th&ocirc;ng thường c&aacute;c c&ocirc; g&aacute;i sẽ chọn cho m&igrave;nh những chiếc đầm x&ograve;e với chất liệu cứng như gấm, mềm mại như voan... Tuy nhi&ecirc;n h&egrave; 2017 c&aacute;c sao việt như&nbsp;Angela Phương Trinh, Ngọc Trinh, Thu Thảo&hellip; đều lựa chọn cho m&igrave;nh một chiếc đầm x&ograve;e kate mịn&nbsp;tay loe &oacute;ng mượt nữ t&iacute;nh t&ocirc;n l&ecirc;n v&oacute;c d&aacute;ng người con g&aacute;i v&agrave; cả sự sang trọng ẩn trong sự dịu d&agrave;ng. C&aacute;c n&agrave;ng đ&atilde; c&oacute; cho m&igrave;nh chiếc đầm chất liệu kate mịn&nbsp;n&agrave;y chưa. Đ&acirc;y l&agrave; chất liệu được sử dụng rất nhiều với&nbsp;chất vải mềm mại nhưng lại mang đến sự thoải m&aacute;i cũng như độ sang trọng của n&oacute;. H&atilde;y c&ugrave;ng remoingay tham khảo những mẫu đầm</p>\n','<p>Đầm tay loe với chất liệu kate mịn&nbsp;mềm mại, form d&aacute;ng x&ograve;e rộng cho người mặc sự thoải m&aacute;i duy&ecirc;n d&aacute;ng hơn trong những lần dạo phố hay đi chơi với bạn b&egrave;.</p>\n\n<p>✔&nbsp;Chất liệu: Kate mịn&nbsp;<br />\n✔&nbsp;M&agrave;u sắc: Đen</p>\n\n<p>✔ Kiểu d&aacute;ng: Tay loe, thắt nơ eo</p>\n\n<p>✔ Mục đ&iacute;ch: Dạo phố, dạ tiệc.&nbsp;</p>\n\n<p>✔ Xuất xứ: Việt nam<br />\n✔&nbsp;Sản phẩm đầm tay loe thắt nơ&nbsp;c&oacute; 2 size S - M</p>\n','3','/static/images/product/CustomerComment.jpg','1200000','2017-07-05 15:24:18','','','0'), ('11','thực phẩm chức năng','<p>V&aacute;y đầm x&ograve;e l&agrave; một trong những trang phục kh&ocirc;ng thể thiếu của c&aacute;c c&ocirc; n&agrave;ng thục nữ, th&ocirc;ng thường c&aacute;c c&ocirc; g&aacute;i sẽ chọn cho m&igrave;nh những chiếc đầm x&ograve;e với chất liệu cứng như gấm, mềm mại như voan... Tuy nhi&ecirc;n h&egrave; 2017 c&aacute;c sao việt như&nbsp;Angela Phương Trinh, Ngọc Trinh, Thu Thảo&hellip; đều lựa chọn cho m&igrave;nh một chiếc đầm x&ograve;e kate mịn&nbsp;tay loe &oacute;ng mượt nữ t&iacute;nh t&ocirc;n l&ecirc;n v&oacute;c d&aacute;ng người con g&aacute;i v&agrave; cả sự sang trọng ẩn trong sự dịu d&agrave;ng. C&aacute;c n&agrave;ng đ&atilde; c&oacute; cho m&igrave;nh chiếc đầm chất liệu kate mịn&nbsp;n&agrave;y chưa. Đ&acirc;y l&agrave; chất liệu được sử dụng rất nhiều với&nbsp;chất vải mềm mại nhưng lại mang đến sự thoải m&aacute;i cũng như độ sang trọng của n&oacute;. H&atilde;y c&ugrave;ng remoingay tham khảo những mẫu đầm</p>\n','<p>Đầm tay loe với chất liệu kate mịn&nbsp;mềm mại, form d&aacute;ng x&ograve;e rộng cho người mặc sự thoải m&aacute;i duy&ecirc;n d&aacute;ng hơn trong những lần dạo phố hay đi chơi với bạn b&egrave;.</p>\n\n<p>✔&nbsp;Chất liệu: Kate mịn&nbsp;<br />\n✔&nbsp;M&agrave;u sắc: Đen</p>\n\n<p>✔ Kiểu d&aacute;ng: Tay loe, thắt nơ eo</p>\n\n<p>✔ Mục đ&iacute;ch: Dạo phố, dạ tiệc.&nbsp;</p>\n\n<p>✔ Xuất xứ: Việt nam<br />\n✔&nbsp;Sản phẩm đầm tay loe thắt nơ&nbsp;c&oacute; 2 size S - M</p>\n','3','/static/images/product/CustomerComment.jpg','1200000','2017-07-05 15:24:18','','','0'), ('12','thực phẩm chức năng','<p>V&aacute;y đầm x&ograve;e l&agrave; một trong những trang phục kh&ocirc;ng thể thiếu của c&aacute;c c&ocirc; n&agrave;ng thục nữ, th&ocirc;ng thường c&aacute;c c&ocirc; g&aacute;i sẽ chọn cho m&igrave;nh những chiếc đầm x&ograve;e với chất liệu cứng như gấm, mềm mại như voan... Tuy nhi&ecirc;n h&egrave; 2017 c&aacute;c sao việt như&nbsp;Angela Phương Trinh, Ngọc Trinh, Thu Thảo&hellip; đều lựa chọn cho m&igrave;nh một chiếc đầm x&ograve;e kate mịn&nbsp;tay loe &oacute;ng mượt nữ t&iacute;nh t&ocirc;n l&ecirc;n v&oacute;c d&aacute;ng người con g&aacute;i v&agrave; cả sự sang trọng ẩn trong sự dịu d&agrave;ng. C&aacute;c n&agrave;ng đ&atilde; c&oacute; cho m&igrave;nh chiếc đầm chất liệu kate mịn&nbsp;n&agrave;y chưa. Đ&acirc;y l&agrave; chất liệu được sử dụng rất nhiều với&nbsp;chất vải mềm mại nhưng lại mang đến sự thoải m&aacute;i cũng như độ sang trọng của n&oacute;. H&atilde;y c&ugrave;ng remoingay tham khảo những mẫu đầm</p>\n','<p>Đầm tay loe với chất liệu kate mịn&nbsp;mềm mại, form d&aacute;ng x&ograve;e rộng cho người mặc sự thoải m&aacute;i duy&ecirc;n d&aacute;ng hơn trong những lần dạo phố hay đi chơi với bạn b&egrave;.</p>\n\n<p>✔&nbsp;Chất liệu: Kate mịn&nbsp;<br />\n✔&nbsp;M&agrave;u sắc: Đen</p>\n\n<p>✔ Kiểu d&aacute;ng: Tay loe, thắt nơ eo</p>\n\n<p>✔ Mục đ&iacute;ch: Dạo phố, dạ tiệc.&nbsp;</p>\n\n<p>✔ Xuất xứ: Việt nam<br />\n✔&nbsp;Sản phẩm đầm tay loe thắt nơ&nbsp;c&oacute; 2 size S - M</p>\n','3','/static/images/product/CustomerComment.jpg','1200000','2017-07-05 15:24:18','','','0'), ('13','thực phẩm chức năng','<p>V&aacute;y đầm x&ograve;e l&agrave; một trong những trang phục kh&ocirc;ng thể thiếu của c&aacute;c c&ocirc; n&agrave;ng thục nữ, th&ocirc;ng thường c&aacute;c c&ocirc; g&aacute;i sẽ chọn cho m&igrave;nh những chiếc đầm x&ograve;e với chất liệu cứng như gấm, mềm mại như voan... Tuy nhi&ecirc;n h&egrave; 2017 c&aacute;c sao việt như&nbsp;Angela Phương Trinh, Ngọc Trinh, Thu Thảo&hellip; đều lựa chọn cho m&igrave;nh một chiếc đầm x&ograve;e kate mịn&nbsp;tay loe &oacute;ng mượt nữ t&iacute;nh t&ocirc;n l&ecirc;n v&oacute;c d&aacute;ng người con g&aacute;i v&agrave; cả sự sang trọng ẩn trong sự dịu d&agrave;ng. C&aacute;c n&agrave;ng đ&atilde; c&oacute; cho m&igrave;nh chiếc đầm chất liệu kate mịn&nbsp;n&agrave;y chưa. Đ&acirc;y l&agrave; chất liệu được sử dụng rất nhiều với&nbsp;chất vải mềm mại nhưng lại mang đến sự thoải m&aacute;i cũng như độ sang trọng của n&oacute;. H&atilde;y c&ugrave;ng remoingay tham khảo những mẫu đầm</p>\n','<p>Đầm tay loe với chất liệu kate mịn&nbsp;mềm mại, form d&aacute;ng x&ograve;e rộng cho người mặc sự thoải m&aacute;i duy&ecirc;n d&aacute;ng hơn trong những lần dạo phố hay đi chơi với bạn b&egrave;.</p>\n\n<p>✔&nbsp;Chất liệu: Kate mịn&nbsp;<br />\n✔&nbsp;M&agrave;u sắc: Đen</p>\n\n<p>✔ Kiểu d&aacute;ng: Tay loe, thắt nơ eo</p>\n\n<p>✔ Mục đ&iacute;ch: Dạo phố, dạ tiệc.&nbsp;</p>\n\n<p>✔ Xuất xứ: Việt nam<br />\n✔&nbsp;Sản phẩm đầm tay loe thắt nơ&nbsp;c&oacute; 2 size S - M</p>\n','3','/static/images/product/CustomerComment.jpg','1200000','2017-07-05 15:24:18','','','0'), ('14','thực phẩm chức năng','<p>V&aacute;y đầm x&ograve;e l&agrave; một trong những trang phục kh&ocirc;ng thể thiếu của c&aacute;c c&ocirc; n&agrave;ng thục nữ, th&ocirc;ng thường c&aacute;c c&ocirc; g&aacute;i sẽ chọn cho m&igrave;nh những chiếc đầm x&ograve;e với chất liệu cứng như gấm, mềm mại như voan... Tuy nhi&ecirc;n h&egrave; 2017 c&aacute;c sao việt như&nbsp;Angela Phương Trinh, Ngọc Trinh, Thu Thảo&hellip; đều lựa chọn cho m&igrave;nh một chiếc đầm x&ograve;e kate mịn&nbsp;tay loe &oacute;ng mượt nữ t&iacute;nh t&ocirc;n l&ecirc;n v&oacute;c d&aacute;ng người con g&aacute;i v&agrave; cả sự sang trọng ẩn trong sự dịu d&agrave;ng. C&aacute;c n&agrave;ng đ&atilde; c&oacute; cho m&igrave;nh chiếc đầm chất liệu kate mịn&nbsp;n&agrave;y chưa. Đ&acirc;y l&agrave; chất liệu được sử dụng rất nhiều với&nbsp;chất vải mềm mại nhưng lại mang đến sự thoải m&aacute;i cũng như độ sang trọng của n&oacute;. H&atilde;y c&ugrave;ng remoingay tham khảo những mẫu đầm</p>\n','<p>Đầm tay loe với chất liệu kate mịn&nbsp;mềm mại, form d&aacute;ng x&ograve;e rộng cho người mặc sự thoải m&aacute;i duy&ecirc;n d&aacute;ng hơn trong những lần dạo phố hay đi chơi với bạn b&egrave;.</p>\n\n<p>✔&nbsp;Chất liệu: Kate mịn&nbsp;<br />\n✔&nbsp;M&agrave;u sắc: Đen</p>\n\n<p>✔ Kiểu d&aacute;ng: Tay loe, thắt nơ eo</p>\n\n<p>✔ Mục đ&iacute;ch: Dạo phố, dạ tiệc.&nbsp;</p>\n\n<p>✔ Xuất xứ: Việt nam<br />\n✔&nbsp;Sản phẩm đầm tay loe thắt nơ&nbsp;c&oacute; 2 size S - M</p>\n','3','/static/images/product/CustomerComment.jpg','1200000','2017-07-05 15:24:18','','','0');
INSERT INTO `roles` VALUES ('1','SPADMIN','100000');
INSERT INTO `users` VALUES ('100000',NULL,'$2a$10$DWjgKn32UUkM/ryxmnvCTOLvf.5EVLPuhOTVabdp3uMq49nOvhy7G','SPADMIN',NULL,'1','2017-07-05 09:40:36',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'100000',NULL,NULL,NULL,NULL,NULL);
