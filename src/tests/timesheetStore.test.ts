import { describe, it, expect, beforeEach } from 'vitest';
import { TimesheetStore } from '@/data/timesheetStore';

describe('TimesheetStore', () => {
  let store: TimesheetStore;

  beforeEach(() => {
    // Fresh store instance for each test to avoid state leakage
    store = new TimesheetStore();
  });

  describe('getAll', () => {
    it('returns all timesheets', () => {
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
    it('returns timesheet when id exists', () => {
      const result = store.getById('1');
      expect(result).toBeDefined();
      expect(result?.id).toBe('1');
    });

    it('returns undefined when id does not exist', () => {
      const result = store.getById('999');
      expect(result).toBeUndefined();
    });
  });

  describe('getByUserId', () => {
    it('returns timesheets for a given userId', () => {
      const result = store.getByUserId('1');
      expect(result.length).toBeGreaterThan(0);
      result.forEach((ts) => expect(ts.userId).toBe('1'));
    });

    it('returns empty array for unknown userId', () => {
      const result = store.getByUserId('999');
      expect(result).toEqual([]);
    });
  });

  describe('getByStatus', () => {
    it('returns timesheets with given status', () => {
      const result = store.getByStatus('approved');
      expect(result.length).toBeGreaterThan(0);
      result.forEach((ts) => expect(ts.status).toBe('approved'));
    });

    it('returns empty array for unknown status', () => {
      const result = store.getByStatus('unknown_status');
      expect(result).toEqual([]);
    });
  });

  describe('create', () => {
    it('creates a new timesheet and returns it', () => {
      const newData = {
        weekNumber: 10,
        startDate: '2025-03-01',
        endDate: '2025-03-07',
        status: 'draft' as const,
        totalHours: 40,
        userId: '1',
      };

      const created = store.create(newData);

      expect(created.id).toBeDefined();
      expect(created.weekNumber).toBe(10);
      expect(created.status).toBe('draft');
    });

    it('increments the total count after creation', () => {
      const before = store.getAll().length;
      store.create({
        weekNumber: 99,
        startDate: '2025-12-01',
        endDate: '2025-12-07',
        status: 'draft',
        totalHours: 40,
        userId: '1',
      });
      const after = store.getAll().length;
      expect(after).toBe(before + 1);
    });
  });

  describe('update', () => {
    it('updates an existing timesheet', () => {
      const updated = store.update('1', { status: 'submitted' });
      expect(updated).not.toBeNull();
      expect(updated?.status).toBe('submitted');
    });

    it('returns null when timesheet not found', () => {
      const result = store.update('999', { status: 'approved' });
      expect(result).toBeNull();
    });

    it('only updates provided fields', () => {
      const original = store.getById('1');
      const updated = store.update('1', { totalHours: 99 });

      expect(updated?.totalHours).toBe(99);
      expect(updated?.weekNumber).toBe(original?.weekNumber);
    });
  });

  describe('delete', () => {
    it('deletes an existing timesheet and returns true', () => {
      const result = store.delete('1');
      expect(result).toBe(true);
      expect(store.getById('1')).toBeUndefined();
    });

    it('returns false when timesheet not found', () => {
      const result = store.delete('999');
      expect(result).toBe(false);
    });

    it('decrements the total count after deletion', () => {
      const before = store.getAll().length;
      store.delete('1');
      const after = store.getAll().length;
      expect(after).toBe(before - 1);
    });
  });
});
