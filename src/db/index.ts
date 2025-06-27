import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

/**
 * Neon serverless SQL connection instance
 *
 * @description Creates a connection to the Neon PostgreSQL database using the serverless driver.
 * The connection URL is obtained from the DATABASE_URL environment variable.
 *
 * @throws {Error} When DATABASE_URL environment variable is not set
 */
const sql = neon(
  (() => {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL environment variable is not set');
    }
    return process.env.DATABASE_URL;
  })(),
);

/**
 * Drizzle ORM database instance
 *
 * @description Main database instance configured with Drizzle ORM for type-safe database operations.
 * Includes the complete database schema with all table definitions and relationships.
 *
 * @example
 * ```typescript
 * import { db } from '~/db';
 *
 * // Query users
 * const users = await db.select().from(schema.user);
 *
 * // Insert a new user
 * const newUser = await db.insert(schema.user).values({
 *   name: 'John Doe',
 *   email: 'john@example.com',
 *   password: 'hashedPassword',
 *   role: 'user',
 *   status: 'active'
 * }).returning();
 * ```
 *
 * @see {@link https://orm.drizzle.team/docs/overview} Drizzle ORM Documentation
 * @see {@link https://neon.tech/docs} Neon Database Documentation
 */
export const db = drizzle(sql, { schema });
