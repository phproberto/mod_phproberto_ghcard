CREATE TABLE `#__github_card` (
	`id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`username` varchar(255) NOT NULL,
	`profile` text NOT NULL,
	`created_by` int(10) UNSIGNED NULL,
	`created_date` varchar(255) NOT NULL DEFAULT '0000-00-00 00:00:00',
	`modified_by` int(10) UNSIGNED NULL,
	`modified_date` varchar(255) NOT NULL DEFAULT '0000-00-00 00:00:00',
	`checked_out` int(10) UNSIGNED NULL,
	`checked_out_time` varchar(255) NOT NULL DEFAULT '0000-00-00 00:00:00',
	PRIMARY KEY (`id`)
)
ENGINE=InnoDB;
