import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

const withDefaultTimestamps = {
	createdAt: integer({ mode: 'timestamp' }).$defaultFn(() => new Date()),
	updatedAt: integer({ mode: 'timestamp' })
		.$defaultFn(() => new Date())
		.$onUpdate(() => new Date())
};

const withDeletedAtTimestamp = {
	deletedAt: integer({ mode: 'timestamp' })
};

export const user = sqliteTable('user', {
	id: text().primaryKey(),
	username: text().notNull().unique(),
	passwordHash: text('password_hash').notNull(),
	...withDefaultTimestamps,
	...withDeletedAtTimestamp
});

export const session = sqliteTable('session', {
	id: text().primaryKey(),
	userId: text()
		.notNull()
		.references(() => user.id),
	expiresAt: integer({ mode: 'timestamp' }).notNull()
});

export type User = typeof user.$inferSelect;
export type Session = typeof session.$inferSelect;
