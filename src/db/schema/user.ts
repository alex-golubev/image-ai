import { pgTable, varchar } from 'drizzle-orm/pg-core';
import { baseFields, softDeleteFields } from '~/db/helpers/schema-mixins';

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
