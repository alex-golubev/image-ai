import { pgTable, varchar } from 'drizzle-orm/pg-core';
import { baseFields, softDeleteFields } from '~/db/helpers/schema-mixins';

/**
 * User table schema definition for the application.
 *
 * This table stores user account information including authentication data,
 * profile information, and user management fields. It includes soft delete
 * functionality and standard audit fields.
 *
 * @example
 * ```typescript
 * // Insert a new user
 * await db.insert(user).values({
 *   name: 'John Doe',
 *   email: 'john@example.com',
 *   password: 'hashedPassword',
 *   role: 'admin'
 * });
 *
 * // Query active users
 * const activeUsers = await db
 *   .select()
 *   .from(user)
 *   .where(and(eq(user.status, 'active'), isNull(user.deletedAt)));
 * ```
 */
export const user = pgTable('users', {
  ...baseFields,
  ...softDeleteFields,
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  image: varchar('image', { length: 255 }),
  role: varchar('role', { length: 255 }).notNull().default('user'),
  status: varchar('status', { length: 255 }).notNull().default('active'),
});
