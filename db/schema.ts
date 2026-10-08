// Intentionally empty by default.
// Add Drizzle tables here when the site actually needs a database.
// See examples/d1/db/schema.ts for an opt-in example.
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
export const commissions = sqliteTable('commissions', {
  id: text('id').primaryKey(),
  tokenHash: text('token_hash').notNull(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  service: text('service').notNull(),
  options: text('options').notNull(),
  estimate: integer('estimate').notNull(),
  description: text('description').notNull(),
  references: text('references').notNull(),
  status: text('status').notNull().default('received'),
  createdAt: text('created_at').notNull(),
  termsVersion: text('terms_version').notNull(),
});
