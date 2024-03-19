CREATE TABLE `course` (
	`code` text PRIMARY KEY NOT NULL,
	`nane` text NOT NULL,
	`part` integer NOT NULL,
	`semester` integer NOT NULL,
	`program` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `program` (
	`code` text PRIMARY KEY NOT NULL,
	`nane` text NOT NULL,
	`number_of_years` integer NOT NULL,
	`school_code` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `school` (
	`code` text PRIMARY KEY NOT NULL,
	`nane` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`created_at` integer NOT NULL,
	`password_hash` text NOT NULL,
	`role` text NOT NULL,
	`default_password_changed_at` integer
);
--> statement-breakpoint
CREATE TABLE `user-student-profile` (
	`registration_number` text PRIMARY KEY NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`personal_email` text NOT NULL,
	`program_code` text NOT NULL,
	`user_id` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `user_session` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	`created_at` integer NOT NULL,
	`user_agent` text,
	`ip_address` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);