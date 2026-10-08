CREATE TABLE `commissions` (
	`id` text PRIMARY KEY NOT NULL,
	`token_hash` text NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`service` text NOT NULL,
	`options` text NOT NULL,
	`estimate` integer NOT NULL,
	`description` text NOT NULL,
	`references` text NOT NULL,
	`status` text DEFAULT 'received' NOT NULL,
	`created_at` text NOT NULL,
	`terms_version` text NOT NULL
);
