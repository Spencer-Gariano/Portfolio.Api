import { pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
export const userStatusEnum = pgEnum('user_status', ['active', 'pending']);

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull().unique(),
  status: userStatusEnum('status').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  lastLoginAt: timestamp('last_login_at').defaultNow(),
});
