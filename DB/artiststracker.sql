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
  `image` VARCHAR(500) NULL DEFAULT 'default',
  `band` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `song`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `song` ;

CREATE TABLE IF NOT EXISTS `song` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `song_length` DOUBLE NULL,
  `genre` VARCHAR(45) NULL,
  `album_title` VARCHAR(45) NULL,
  `artist_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_song_artist_idx` (`artist_id` ASC),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  CONSTRAINT `fk_song_artist`
    FOREIGN KEY (`artist_id`)
    REFERENCES `artist` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
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
INSERT INTO `artist` (`id`, `name`, `image`, `band`) VALUES (1, 'Blake Vieyra', 'https://scontent-sjc3-1.xx.fbcdn.net/v/t39.30808-6/222375668_4262200293840400_9078625892677382172_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=9c7eae&_nc_ohc=A1ddm_je_k0AX_FHARL&_nc_ht=scontent-sjc3-1.xx&oh=00_AfDCU3tlr4us_iHryik8Je2MsP7KYDph6SkcGB4KEqydxw&oe=65D69986', 'Blake\'s Band');
INSERT INTO `artist` (`id`, `name`, `image`, `band`) VALUES (2, 'Ron McDonald', 'https://i.pinimg.com/564x/68/c2/35/68c235704d9e05cbcfc0e115f0580736.jpg', 'McLovin');

COMMIT;


-- -----------------------------------------------------
-- Data for table `song`
-- -----------------------------------------------------
START TRANSACTION;
USE `artiststrackerdb`;
INSERT INTO `song` (`id`, `name`, `song_length`, `genre`, `album_title`, `artist_id`) VALUES (1, 'test', 2.12, 'rock', 'test', 1);
INSERT INTO `song` (`id`, `name`, `song_length`, `genre`, `album_title`, `artist_id`) VALUES (2, 'test2', 1.45, 'rap', 'test2', 2);

COMMIT;

