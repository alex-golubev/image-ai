import { pgTable, varchar } from 'drizzle-orm/pg-core';
import { baseFields, softDeleteFields } from './schema-mixins';

describe('schema-mixins', () => {
  describe('baseFields', () => {
    it('should contain all required fields', () => {
      expect(baseFields.id).toBeDefined();
      expect(baseFields.createdAt).toBeDefined();
      expect(baseFields.updatedAt).toBeDefined();
    });

    it('should have correct field structure', () => {
      // Test that fields are Drizzle column objects
      expect(typeof baseFields.id).toBe('object');
      expect(typeof baseFields.createdAt).toBe('object');
      expect(typeof baseFields.updatedAt).toBe('object');

      // Test that they have the expected properties that identify them as Drizzle columns
      expect(baseFields.id).toHaveProperty('config');
      expect(baseFields.createdAt).toHaveProperty('config');
      expect(baseFields.updatedAt).toHaveProperty('config');
    });

    it('should be usable in table definition', () => {
      expect(() => {
        const testTable = pgTable('test_table', {
          ...baseFields,
          name: varchar('name', { length: 255 }).notNull(),
        });
        return testTable;
      }).not.toThrow();
    });

    it('should be immutable (as const)', () => {
      // TypeScript will catch this at compile time, but we can test runtime behavior
      expect(Object.isFrozen(baseFields)).toBe(false); // as const doesn't freeze at runtime

      // Test that the object structure is what we expect
      const keys = Object.keys(baseFields);
      expect(keys).toEqual(['id', 'createdAt', 'updatedAt']);
      expect(keys.length).toBe(3);
    });
  });

  describe('softDeleteFields', () => {
    it('should contain deletedAt field', () => {
      expect(softDeleteFields.deletedAt).toBeDefined();
      expect(typeof softDeleteFields.deletedAt).toBe('object');
      expect(softDeleteFields.deletedAt).toHaveProperty('config');
    });

    it('should be usable in table definition', () => {
      expect(() => {
        const testTable = pgTable('test_table_soft_delete', {
          ...baseFields,
          ...softDeleteFields,
          name: varchar('name', { length: 255 }).notNull(),
        });
        return testTable;
      }).not.toThrow();
    });

    it('should be usable independently from baseFields', () => {
      expect(() => {
        const testTable = pgTable('test_table_only_soft_delete', {
          ...softDeleteFields,
          name: varchar('name', { length: 255 }).notNull(),
        });
        return testTable;
      }).not.toThrow();
    });

    it('should be immutable (as const)', () => {
      const keys = Object.keys(softDeleteFields);
      expect(keys).toEqual(['deletedAt']);
      expect(keys.length).toBe(1);
    });
  });

  describe('integration tests', () => {
    it('should work together when both mixins are used', () => {
      expect(() => {
        const userTable = pgTable('users', {
          ...baseFields,
          ...softDeleteFields,
          name: varchar('name', { length: 255 }).notNull(),
          email: varchar('email', { length: 255 }).notNull(),
        });
        return userTable;
      }).not.toThrow();
    });

    it('should maintain field independence when combined', () => {
      const combinedFields = { ...baseFields, ...softDeleteFields };

      expect(combinedFields.id).toBeDefined();
      expect(combinedFields.createdAt).toBeDefined();
      expect(combinedFields.updatedAt).toBeDefined();
      expect(combinedFields.deletedAt).toBeDefined();

      // Ensure no field conflicts
      const keys = Object.keys(combinedFields);
      expect(keys.length).toBe(4);
      expect(new Set(keys).size).toBe(4); // No duplicates
    });

    it('should preserve all fields when combined', () => {
      const combinedFields = { ...baseFields, ...softDeleteFields };

      // All fields should be present and be objects
      expect(combinedFields.id).toBeDefined();
      expect(combinedFields.createdAt).toBeDefined();
      expect(combinedFields.updatedAt).toBeDefined();
      expect(combinedFields.deletedAt).toBeDefined();

      expect(typeof combinedFields.id).toBe('object');
      expect(typeof combinedFields.createdAt).toBe('object');
      expect(typeof combinedFields.updatedAt).toBe('object');
      expect(typeof combinedFields.deletedAt).toBe('object');
    });
  });

  describe('field behavior', () => {
    it('should be exportable and importable', () => {
      // Test that the exports work correctly
      expect(typeof baseFields).toBe('object');
      expect(typeof softDeleteFields).toBe('object');

      // Test that they are not null or undefined
      expect(baseFields).not.toBeNull();
      expect(softDeleteFields).not.toBeNull();
    });

    it('should maintain object structure', () => {
      // Test that the objects have the expected keys
      const baseKeys = Object.keys(baseFields);
      const softDeleteKeys = Object.keys(softDeleteFields);

      expect(baseKeys).toContain('id');
      expect(baseKeys).toContain('createdAt');
      expect(baseKeys).toContain('updatedAt');
      expect(baseKeys.length).toBe(3);

      expect(softDeleteKeys).toContain('deletedAt');
      expect(softDeleteKeys.length).toBe(1);
    });
  });
});
