-- create database 
CREATE DATABASE IF NOT EXISTS DB_MANAGE_STAFF;

USE DB_MANAGE_STAFF;

-- create table user s
CREATE TABLE DB_MANAGE_STAFF.users(
	id integer auto_increment not null,
	email varchar(50),
	password varchar(100),
	name varchar(50),
	phone varchar(50),
	enable tinyint(1),
    cdata datetime,
    parent_id integer,
    bank_name varchar(50),
    bank_account varchar(50),
    bank_address varchar(50),
    city varchar(50),
    primary key(id)
);

-- create table roles
CREATE TABLE DB_MANAGE_STAFF.roles(
	id integer auto_increment not null,
    role varchar(10),
    user_id integer,
    primary key(id),
    foreign key(user_id) references users(id)
);

-- create table order
CREATE TABLE DB_MANAGE_STAFF.orders(
	id integer not null auto_increment,
    name varchar(50),
    cdate datetime,
    user_name varchar(50),
    user_id integer not null,
    primary key(id),
    foreign key(user_id) references users(id)
);

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
);

-- set first value increment
ALTER TABLE users AUTO_INCREMENT = 100000;

-- Insert user 
Insert into users(id,password,enable) values (100001,'123456',true);
Insert into roles(id,role,user_id) values (1,'ADMIN',100000);
