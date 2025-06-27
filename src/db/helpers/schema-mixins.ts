import { timestamp, uuid } from 'drizzle-orm/pg-core';

/**
 * Base fields that should be included in every database table.
 * Provides standard id, creation timestamp, and update timestamp fields.
 *
 * @example
 * ```typescript
 * const userTable = pgTable('users', {
 *   ...baseFields,
 *   name: varchar('name', { length: 255 }).notNull(),
 * });
 * ```
 */
export const baseFields = {
  id: uuid('id').primaryKey().defaultRandom(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
} as const;

/**
 * Soft delete fields for implementing soft deletion pattern.
 * When deletedAt is set, the record is considered deleted but remains in the database.
 *
 * @example
 * ```typescript
 * const userTable = pgTable('users', {
 *   ...baseFields,
 *   ...softDeleteFields,
 *   name: varchar('name', { length: 255 }).notNull(),
 * });
 * ```
 */
export const softDeleteFields = {
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
} as const;
