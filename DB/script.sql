-- create database 
CREATE DATABASE IF NOT EXISTS DB_MANAGE_STAFF;

USE DB_MANAGE_STAFF;

-- create table users
CREATE TABLE DB_MANAGE_STAFF.users(
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
)ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

-- create table roles
CREATE TABLE DB_MANAGE_STAFF.roles(
	id integer auto_increment not null,
    role varchar(10),
    user_id integer,
    primary key(id),
    foreign key(user_id) references users(id)
)ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

-- create table order
CREATE TABLE DB_MANAGE_STAFF.orders(
	id integer not null auto_increment,
    name varchar(50),
    cdate datetime,
    user_name varchar(50),
    user_id integer not null,
	price double,
	quantity integer,
	type integer,
	total double,
	proactive tinyint(1),
    primary key(id),
    foreign key(user_id) references users(id)
)ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

-- create table feedback
CREATE TABLE DB_MANAGE_STAFF.feedbacks(
	id integer not null auto_increment,
    title varchar(50),
    cdate datetime,
    content varchar(200),
    user_name varchar(50),
    user_id integer not null,
    primary key(id),
    foreign key(user_id) references users(id)
)ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

-- create table feedback
CREATE TABLE DB_MANAGE_STAFF.revenues(
	id integer not null auto_increment,
    cdate datetime,
    order_name varchar(50),
	order_price double,
	order_percent varchar(50),
    order_id integer not null,
	value double,
    type integer ,
    primary key(id),
    foreign key(order_id) references orders(id)
)ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

-- set first value increment
ALTER TABLE users AUTO_INCREMENT = 100000;

-- Insert user 
Insert into users(id,password,enable,name,child_id,cdate) values (100000,'$2a$10$DWjgKn32UUkM/ryxmnvCTOLvf.5EVLPuhOTVabdp3uMq49nOvhy7G',true,'SPADMIN','100000',now());
Insert into roles(id,role,user_id) values (1,'SPADMIN',100000);
