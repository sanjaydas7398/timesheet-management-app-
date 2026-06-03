import { describe, it, expect, beforeEach } from 'vitest';
import { EntryStore } from '@/data/entryStore';

describe('EntryStore', () => {
  let store: EntryStore;

  beforeEach(() => {
    store = new EntryStore();
  });

  describe('getAll', () => {
    it('returns all entries', () => {
      const result = store.getAll();
      expect(result.length).toBeGreaterThan(0);
    });

    it('returns a copy not the original array', () => {
      const result1 = store.getAll();
      const result2 = store.getAll();
      expect(result1).not.toBe(result2);
    });
  });

  describe('getById', () => {
    it('returns entry when id exists', () => {
      const result = store.getById('1');
      expect(result).toBeDefined();
      expect(result?.id).toBe('1');
    });

    it('returns undefined when id does not exist', () => {
      const result = store.getById('999');
      expect(result).toBeUndefined();
    });
  });

  describe('getByTimesheetId', () => {
    it('returns entries for given timesheetId', () => {
      const result = store.getByTimesheetId('1');
      expect(result.length).toBeGreaterThan(0);
      result.forEach((entry) => expect(entry.timesheetId).toBe('1'));
    });

    it('returns empty array for unknown timesheetId', () => {
      const result = store.getByTimesheetId('999');
      expect(result).toEqual([]);
    });
  });

  describe('create', () => {
    it('creates a new entry and returns it', () => {
      const newData = {
        timesheetId: '1',
        date: '2025-01-06',
        projectName: 'New Project',
        taskDescription: 'New task',
        hours: 8,
        status: 'draft' as const,
      };

      const created = store.create(newData);

      expect(created.id).toBeDefined();
      expect(created.projectName).toBe('New Project');
      expect(created.hours).toBe(8);
    });

    it('increments total count after creation', () => {
      const before = store.getAll().length;
      store.create({
        timesheetId: '1',
        date: '2025-01-07',
        projectName: 'Test',
        taskDescription: 'Test task',
        hours: 4,
        status: 'draft',
      });
      const after = store.getAll().length;
      expect(after).toBe(before + 1);
    });
  });

  describe('update', () => {
    it('updates an existing entry', () => {
      const updated = store.update('1', { hours: 6 });
      expect(updated).not.toBeNull();
      expect(updated?.hours).toBe(6);
    });

    it('returns null when entry not found', () => {
      const result = store.update('999', { hours: 6 });
      expect(result).toBeNull();
    });
  });

  describe('delete', () => {
    it('deletes an existing entry and returns true', () => {
      const result = store.delete('1');
      expect(result).toBe(true);
      expect(store.getById('1')).toBeUndefined();
    });

    it('returns false when entry not found', () => {
      const result = store.delete('999');
      expect(result).toBe(false);
    });
  });
});
