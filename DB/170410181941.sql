/*
MySQL Backup
Source Server Version: 5.5.52
Source Database: hannd_123
Date: 4/11/2017 17:50:56
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
--  Table structure for `feedbacks`
-- ----------------------------
DROP TABLE IF EXISTS `feedbacks`;
CREATE TABLE `feedbacks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) DEFAULT NULL,
  `cdate` datetime DEFAULT NULL,
  `content` varchar(200) DEFAULT NULL,
  `user_name` varchar(50) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `feedbacks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `orders`
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `cdate` datetime DEFAULT NULL,
  `user_name` varchar(50) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `price` double DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `total` double DEFAULT NULL,
  `proactive` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

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
INSERT INTO `feedbacks` VALUES ('1','1','2017-04-11 22:11:02','1','SPADMIN','100000');
INSERT INTO `orders` VALUES ('1','sp1','2017-04-11 23:34:26','SPADMIN','100000','100000','4','4','400000',NULL), ('2','sp1','2017-04-11 23:34:33','SPADMIN','100000','100000','4','4','400000',NULL), ('3','sp1','2017-04-11 23:36:10','SPADMIN','100000','100000','4','4','400000',NULL);
INSERT INTO `roles` VALUES ('1','SPADMIN','100000');
INSERT INTO `users` VALUES ('100000','han.nguyendinh45@gmail.com','$2a$10$A8S9DkkrJKAWPgUPppaGSOHdIDh/8HBlTahTvsRJm.T26eu1xgbSC','SPADMIN','09855849891','1','2017-04-10 09:14:15',NULL,NULL,'TP Bank','00130200001','hoan kiem ha noi','NGUYEN DINH HAN',NULL,'100000',NULL,'1989-04-05','125280711','thuan thanh bac ninh','data:image/jpeg;base64,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');
