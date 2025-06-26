import { timestamp, uuid } from 'drizzle-orm/pg-core';

export const baseFields = {
  id: uuid('id').primaryKey().defaultRandom(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
} as const;

export const softDeleteFields = {
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
} as const;
