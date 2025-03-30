import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { char, pgTable, varchar, text, timestamp } from "drizzle-orm/pg-core";

const primaryKey = char("id", { length: 24 })
  .primaryKey()
  .notNull()
  .$defaultFn(() => createId());

const UserTable = pgTable("user", {
  id: primaryKey,
  email: varchar("email", { length: 255 }).notNull().unique(), // Unique email
  firstName: varchar("first_name", { length: 50 }).notNull(),
  lastName: varchar("last_name", { length: 50 }).notNull(),
  password: text("password").notNull(), // Hashed password
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().$onUpdateFn(() => new Date()),
});

const SessionTable = pgTable("session", {
  id: char("id", { length: 24 }).primaryKey(), // 24-char session ID
  userId: char("user_id", { length: 24 }).notNull()
    .references(() => UserTable.id, { onDelete: "cascade" }), // Links to `users`
  token: varchar("token", { length: 255 }).notNull().unique(), // Refresh token
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  expiresAt: timestamp("expires_at", { withTimezone: true })
    .$defaultFn(() => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)), // 30-day expiry
});

const SessionUserRelation = relations(SessionTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [SessionTable.userId],
    references: [UserTable.id]
  })
}));

const UserSessionRelation = relations(UserTable, ({ many }) => ({
  sessions: many(SessionTable),
}))

export { UserTable, SessionTable, SessionUserRelation, UserSessionRelation };
