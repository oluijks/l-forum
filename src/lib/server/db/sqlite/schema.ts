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
	...withDefaultTimestamps,
	...withDeletedAtTimestamp
});

export type User = typeof user.$inferSelect;
