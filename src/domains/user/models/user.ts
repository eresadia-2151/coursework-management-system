import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

const User = sqliteTable(
  'user',
  {
    id: text('id').primaryKey(),
    email: text("email").unique().notNull(),
    createdAt: integer('created_at').notNull(),
    passwordHash: text("password_hash").notNull(),
    role: text("role", { enum: ["admin", "student", "lecturer", "viewer"] }).notNull(),
    defaultPasswordChangedAt: integer("default_password_changed_at")
  }
);

export default User;
export type TUser = typeof User.$inferSelect;
