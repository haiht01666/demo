/*
MySQL Backup
Source Server Version: 5.5.31
Source Database: dfgonlin_manage
Date: 7/23/2017 23:22:21
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
--  Table structure for `articles`
-- ----------------------------
DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) DEFAULT NULL,
  `cdate` datetime DEFAULT NULL,
  `content` varchar(10000) DEFAULT NULL,
  `sub_title` varchar(500) DEFAULT NULL,
  `author` varchar(50) DEFAULT NULL,
  `image_url` varchar(200) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `banners`
-- ----------------------------
DROP TABLE IF EXISTS `banners`;
CREATE TABLE `banners` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `cdate` datetime DEFAULT NULL,
  `image_url` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

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
--  Table structure for `homes`
-- ----------------------------
DROP TABLE IF EXISTS `homes`;
CREATE TABLE `homes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) DEFAULT NULL,
  `cdate` datetime DEFAULT NULL,
  `image_url` varchar(200) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `content` varchar(10000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `orders`
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `cdate` datetime DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

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
  `price` decimal(10,2) DEFAULT NULL,
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
  `value` decimal(10,2) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `revenues_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB AUTO_INCREMENT=100013 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records 
-- ----------------------------
--INSERT INTO `articles` VALUES ('1','NHỮNG XU HƯỚNG TRANG ĐIỂM HOT NHẤT HIỆN NAY CỦA GIỚI TRẺ','2017-07-13 11:31:27','<p>Bạn c&oacute; c&ograve;n nhớ xu hướng son m&agrave;u đỏ n&acirc;u từng l&agrave;m mưa l&agrave;m gi&oacute; một thời chứ? V&agrave; b&acirc;y giờ, kh&ocirc;ng chỉ m&agrave;u son, m&agrave; c&aacute;c c&ocirc; n&agrave;ng c&ograve;n sử dụng sắc m&agrave;u n&agrave;y cho g&ograve; m&aacute; của m&igrave;nh.</p>\n\n<p>Xu hướng trang điểm n&agrave;y sẽ t&ocirc;n l&ecirc;n vẻ tươi tắn, đầy sức sống tr&ecirc;n gương mặt bạn. B&ecirc;n cạnh đ&oacute;, nhiều c&ocirc; n&agrave;ng cũng chia sẻ rằng m&agrave;u m&aacute; ửng đ&oacute; khiến họ cảm thấy bản th&acirc;n trở n&ecirc;n tinh tế, cổ điển hơn hẳn.</p>\n\n<p>Đặc biệt, nếu bạn c&oacute; m&agrave;u da s&aacute;ng th&igrave; đừng ngần ngại thử sức với xu hướng trang điểm n&agrave;y nh&eacute;.&nbsp;Chắc chắn mọi người đều sẽ phải sửng sốt với sự thay đổi của bạn đấy!</p>\n','Nếu vào năm 2016, trào lưu trang điểm đậm với tông màu nude được các cô gái ưu ái lựa chọn thì trong năm nay, phong cách trang điểm nữ tính và tự nhiên được giới trẻ chào đón và hưởng ứng nồng nhiệfdsffffffffffffffffffffffffffffffffffffffdsfdsfsf fdsfdsa fdsafdsafdt.','SPADMIN','/static/images/article/bi-chup-len-luc-nho-long-vit-gai-xinh-bat-ngo-noi-tieng-hinh-3.jpg','1'), ('2','NHỮNG XU HƯỚNG TRANG ĐIỂM HOT NHẤT HIỆN NAY CỦA GIỚI TRẺ','2017-07-13 11:31:27','<p>Bạn c&oacute; c&ograve;n nhớ xu hướng son m&agrave;u đỏ n&acirc;u từng l&agrave;m mưa l&agrave;m gi&oacute; một thời chứ? V&agrave; b&acirc;y giờ, kh&ocirc;ng chỉ m&agrave;u son, m&agrave; c&aacute;c c&ocirc; n&agrave;ng c&ograve;n sử dụng sắc m&agrave;u n&agrave;y cho g&ograve; m&aacute; của m&igrave;nh.</p>\n\n<p>Xu hướng trang điểm n&agrave;y sẽ t&ocirc;n l&ecirc;n vẻ tươi tắn, đầy sức sống tr&ecirc;n gương mặt bạn. B&ecirc;n cạnh đ&oacute;, nhiều c&ocirc; n&agrave;ng cũng chia sẻ rằng m&agrave;u m&aacute; ửng đ&oacute; khiến họ cảm thấy bản th&acirc;n trở n&ecirc;n tinh tế, cổ điển hơn hẳn.</p>\n\n<p>Đặc biệt, nếu bạn c&oacute; m&agrave;u da s&aacute;ng th&igrave; đừng ngần ngại thử sức với xu hướng trang điểm n&agrave;y nh&eacute;.&nbsp;Chắc chắn mọi người đều sẽ phải sửng sốt với sự thay đổi của bạn đấy!</p>\n','Nếu vào năm 2016, trào lưu trang điểm đậm với tông màu nude được các cô gái ưu ái lựa chọn thì trong năm nay, phong cách trang điểm nữ tính và tự nhiên được giới trẻ chào đón và hưởng ứng nồng nhiệt.','SPADMIN','/static/images/article/bi-chup-len-luc-nho-long-vit-gai-xinh-bat-ngo-noi-tieng-hinh-3.jpg','1');
INSERT INTO `banners` VALUES ('1','1','2017-07-22 14:15:51','/static/images/banner/20160913110935_73245.png'), ('2','1','2017-07-22 14:15:51','/static/images/banner/20160913110935_73245.png');
INSERT INTO `categories` VALUES ('1','Thời Trang','thoitrang'), ('2','Mỹ Phẩm','mypham'), ('3','Thực Phẩm Chức Năng','thucphamchucnang');
INSERT INTO `homes` VALUES ('1','Giới Thiệu','2017-07-05 16:04:01','','1','gioi thieu'), ('2','Liên hệ','2017-07-05 16:04:01','','2','lien he');
--INSERT INTO `orders` VALUES ('1','PRO_DISTRIBUTE','2017-07-08 21:51:22','100001','1300.00','1','1','1300.00'), ('2','PRO_DISTRIBUTE','2017-07-08 21:51:47','100002','1300.00','1','1','1300.00'), ('3','SALE_PRO','2017-07-08 21:53:33','100003','652.00','1','1','652.00'), ('4','SALE_MEMBER','2017-07-08 21:54:47','100004','217.00','1','1','217.00'), ('5','SALE_PRO','2017-07-08 21:55:04','100005','652.00','1','1','652.00'), ('6','PRO_DISTRIBUTE','2017-07-08 21:55:16','100006','1300.00','1','1','1300.00'), ('7','PRO_DISTRIBUTE','2017-07-08 21:55:27','100007','1300.00','1','1','1300.00'), ('8','PRO_DISTRIBUTE','2017-07-08 21:55:40','100008','1300.00','1','1','1300.00'), ('9','SALE_PRO','2017-07-08 21:55:48','100009','652.00','1','1','652.00'), ('10','SALE_PRO','2017-07-08 21:55:57','100010','652.00','1','1','652.00'), ('11','SALE_PRO','2017-07-08 21:56:11','100011','652.00','1','1','652.00'), ('12','SALE_MEMBER','2017-07-08 21:56:19','100012','217.00','1','1','217.00');
--INSERT INTO `products` VALUES ('1','Đầm sọc thắt nơ','<p><s><strong>Voan l&agrave; chất liệu mềm mại,</strong></s> m&aacute;t ph&ugrave; hợp cho thời tiết oi bức. Sự mềm mại v&agrave; tho&aacute;ng m&aacute;t của vải voan c&ograve;n mang đến cho nữ giới phong c&aacute;ch l&atilde;ng mạn, nữ t&iacute;nh. Trang hục l&agrave;m từ chất liệu voan mềm mại đem đến cảm gi&aacute;c tươi m&aacute;t v&agrave; quyến rũ. Remoingay xin giới thiệu đến c&aacute;c bạn một sản phẩm thời trang nữ l&agrave;m đi&ecirc;n đảo c&aacute;c n&agrave;ng trong thời gian gần đ&acirc;y đ&oacute; ch&iacute;nh l&agrave;: &Aacute;o tay b&egrave;o k&egrave;m thắt nơ. Sản phẩm c&oacute; thiết kế đơn giản, lịch sự nhưng kh&ocirc;ng k&eacute;m phần thời trang, dễ d&agrave;ng kết hợp với kiểu quần t&acirc;y, quần jean, ch&acirc;n v&aacute;y ngắn. H&atilde;y nhanh tay click mua ngay để được sở hữu v&agrave; hưởng trọn những dịch vụ tốt nhất m&agrave; remoingay mang đến cho c&aacute;c bạn nh&eacute;!&nbsp;</p>\n','<p><strong><a href=\"http://www.remoingay.com/ao-khoac-da-nu.html\">&Aacute;o kho&aacute;c da nữ đẹp</a>&nbsp;hiện n&agrave;y được c&aacute;c n&agrave;ng y&ecirc;u th&iacute;ch bởi đa dạng nhiều m&agrave;u từ m&agrave;u đen, t&iacute;m, trắng, hồng, xanh&hellip; rất trẻ trung v&agrave; nổi bật, c&aacute;c kiểu thiết kế &aacute;o da nữ đa dạng mang h&igrave;nh ảnh một c&ocirc; g&aacute;i lu&ocirc;n trẻ trung, ph&aacute; c&aacute;ch nhưng vẫn lịch sự, vậy c&aacute;c n&agrave;ng c&oacute; hồi hộp với bst c&aacute;c mẫu &aacute;o da nữ h&agrave;n quốc đẹp nhất do m&igrave;nh sưu tầm kh&ocirc;ng nhỉ? &Aacute;o da nữ lửng h&agrave;n quốc l&agrave; kiểu &aacute;o kho&aacute;c nữ kh&ocirc;ng thể thiếu trong tủ đồ c&aacute;c n&agrave;ng từ tuổi teen đến c&aacute;c n&agrave;ng c&ocirc;ng sở, &aacute;o da nữ đẹp style mới c&oacute; nhiều kiểu &aacute;o da nữ lửng đẹp v&agrave; dể thương mang đậm c&aacute; t&iacute;nh, đặc biệt khi mix với &aacute;o thun trơn &ocirc;n v&agrave; quần jean + đ&ocirc;i gi&agrave;y boot cổ cao l&agrave; si&ecirc;u ấn tưởng như người mẫu nh&eacute;.</strong></p>\n\n<ul>\n	<li><a href=\"http://www.remoingay.com/tin-tuc/5-13-mau-ao-da-nu-dang-lung-phong-cach-han-quoc-dep-nhat-hien-nay.html\">13 mẫu &aacute;o da nữ d&aacute;ng lửng phong c&aacute;ch H&agrave;n Quốc đẹp nhất hiện nay</a></li>\n	<li><a href=\"http://www.remoingay.com/tin-tuc/71-4-loai-so-mi-dep-nhat-khi-mac-voi-quan-jeans.html\">4 loại sơ mi đẹp nhất khi mặc với quần jeans</a></li>\n	<li><a href=\"http://www.remoingay.com/tin-tuc/48-phoi-quan-tay-nam-theo-phong-cach-thoi-trang-han-quoc.html\">Phối quần t&acirc;y nam theo phong c&aacute;ch thời trang H&agrave;n Quốc</a></li>\n	<li><a href=\"http://www.remoingay.com/tin-tuc/25-4-cach-bao-quan-ao-khoac-da.html\">4 C&aacute;ch Bảo Quản &Aacute;o Kho&aacute;c Da</a></li>\n	<li><a href=\"http://www.remoingay.com/tin-tuc/53-10-mon-phu-kien-nam-co-ban-nhat-dinh-phai-co.html\">10 m&oacute;n phụ kiện nam cơ bản nhất định phải c&oacute;</a></li>\n	<li><a href=\"http://www.remoingay.com/tin-tuc/4-top-5-mau-ao-khoac-da-nu-xin-dep-duoc-ua-thich-nhat.html\">Top 5 mẫu &aacute;o kho&aacute;c da nữ xịn đẹp được ưa th&iacute;ch nhất</a></li>\n	<li><a href=\"http://www.remoingay.com/tin-tuc/76-5-kieu-quan-cuc-hop-de-mac-voi-so-mi-denim.html\">5 kiểu quần cực hợp để mặc với sơ mi denim</a></li>\n	<li><a href=\"http://www.remoingay.com/tin-tuc/28-xu-huong-phu-kien-thoi-trang-nam-2016.html\">Xu hướng phụ kiện thời trang nam 2016</a></li>\n</ul>\n\n<h2>13 mẫu &aacute;o da nữ d&aacute;ng lửng phong c&aacute;ch H&agrave;n Quốc đẹp nhất</h2>\n\n<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;<img alt=\"\" src=\"http://www.remoingay.com/uploads/news/images/tin-tuc/ao-da-nu-lung-kieu-dep.jpg\" /></p>\n\n<p><img alt=\"\" src=\"http://www.remoingay.com/uploads/news/images/tin-tuc/%C3%A1o-da-n%E1%BB%AF-l%E1%BB%ADng-%C4%91%E1%BA%B9p.jpg\" /></p>\n\n<p><img alt=\"\" src=\"http://www.remoingay.com/uploads/news/images/tin-tuc/%C3%A1o-da-n%E1%BB%AF-x%E1%BB%8Bn-%C4%91%E1%BA%B9p.jpg\" /></p>\n\n<p><img alt=\"\" src=\"http://www.remoingay.com/uploads/news/images/tin-tuc/%C3%A1o-gi%E1%BA%A3-da-n%E1%BB%AF-%C4%91%E1%BA%B9p.jpg\" /></p>\n\n<p>&nbsp;</p>\n\n<p><img alt=\"\" src=\"http://www.remoingay.com/uploads/news/images/tin-tuc/%C3%A1o-kho%C3%A1c-da-n%E1%BB%AF-%C4%91%E1%BA%B9p.jpg\" /></p>\n\n<p><img alt=\"\" src=\"http://www.remoingay.com/uploads/news/images/tin-tuc/%C3%A1o-kho%C3%A1c-da-n%E1%BB%AF-han-quoc-%C4%91%E1%BA%B9p.jpg\" /></p>\n\n<p><img alt=\"\" src=\"http://www.remoingay.com/uploads/news/images/tin-tuc/ao-khoac-da-nu-kieu-dep.jpg\" /></p>\n\n<p>&nbsp;</p>\n\n<p>những kiểu&nbsp;<strong>&aacute;o giả da nữ</strong>&nbsp;n&agrave;y đang l&agrave; mốt b&aacute;n rất chạy, đặc biệt l&agrave;&nbsp;<strong>&aacute;o da nữ zara</strong>, v&igrave; vậy đừng ngần ngại shopping chọn cho m&igrave;nh v&agrave;i kiểu&nbsp;<strong>&aacute;o da nữ</strong>&nbsp;nhiều m&agrave;u si&ecirc;u đẹp n&agrave;y nh&eacute;!</p>\n','1','/static/images/product/20170527090514_24256.jpg','1230000.00','1899-12-31 00:00:00','1','1','1'), ('2','Mỹ phẩm','<p>??m blue tay s?c th?t n?</p>\n','<p>??m blue tay s?c th?t n?121</p>\n','2','/static/images/product/20170705100712_59548.jpg','1000000.00','1899-12-31 00:00:00','1','1','1'), ('3','thực phẩm chức năng1','<p>V&aacute;y đầm x&ograve;e l&agrave; một trong những trang phục kh&ocirc;ng thể thiếu của c&aacute;c c&ocirc; n&agrave;ng thục nữ, th&ocirc;ng thường c&aacute;c c&ocirc; g&aacute;i sẽ chọn cho m&igrave;nh những chiếc đầm x&ograve;e với chất liệu cứng như gấm, mềm mại như voan... Tuy nhi&ecirc;n h&egrave; 2017 c&aacute;c sao việt như&nbsp;Angela Phương Trinh, Ngọc Trinh, Thu Thảo&hellip; đều lựa chọn cho m&igrave;nh một chiếc đầm x&ograve;e kate mịn&nbsp;tay loe &oacute;ng mượt nữ t&iacute;nh t&ocirc;n l&ecirc;n v&oacute;c d&aacute;ng người con g&aacute;i v&agrave; cả sự sang trọng ẩn trong sự dịu d&agrave;ng. C&aacute;c n&agrave;ng đ&atilde; c&oacute; cho m&igrave;nh chiếc đầm chất liệu kate mịn&nbsp;n&agrave;y chưa. Đ&acirc;y l&agrave; chất liệu được sử dụng rất nhiều với&nbsp;chất vải mềm mại nhưng lại mang đến sự thoải m&aacute;i cũng như độ sang trọng của n&oacute;. H&atilde;y c&ugrave;ng remoingay tham khảo những mẫu đầm</p>\n','<p>Đầm tay loe với chất liệu kate mịn&nbsp;mềm mại, form d&aacute;ng x&ograve;e rộng cho người mặc sự thoải m&aacute;i duy&ecirc;n d&aacute;ng hơn trong những lần dạo phố hay đi chơi với bạn b&egrave;.</p>\n\n<p>✔&nbsp;Chất liệu: Kate mịn&nbsp;<br />\n✔&nbsp;M&agrave;u sắc: Đen</p>\n\n<p>✔ Kiểu d&aacute;ng: Tay loe, thắt nơ eo</p>\n\n<p>✔ Mục đ&iacute;ch: Dạo phố, dạ tiệc.&nbsp;</p>\n\n<p>✔ Xuất xứ: Việt nam<br />\n✔&nbsp;Sản phẩm đầm tay loe thắt nơ&nbsp;c&oacute; 2 size S - M</p>\n','3','/static/images/product/20170705100712_59548.jpg','1200000.00','2017-07-05 15:24:18','','','0'), ('4','thực phẩm chức năng','<p>V&aacute;y đầm x&ograve;e l&agrave; một trong những trang phục kh&ocirc;ng thể thiếu của c&aacute;c c&ocirc; n&agrave;ng thục nữ, th&ocirc;ng thường c&aacute;c c&ocirc; g&aacute;i sẽ chọn cho m&igrave;nh những chiếc đầm x&ograve;e với chất liệu cứng như gấm, mềm mại như voan... Tuy nhi&ecirc;n h&egrave; 2017 c&aacute;c sao việt như&nbsp;Angela Phương Trinh, Ngọc Trinh, Thu Thảo&hellip; đều lựa chọn cho m&igrave;nh một chiếc đầm x&ograve;e kate mịn&nbsp;tay loe &oacute;ng mượt nữ t&iacute;nh t&ocirc;n l&ecirc;n v&oacute;c d&aacute;ng người con g&aacute;i v&agrave; cả sự sang trọng ẩn trong sự dịu d&agrave;ng. C&aacute;c n&agrave;ng đ&atilde; c&oacute; cho m&igrave;nh chiếc đầm chất liệu kate mịn&nbsp;n&agrave;y chưa. Đ&acirc;y l&agrave; chất liệu được sử dụng rất nhiều với&nbsp;chất vải mềm mại nhưng lại mang đến sự thoải m&aacute;i cũng như độ sang trọng của n&oacute;. H&atilde;y c&ugrave;ng remoingay tham khảo những mẫu đầm</p>\n','<p>Đầm tay loe với chất liệu kate mịn&nbsp;mềm mại, form d&aacute;ng x&ograve;e rộng cho người mặc sự thoải m&aacute;i duy&ecirc;n d&aacute;ng hơn trong những lần dạo phố hay đi chơi với bạn b&egrave;.</p>\n\n<p>✔&nbsp;Chất liệu: Kate mịn&nbsp;<br />\n✔&nbsp;M&agrave;u sắc: Đen</p>\n\n<p>✔ Kiểu d&aacute;ng: Tay loe, thắt nơ eo</p>\n\n<p>✔ Mục đ&iacute;ch: Dạo phố, dạ tiệc.&nbsp;</p>\n\n<p>✔ Xuất xứ: Việt nam<br />\n✔&nbsp;Sản phẩm đầm tay loe thắt nơ&nbsp;c&oacute; 2 size S - M</p>\n','3','/static/images/product/20170705100712_59548.jpg','1200000.00','2017-07-05 15:24:18','','','0'), ('5','thực phẩm chức năng','<p>V&aacute;y đầm x&ograve;e l&agrave; một trong những trang phục kh&ocirc;ng thể thiếu của c&aacute;c c&ocirc; n&agrave;ng thục nữ, th&ocirc;ng thường c&aacute;c c&ocirc; g&aacute;i sẽ chọn cho m&igrave;nh những chiếc đầm x&ograve;e với chất liệu cứng như gấm, mềm mại như voan... Tuy nhi&ecirc;n h&egrave; 2017 c&aacute;c sao việt như&nbsp;Angela Phương Trinh, Ngọc Trinh, Thu Thảo&hellip; đều lựa chọn cho m&igrave;nh một chiếc đầm x&ograve;e kate mịn&nbsp;tay loe &oacute;ng mượt nữ t&iacute;nh t&ocirc;n l&ecirc;n v&oacute;c d&aacute;ng người con g&aacute;i v&agrave; cả sự sang trọng ẩn trong sự dịu d&agrave;ng. C&aacute;c n&agrave;ng đ&atilde; c&oacute; cho m&igrave;nh chiếc đầm chất liệu kate mịn&nbsp;n&agrave;y chưa. Đ&acirc;y l&agrave; chất liệu được sử dụng rất nhiều với&nbsp;chất vải mềm mại nhưng lại mang đến sự thoải m&aacute;i cũng như độ sang trọng của n&oacute;. H&atilde;y c&ugrave;ng remoingay tham khảo những mẫu đầm</p>\n','<p>Đầm tay loe với chất liệu kate mịn&nbsp;mềm mại, form d&aacute;ng x&ograve;e rộng cho người mặc sự thoải m&aacute;i duy&ecirc;n d&aacute;ng hơn trong những lần dạo phố hay đi chơi với bạn b&egrave;.</p>\n\n<p>✔&nbsp;Chất liệu: Kate mịn&nbsp;<br />\n✔&nbsp;M&agrave;u sắc: Đen</p>\n\n<p>✔ Kiểu d&aacute;ng: Tay loe, thắt nơ eo</p>\n\n<p>✔ Mục đ&iacute;ch: Dạo phố, dạ tiệc.&nbsp;</p>\n\n<p>✔ Xuất xứ: Việt nam<br />\n✔&nbsp;Sản phẩm đầm tay loe thắt nơ&nbsp;c&oacute; 2 size S - M</p>\n','3','/static/images/product/20170705100712_59548.jpg','1200000.00','2017-07-05 15:24:18','','','0'), ('6','thực phẩm chức năng','<p>V&aacute;y đầm x&ograve;e l&agrave; một trong những trang phục kh&ocirc;ng thể thiếu của c&aacute;c c&ocirc; n&agrave;ng thục nữ, th&ocirc;ng thường c&aacute;c c&ocirc; g&aacute;i sẽ chọn cho m&igrave;nh những chiếc đầm x&ograve;e với chất liệu cứng như gấm, mềm mại như voan... Tuy nhi&ecirc;n h&egrave; 2017 c&aacute;c sao việt như&nbsp;Angela Phương Trinh, Ngọc Trinh, Thu Thảo&hellip; đều lựa chọn cho m&igrave;nh một chiếc đầm x&ograve;e kate mịn&nbsp;tay loe &oacute;ng mượt nữ t&iacute;nh t&ocirc;n l&ecirc;n v&oacute;c d&aacute;ng người con g&aacute;i v&agrave; cả sự sang trọng ẩn trong sự dịu d&agrave;ng. C&aacute;c n&agrave;ng đ&atilde; c&oacute; cho m&igrave;nh chiếc đầm chất liệu kate mịn&nbsp;n&agrave;y chưa. Đ&acirc;y l&agrave; chất liệu được sử dụng rất nhiều với&nbsp;chất vải mềm mại nhưng lại mang đến sự thoải m&aacute;i cũng như độ sang trọng của n&oacute;. H&atilde;y c&ugrave;ng remoingay tham khảo những mẫu đầm</p>\n','<p>Đầm tay loe với chất liệu kate mịn&nbsp;mềm mại, form d&aacute;ng x&ograve;e rộng cho người mặc sự thoải m&aacute;i duy&ecirc;n d&aacute;ng hơn trong những lần dạo phố hay đi chơi với bạn b&egrave;.</p>\n\n<p>✔&nbsp;Chất liệu: Kate mịn&nbsp;<br />\n✔&nbsp;M&agrave;u sắc: Đen</p>\n\n<p>✔ Kiểu d&aacute;ng: Tay loe, thắt nơ eo</p>\n\n<p>✔ Mục đ&iacute;ch: Dạo phố, dạ tiệc.&nbsp;</p>\n\n<p>✔ Xuất xứ: Việt nam<br />\n✔&nbsp;Sản phẩm đầm tay loe thắt nơ&nbsp;c&oacute; 2 size S - M</p>\n','3','/static/images/product/20170705100712_59548.jpg','1200000.00','2017-07-05 15:24:18','','','0'), ('7','thực phẩm chức năng','<p>V&aacute;y đầm x&ograve;e l&agrave; một trong những trang phục kh&ocirc;ng thể thiếu của c&aacute;c c&ocirc; n&agrave;ng thục nữ, th&ocirc;ng thường c&aacute;c c&ocirc; g&aacute;i sẽ chọn cho m&igrave;nh những chiếc đầm x&ograve;e với chất liệu cứng như gấm, mềm mại như voan... Tuy nhi&ecirc;n h&egrave; 2017 c&aacute;c sao việt như&nbsp;Angela Phương Trinh, Ngọc Trinh, Thu Thảo&hellip; đều lựa chọn cho m&igrave;nh một chiếc đầm x&ograve;e kate mịn&nbsp;tay loe &oacute;ng mượt nữ t&iacute;nh t&ocirc;n l&ecirc;n v&oacute;c d&aacute;ng người con g&aacute;i v&agrave; cả sự sang trọng ẩn trong sự dịu d&agrave;ng. C&aacute;c n&agrave;ng đ&atilde; c&oacute; cho m&igrave;nh chiếc đầm chất liệu kate mịn&nbsp;n&agrave;y chưa. Đ&acirc;y l&agrave; chất liệu được sử dụng rất nhiều với&nbsp;chất vải mềm mại nhưng lại mang đến sự thoải m&aacute;i cũng như độ sang trọng của n&oacute;. H&atilde;y c&ugrave;ng remoingay tham khảo những mẫu đầm</p>\n','<p>Đầm tay loe với chất liệu kate mịn&nbsp;mềm mại, form d&aacute;ng x&ograve;e rộng cho người mặc sự thoải m&aacute;i duy&ecirc;n d&aacute;ng hơn trong những lần dạo phố hay đi chơi với bạn b&egrave;.</p>\n\n<p>✔&nbsp;Chất liệu: Kate mịn&nbsp;<br />\n✔&nbsp;M&agrave;u sắc: Đen</p>\n\n<p>✔ Kiểu d&aacute;ng: Tay loe, thắt nơ eo</p>\n\n<p>✔ Mục đ&iacute;ch: Dạo phố, dạ tiệc.&nbsp;</p>\n\n<p>✔ Xuất xứ: Việt nam<br />\n✔&nbsp;Sản phẩm đầm tay loe thắt nơ&nbsp;c&oacute; 2 size S - M</p>\n','3','/static/images/product/20170705100712_59548.jpg','1200000.00','2017-07-05 15:24:18','','','0'), ('8','thực phẩm chức năng','<p>V&aacute;y đầm x&ograve;e l&agrave; một trong những trang phục kh&ocirc;ng thể thiếu của c&aacute;c c&ocirc; n&agrave;ng thục nữ, th&ocirc;ng thường c&aacute;c c&ocirc; g&aacute;i sẽ chọn cho m&igrave;nh những chiếc đầm x&ograve;e với chất liệu cứng như gấm, mềm mại như voan... Tuy nhi&ecirc;n h&egrave; 2017 c&aacute;c sao việt như&nbsp;Angela Phương Trinh, Ngọc Trinh, Thu Thảo&hellip; đều lựa chọn cho m&igrave;nh một chiếc đầm x&ograve;e kate mịn&nbsp;tay loe &oacute;ng mượt nữ t&iacute;nh t&ocirc;n l&ecirc;n v&oacute;c d&aacute;ng người con g&aacute;i v&agrave; cả sự sang trọng ẩn trong sự dịu d&agrave;ng. C&aacute;c n&agrave;ng đ&atilde; c&oacute; cho m&igrave;nh chiếc đầm chất liệu kate mịn&nbsp;n&agrave;y chưa. Đ&acirc;y l&agrave; chất liệu được sử dụng rất nhiều với&nbsp;chất vải mềm mại nhưng lại mang đến sự thoải m&aacute;i cũng như độ sang trọng của n&oacute;. H&atilde;y c&ugrave;ng remoingay tham khảo những mẫu đầm</p>\n','<p>Đầm tay loe với chất liệu kate mịn&nbsp;mềm mại, form d&aacute;ng x&ograve;e rộng cho người mặc sự thoải m&aacute;i duy&ecirc;n d&aacute;ng hơn trong những lần dạo phố hay đi chơi với bạn b&egrave;.</p>\n\n<p>✔&nbsp;Chất liệu: Kate mịn&nbsp;<br />\n✔&nbsp;M&agrave;u sắc: Đen</p>\n\n<p>✔ Kiểu d&aacute;ng: Tay loe, thắt nơ eo</p>\n\n<p>✔ Mục đ&iacute;ch: Dạo phố, dạ tiệc.&nbsp;</p>\n\n<p>✔ Xuất xứ: Việt nam<br />\n✔&nbsp;Sản phẩm đầm tay loe thắt nơ&nbsp;c&oacute; 2 size S - M</p>\n','3','/static/images/product/20170705100712_59548.jpg','1200000.00','2017-07-05 15:24:18','','','0'), ('9','thực phẩm chức năng','<p>V&aacute;y đầm x&ograve;e l&agrave; một trong những trang phục kh&ocirc;ng thể thiếu của c&aacute;c c&ocirc; n&agrave;ng thục nữ, th&ocirc;ng thường c&aacute;c c&ocirc; g&aacute;i sẽ chọn cho m&igrave;nh những chiếc đầm x&ograve;e với chất liệu cứng như gấm, mềm mại như voan... Tuy nhi&ecirc;n h&egrave; 2017 c&aacute;c sao việt như&nbsp;Angela Phương Trinh, Ngọc Trinh, Thu Thảo&hellip; đều lựa chọn cho m&igrave;nh một chiếc đầm x&ograve;e kate mịn&nbsp;tay loe &oacute;ng mượt nữ t&iacute;nh t&ocirc;n l&ecirc;n v&oacute;c d&aacute;ng người con g&aacute;i v&agrave; cả sự sang trọng ẩn trong sự dịu d&agrave;ng. C&aacute;c n&agrave;ng đ&atilde; c&oacute; cho m&igrave;nh chiếc đầm chất liệu kate mịn&nbsp;n&agrave;y chưa. Đ&acirc;y l&agrave; chất liệu được sử dụng rất nhiều với&nbsp;chất vải mềm mại nhưng lại mang đến sự thoải m&aacute;i cũng như độ sang trọng của n&oacute;. H&atilde;y c&ugrave;ng remoingay tham khảo những mẫu đầm</p>\n','<p>Đầm tay loe với chất liệu kate mịn&nbsp;mềm mại, form d&aacute;ng x&ograve;e rộng cho người mặc sự thoải m&aacute;i duy&ecirc;n d&aacute;ng hơn trong những lần dạo phố hay đi chơi với bạn b&egrave;.</p>\n\n<p>✔&nbsp;Chất liệu: Kate mịn&nbsp;<br />\n✔&nbsp;M&agrave;u sắc: Đen</p>\n\n<p>✔ Kiểu d&aacute;ng: Tay loe, thắt nơ eo</p>\n\n<p>✔ Mục đ&iacute;ch: Dạo phố, dạ tiệc.&nbsp;</p>\n\n<p>✔ Xuất xứ: Việt nam<br />\n✔&nbsp;Sản phẩm đầm tay loe thắt nơ&nbsp;c&oacute; 2 size S - M</p>\n','3','/static/images/product/20170705100712_59548.jpg','1200000.00','2017-07-05 15:24:18','','','0'), ('10','thực phẩm chức năng','<p>V&aacute;y đầm x&ograve;e l&agrave; một trong những trang phục kh&ocirc;ng thể thiếu của c&aacute;c c&ocirc; n&agrave;ng thục nữ, th&ocirc;ng thường c&aacute;c c&ocirc; g&aacute;i sẽ chọn cho m&igrave;nh những chiếc đầm x&ograve;e với chất liệu cứng như gấm, mềm mại như voan... Tuy nhi&ecirc;n h&egrave; 2017 c&aacute;c sao việt như&nbsp;Angela Phương Trinh, Ngọc Trinh, Thu Thảo&hellip; đều lựa chọn cho m&igrave;nh một chiếc đầm x&ograve;e kate mịn&nbsp;tay loe &oacute;ng mượt nữ t&iacute;nh t&ocirc;n l&ecirc;n v&oacute;c d&aacute;ng người con g&aacute;i v&agrave; cả sự sang trọng ẩn trong sự dịu d&agrave;ng. C&aacute;c n&agrave;ng đ&atilde; c&oacute; cho m&igrave;nh chiếc đầm chất liệu kate mịn&nbsp;n&agrave;y chưa. Đ&acirc;y l&agrave; chất liệu được sử dụng rất nhiều với&nbsp;chất vải mềm mại nhưng lại mang đến sự thoải m&aacute;i cũng như độ sang trọng của n&oacute;. H&atilde;y c&ugrave;ng remoingay tham khảo những mẫu đầm</p>\n','<p>Đầm tay loe với chất liệu kate mịn&nbsp;mềm mại, form d&aacute;ng x&ograve;e rộng cho người mặc sự thoải m&aacute;i duy&ecirc;n d&aacute;ng hơn trong những lần dạo phố hay đi chơi với bạn b&egrave;.</p>\n\n<p>✔&nbsp;Chất liệu: Kate mịn&nbsp;<br />\n✔&nbsp;M&agrave;u sắc: Đen</p>\n\n<p>✔ Kiểu d&aacute;ng: Tay loe, thắt nơ eo</p>\n\n<p>✔ Mục đ&iacute;ch: Dạo phố, dạ tiệc.&nbsp;</p>\n\n<p>✔ Xuất xứ: Việt nam<br />\n✔&nbsp;Sản phẩm đầm tay loe thắt nơ&nbsp;c&oacute; 2 size S - M</p>\n','3','/static/images/product/20170705100712_59548.jpg','1200000.00','2017-07-05 15:24:18','','','0'), ('11','thực phẩm chức năng','<p>V&aacute;y đầm x&ograve;e l&agrave; một trong những trang phục kh&ocirc;ng thể thiếu của c&aacute;c c&ocirc; n&agrave;ng thục nữ, th&ocirc;ng thường c&aacute;c c&ocirc; g&aacute;i sẽ chọn cho m&igrave;nh những chiếc đầm x&ograve;e với chất liệu cứng như gấm, mềm mại như voan... Tuy nhi&ecirc;n h&egrave; 2017 c&aacute;c sao việt như&nbsp;Angela Phương Trinh, Ngọc Trinh, Thu Thảo&hellip; đều lựa chọn cho m&igrave;nh một chiếc đầm x&ograve;e kate mịn&nbsp;tay loe &oacute;ng mượt nữ t&iacute;nh t&ocirc;n l&ecirc;n v&oacute;c d&aacute;ng người con g&aacute;i v&agrave; cả sự sang trọng ẩn trong sự dịu d&agrave;ng. C&aacute;c n&agrave;ng đ&atilde; c&oacute; cho m&igrave;nh chiếc đầm chất liệu kate mịn&nbsp;n&agrave;y chưa. Đ&acirc;y l&agrave; chất liệu được sử dụng rất nhiều với&nbsp;chất vải mềm mại nhưng lại mang đến sự thoải m&aacute;i cũng như độ sang trọng của n&oacute;. H&atilde;y c&ugrave;ng remoingay tham khảo những mẫu đầm</p>\n','<p>Đầm tay loe với chất liệu kate mịn&nbsp;mềm mại, form d&aacute;ng x&ograve;e rộng cho người mặc sự thoải m&aacute;i duy&ecirc;n d&aacute;ng hơn trong những lần dạo phố hay đi chơi với bạn b&egrave;.</p>\n\n<p>✔&nbsp;Chất liệu: Kate mịn&nbsp;<br />\n✔&nbsp;M&agrave;u sắc: Đen</p>\n\n<p>✔ Kiểu d&aacute;ng: Tay loe, thắt nơ eo</p>\n\n<p>✔ Mục đ&iacute;ch: Dạo phố, dạ tiệc.&nbsp;</p>\n\n<p>✔ Xuất xứ: Việt nam<br />\n✔&nbsp;Sản phẩm đầm tay loe thắt nơ&nbsp;c&oacute; 2 size S - M</p>\n','3','/static/images/product/20170705100712_59548.jpg','1200000.00','2017-07-05 15:24:18','','','0'), ('12','thực phẩm chức năng','<p>V&aacute;y đầm x&ograve;e l&agrave; một trong những trang phục kh&ocirc;ng thể thiếu của c&aacute;c c&ocirc; n&agrave;ng thục nữ, th&ocirc;ng thường c&aacute;c c&ocirc; g&aacute;i sẽ chọn cho m&igrave;nh những chiếc đầm x&ograve;e với chất liệu cứng như gấm, mềm mại như voan... Tuy nhi&ecirc;n h&egrave; 2017 c&aacute;c sao việt như&nbsp;Angela Phương Trinh, Ngọc Trinh, Thu Thảo&hellip; đều lựa chọn cho m&igrave;nh một chiếc đầm x&ograve;e kate mịn&nbsp;tay loe &oacute;ng mượt nữ t&iacute;nh t&ocirc;n l&ecirc;n v&oacute;c d&aacute;ng người con g&aacute;i v&agrave; cả sự sang trọng ẩn trong sự dịu d&agrave;ng. C&aacute;c n&agrave;ng đ&atilde; c&oacute; cho m&igrave;nh chiếc đầm chất liệu kate mịn&nbsp;n&agrave;y chưa. Đ&acirc;y l&agrave; chất liệu được sử dụng rất nhiều với&nbsp;chất vải mềm mại nhưng lại mang đến sự thoải m&aacute;i cũng như độ sang trọng của n&oacute;. H&atilde;y c&ugrave;ng remoingay tham khảo những mẫu đầm</p>\n','<p>Đầm tay loe với chất liệu kate mịn&nbsp;mềm mại, form d&aacute;ng x&ograve;e rộng cho người mặc sự thoải m&aacute;i duy&ecirc;n d&aacute;ng hơn trong những lần dạo phố hay đi chơi với bạn b&egrave;.</p>\n\n<p>✔&nbsp;Chất liệu: Kate mịn&nbsp;<br />\n✔&nbsp;M&agrave;u sắc: Đen</p>\n\n<p>✔ Kiểu d&aacute;ng: Tay loe, thắt nơ eo</p>\n\n<p>✔ Mục đ&iacute;ch: Dạo phố, dạ tiệc.&nbsp;</p>\n\n<p>✔ Xuất xứ: Việt nam<br />\n✔&nbsp;Sản phẩm đầm tay loe thắt nơ&nbsp;c&oacute; 2 size S - M</p>\n','3','/static/images/product/20170705100712_59548.jpg','1200000.00','2017-07-05 15:24:18','','','0'), ('13','thực phẩm chức năng','<p>V&aacute;y đầm x&ograve;e l&agrave; một trong những trang phục kh&ocirc;ng thể thiếu của c&aacute;c c&ocirc; n&agrave;ng thục nữ, th&ocirc;ng thường c&aacute;c c&ocirc; g&aacute;i sẽ chọn cho m&igrave;nh những chiếc đầm x&ograve;e với chất liệu cứng như gấm, mềm mại như voan... Tuy nhi&ecirc;n h&egrave; 2017 c&aacute;c sao việt như&nbsp;Angela Phương Trinh, Ngọc Trinh, Thu Thảo&hellip; đều lựa chọn cho m&igrave;nh một chiếc đầm x&ograve;e kate mịn&nbsp;tay loe &oacute;ng mượt nữ t&iacute;nh t&ocirc;n l&ecirc;n v&oacute;c d&aacute;ng người con g&aacute;i v&agrave; cả sự sang trọng ẩn trong sự dịu d&agrave;ng. C&aacute;c n&agrave;ng đ&atilde; c&oacute; cho m&igrave;nh chiếc đầm chất liệu kate mịn&nbsp;n&agrave;y chưa. Đ&acirc;y l&agrave; chất liệu được sử dụng rất nhiều với&nbsp;chất vải mềm mại nhưng lại mang đến sự thoải m&aacute;i cũng như độ sang trọng của n&oacute;. H&atilde;y c&ugrave;ng remoingay tham khảo những mẫu đầm</p>\n','<p>Đầm tay loe với chất liệu kate mịn&nbsp;mềm mại, form d&aacute;ng x&ograve;e rộng cho người mặc sự thoải m&aacute;i duy&ecirc;n d&aacute;ng hơn trong những lần dạo phố hay đi chơi với bạn b&egrave;.</p>\n\n<p>✔&nbsp;Chất liệu: Kate mịn&nbsp;<br />\n✔&nbsp;M&agrave;u sắc: Đen</p>\n\n<p>✔ Kiểu d&aacute;ng: Tay loe, thắt nơ eo</p>\n\n<p>✔ Mục đ&iacute;ch: Dạo phố, dạ tiệc.&nbsp;</p>\n\n<p>✔ Xuất xứ: Việt nam<br />\n✔&nbsp;Sản phẩm đầm tay loe thắt nơ&nbsp;c&oacute; 2 size S - M</p>\n','3','/static/images/product/20170705100712_59548.jpg','1200000.00','2017-07-05 15:24:18','','','0'), ('14','thực phẩm chức năng','<p>V&aacute;y đầm x&ograve;e l&agrave; một trong những trang phục kh&ocirc;ng thể thiếu của c&aacute;c c&ocirc; n&agrave;ng thục nữ, th&ocirc;ng thường c&aacute;c c&ocirc; g&aacute;i sẽ chọn cho m&igrave;nh những chiếc đầm x&ograve;e với chất liệu cứng như gấm, mềm mại như voan... Tuy nhi&ecirc;n h&egrave; 2017 c&aacute;c sao việt như&nbsp;Angela Phương Trinh, Ngọc Trinh, Thu Thảo&hellip; đều lựa chọn cho m&igrave;nh một chiếc đầm x&ograve;e kate mịn&nbsp;tay loe &oacute;ng mượt nữ t&iacute;nh t&ocirc;n l&ecirc;n v&oacute;c d&aacute;ng người con g&aacute;i v&agrave; cả sự sang trọng ẩn trong sự dịu d&agrave;ng. C&aacute;c n&agrave;ng đ&atilde; c&oacute; cho m&igrave;nh chiếc đầm chất liệu kate mịn&nbsp;n&agrave;y chưa. Đ&acirc;y l&agrave; chất liệu được sử dụng rất nhiều với&nbsp;chất vải mềm mại nhưng lại mang đến sự thoải m&aacute;i cũng như độ sang trọng của n&oacute;. H&atilde;y c&ugrave;ng remoingay tham khảo những mẫu đầm</p>\n','<p>Đầm tay loe với chất liệu kate mịn&nbsp;mềm mại, form d&aacute;ng x&ograve;e rộng cho người mặc sự thoải m&aacute;i duy&ecirc;n d&aacute;ng hơn trong những lần dạo phố hay đi chơi với bạn b&egrave;.</p>\n\n<p>✔&nbsp;Chất liệu: Kate mịn&nbsp;<br />\n✔&nbsp;M&agrave;u sắc: Đen</p>\n\n<p>✔ Kiểu d&aacute;ng: Tay loe, thắt nơ eo</p>\n\n<p>✔ Mục đ&iacute;ch: Dạo phố, dạ tiệc.&nbsp;</p>\n\n<p>✔ Xuất xứ: Việt nam<br />\n✔&nbsp;Sản phẩm đầm tay loe thắt nơ&nbsp;c&oacute; 2 size S - M</p>\n','3','/static/images/product/20170705100712_59548.jpg','1200000.00','2017-07-05 15:24:18','','','0');
--INSERT INTO `revenues` VALUES ('1','PRO_DISTRIBUTE','2017-07-08 21:51:22','100000','130.00','3'), ('2','PRO_DISTRIBUTE','2017-07-08 21:51:47','100001','130.00','3'), ('3','SALE_PRO','2017-07-08 21:53:33','100002','65.20','3'), ('4','SALE_MEMBER','2017-07-08 21:54:47','100001','21.70','3'), ('5','SALE_PRO','2017-07-08 21:55:04','100001','65.20','3'), ('6','PRO_DISTRIBUTE','2017-07-08 21:55:16','100001','130.00','3'), ('7','PRO_DISTRIBUTE','2017-07-08 21:55:27','100002','130.00','3'), ('8','PRO_DISTRIBUTE','2017-07-08 21:55:40','100006','130.00','3'), ('9','SALE_PRO','2017-07-08 21:55:48','100001','65.20','3'), ('10','SALE_PRO','2017-07-08 21:55:57','100002','65.20','3'), ('11','SALE_PRO','2017-07-08 21:56:11','100006','65.20','3'), ('12','SALE_MEMBER','2017-07-08 21:56:19','100002','21.70','3');
--INSERT INTO `roles` VALUES ('1','SPADMIN','100000'), ('2','STAFF','100001'), ('3','STAFF','100002'), ('4','STAFF','100003'), ('5','STAFF','100004'), ('6','STAFF','100005'), ('7','STAFF','100006'), ('8','STAFF','100007'), ('9','STAFF','100008'), ('10','STAFF','100009'), ('11','STAFF','100010'), ('12','STAFF','100011'), ('13','STAFF','100012');
--INSERT INTO `users` VALUES ('100000',NULL,'$2a$10$DWjgKn32UUkM/ryxmnvCTOLvf.5EVLPuhOTVabdp3uMq49nOvhy7G','SPADMIN',NULL,'1','2017-06-30 21:42:52',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'100000',NULL,NULL,NULL,NULL,NULL), ('100001','haifpt2013@gmail.com','$2a$10$RKCa1VJxZCI6D.7yfi/dheMoGK2xYyOd6Lay.tglwiaXjD2cU2ISq','Nhung','986431410','1','2017-07-08 21:51:22','2017-07-08 21:57:46','100000','TP Bank','00258630001','Pham Hung - Cay Giay - Ha Noi',NULL,NULL,'100000-100001','3','2017-09-04','100001','Gần công ty cơ khí 19-8 Thắng Trí - Minh Trí - Sóc',NULL), ('100002',NULL,NULL,NULL,NULL,'0','2017-07-08 21:51:47',NULL,'100001',NULL,NULL,NULL,NULL,NULL,'100000-100001-100002','3',NULL,NULL,NULL,NULL), ('100003',NULL,NULL,NULL,NULL,'0','2017-07-08 21:53:33',NULL,'100002',NULL,NULL,NULL,NULL,NULL,'100000-100001-100002-100003','2',NULL,NULL,NULL,NULL), ('100004',NULL,NULL,NULL,NULL,'0','2017-07-08 21:54:47',NULL,'100001',NULL,NULL,NULL,NULL,NULL,'100000-100001-100004','1',NULL,NULL,NULL,NULL), ('100005',NULL,NULL,NULL,NULL,'0','2017-07-08 21:55:04',NULL,'100001',NULL,NULL,NULL,NULL,NULL,'100000-100001-100005','2',NULL,NULL,NULL,NULL), ('100006',NULL,NULL,NULL,NULL,'0','2017-07-08 21:55:16',NULL,'100001',NULL,NULL,NULL,NULL,NULL,'100000-100001-100006','3',NULL,NULL,NULL,NULL), ('100007',NULL,NULL,NULL,NULL,'0','2017-07-08 21:55:27',NULL,'100002',NULL,NULL,NULL,NULL,NULL,'100000-100001-100002-100007','3',NULL,NULL,NULL,NULL), ('100008',NULL,NULL,NULL,NULL,'0','2017-07-08 21:55:40',NULL,'100006',NULL,NULL,NULL,NULL,NULL,'100000-100001-100006-100008','3',NULL,NULL,NULL,NULL), ('100009',NULL,NULL,NULL,NULL,'0','2017-07-08 21:55:48',NULL,'100001',NULL,NULL,NULL,NULL,NULL,'100000-100001-100009','2',NULL,NULL,NULL,NULL), ('100010',NULL,NULL,NULL,NULL,'0','2017-07-08 21:55:57',NULL,'100002',NULL,NULL,NULL,NULL,NULL,'100000-100001-100002-100010','2',NULL,NULL,NULL,NULL), ('100011',NULL,NULL,NULL,NULL,'0','2017-07-08 21:56:11',NULL,'100006',NULL,NULL,NULL,NULL,NULL,'100000-100001-100006-100011','2',NULL,NULL,NULL,NULL), ('100012',NULL,NULL,NULL,NULL,'0','2017-07-08 21:56:18',NULL,'100002',NULL,NULL,NULL,NULL,NULL,'100000-100001-100002-100012','1',NULL,NULL,NULL,NULL);
-- Insert user 
Insert into users(id,password,enable,name,child_id,cdate) values (100000,'$2a$10$DWjgKn32UUkM/ryxmnvCTOLvf.5EVLPuhOTVabdp3uMq49nOvhy7G',true,'SPADMIN','100000',now());
Insert into roles(id,role,user_id) values (1,'SPADMIN',100000);
-- add columl child id to table revenues
ALTER TABLE revenues
ADD child_id int(11) ;
