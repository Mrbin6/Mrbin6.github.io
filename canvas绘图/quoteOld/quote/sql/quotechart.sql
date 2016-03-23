/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50621
Source Host           : 127.0.0.1:3306
Source Database       : quotechart

Target Server Type    : MYSQL
Target Server Version : 50621
File Encoding         : 65001

Date: 2016-03-14 09:20:08
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `record`
-- ----------------------------
DROP TABLE IF EXISTS `record`;
CREATE TABLE `record` (
  `ID` varchar(32) NOT NULL,
  `Time` datetime DEFAULT NULL,
  `ClientIP` varchar(50) DEFAULT NULL,
  `ReferURL` varchar(100) DEFAULT NULL,
  `FunctionID` int(11) DEFAULT NULL,
  `InstGroup` int(11) DEFAULT NULL,
  `MType` varchar(50) DEFAULT NULL,
  `MCode` varchar(50) DEFAULT NULL,
  `AppVersion` varchar(20) DEFAULT NULL,
  `SysVersion` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of record
-- ----------------------------
INSERT INTO `record` VALUES ('0b5cca08f5e0455f879570ce65aaae43', '2016-03-09 14:17:10', '0:0:0:0:0:0:0:1', null, '1', '1', null, null, null, null);
INSERT INTO `record` VALUES ('172c53ff48fa4df19a1c28370245f2f5', '2016-03-09 13:50:41', '0:0:0:0:0:0:0:1', null, '1', '1', null, null, null, null);
INSERT INTO `record` VALUES ('33118ef544ee49d18228e4fad71e5db8', '2016-03-09 13:51:46', '0:0:0:0:0:0:0:1', null, '1', '1', null, null, null, null);
INSERT INTO `record` VALUES ('391c84b5db4347d8be4b7893b4b73a90', '2016-03-09 14:17:19', '0:0:0:0:0:0:0:1', null, '1', '1', null, null, null, null);
INSERT INTO `record` VALUES ('4cbb0757262142bd9afb3743358c36b5', '2016-03-09 13:44:49', '0:0:0:0:0:0:0:1', null, '1', '1', null, null, null, null);
INSERT INTO `record` VALUES ('6df752338a8447958a2de7007910cbee', '2016-03-09 13:54:36', '0:0:0:0:0:0:0:1', null, '1', '1', null, null, null, null);
INSERT INTO `record` VALUES ('96b6c683941443b8baea71344b17a5f2', '2016-03-09 13:49:23', '0:0:0:0:0:0:0:1', null, '1', '1', null, null, null, null);
INSERT INTO `record` VALUES ('9dd509b4026b4e21a8f4c42fe9a1d77c', '2016-03-09 14:17:16', '0:0:0:0:0:0:0:1', null, '1', '1', null, null, null, null);
INSERT INTO `record` VALUES ('aae2b78db60541138675a5b25968e65a', '2016-03-09 13:47:45', '0:0:0:0:0:0:0:1', null, '1', '1', null, null, null, null);
INSERT INTO `record` VALUES ('ab1b3c4dfba94702960b13b48c57da0b', '2016-03-09 14:20:17', '0:0:0:0:0:0:0:1', null, '1', '1', null, null, null, null);
INSERT INTO `record` VALUES ('dac27bde79374ebc8c819f57ca646ff1', '2016-03-09 13:46:00', '0:0:0:0:0:0:0:1', null, '1', '1', null, null, null, null);
