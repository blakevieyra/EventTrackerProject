-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema artiststrackerdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `artiststrackerdb` ;

-- -----------------------------------------------------
-- Schema artiststrackerdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `artiststrackerdb` DEFAULT CHARACTER SET utf8 ;
USE `artiststrackerdb` ;

-- -----------------------------------------------------
-- Table `artist`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `artist` ;

CREATE TABLE IF NOT EXISTS `artist` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `title` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS artistsuser@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'artistsuser'@'localhost' IDENTIFIED BY 'artistsuser';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'artistsuser'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `artist`
-- -----------------------------------------------------
START TRANSACTION;
USE `artiststrackerdb`;
INSERT INTO `artist` (`id`, `name`, `title`) VALUES (1, 'Blake Vieyra', 'song');

COMMIT;

