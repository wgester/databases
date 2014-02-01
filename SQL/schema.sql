CREATE DATABASE chatterBoxxx;

USE chatterBoxxx;


 /* Describe your table here.*/

/* You can also create more tables, if you need them... */

/*  Execute this file from the command line by typing:
 *    mysql < schema.sql
 *  to create the database and the tables.*/




-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'messages'
--
-- ---

DROP TABLE IF EXISTS `messages`;
    
CREATE TABLE `messages` (
  `id` TINYINT NULL AUTO_INCREMENT DEFAULT NULL,
  `text` VARCHAR(255) NULL DEFAULT NULL,
  `date` DATE NULL DEFAULT NULL,
  `userID` TINYINT NULL DEFAULT NULL,
  `roomnameID` TINYINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'usernames'
-- 
-- ---

DROP TABLE IF EXISTS `usernames`;
    
CREATE TABLE `usernames` (
  `id` TINYINT NULL AUTO_INCREMENT DEFAULT NULL,
  `username` VARCHAR(25) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'roomnames'
-- 
-- ---

DROP TABLE IF EXISTS `roomnames`;
    
CREATE TABLE `roomnames` (
  `id` TINYINT NULL AUTO_INCREMENT DEFAULT NULL,
  `roomname` VARCHAR(25) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `messages` ADD FOREIGN KEY (userID) REFERENCES `usernames` (`id`);
ALTER TABLE `messages` ADD FOREIGN KEY (roomnameID) REFERENCES `roomnames` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `messages` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `usernames` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `roomnames` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `messages` (`id`,`message`,`date`,`time`,`userID`,`roomnameID`) VALUES
-- ('','','','','','');
-- INSERT INTO `usernames` (`id`,`username`) VALUES
-- ('','');
-- INSERT INTO `roomnames` (`id`,`roomname`) VALUES
-- ('','');
