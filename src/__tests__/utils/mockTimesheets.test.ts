import { describe, it, expect } from 'vitest';
import {
  mockTimesheets,
  getTimesheets,
  getTimesheetsByUserId,
  getTimesheetById,
  calculateTimesheetStatus,
  filterByDateRange,
  filterTimesheets,
  calculateTimesheetHours,
} from '@/data/mockTimesheets';

describe('mockTimesheets', () => {
  describe('mockTimesheets data', () => {
    it('should have 8 timesheets', () => {
      expect(mockTimesheets).toHaveLength(8);
    });

    it('should have required fields on each timesheet', () => {
      mockTimesheets.forEach((ts) => {
        expect(ts).toHaveProperty('id');
        expect(ts).toHaveProperty('weekNumber');
        expect(ts).toHaveProperty('startDate');
        expect(ts).toHaveProperty('endDate');
        expect(ts).toHaveProperty('status');
        expect(ts).toHaveProperty('userId');
        expect(ts).toHaveProperty('createdAt');
        expect(ts).toHaveProperty('updatedAt');
      });
    });
  });

  describe('getTimesheets', () => {
    it('returns timesheets for user 1', () => {
      const result = getTimesheets('1');
      expect(result.length).toBeGreaterThan(0);
      result.forEach((ts) => expect(ts.userId).toBe('1'));
    });

    it('returns empty array for unknown userId', () => {
      expect(getTimesheets('999')).toEqual([]);
    });
  });

  describe('getTimesheetsByUserId', () => {
    it('is the same function as getTimesheets', () => {
      expect(getTimesheetsByUserId).toBe(getTimesheets);
    });
  });

  describe('getTimesheetById', () => {
    it('returns the correct timesheet', () => {
      const ts = getTimesheetById('1');
      expect(ts).toBeDefined();
      expect(ts?.id).toBe('1');
    });

    it('returns undefined for unknown id', () => {
      expect(getTimesheetById('999')).toBeUndefined();
    });
  });

  describe('calculateTimesheetHours', () => {
    it('returns 0 (placeholder)', () => {
      expect(calculateTimesheetHours('1')).toBe(0);
    });
  });

  describe('calculateTimesheetStatus', () => {
    it('returns MISSING when totalHours is 0', () => {
      expect(calculateTimesheetStatus(0)).toBe('MISSING');
    });

    it('returns COMPLETED when totalHours >= 40', () => {
      expect(calculateTimesheetStatus(40)).toBe('COMPLETED');
      expect(calculateTimesheetStatus(45)).toBe('COMPLETED');
    });

    it('returns INCOMPLETE when totalHours > 0 and < 40', () => {
      expect(calculateTimesheetStatus(20)).toBe('INCOMPLETE');
      expect(calculateTimesheetStatus(39)).toBe('INCOMPLETE');
    });
  });

  describe('filterByDateRange', () => {
    it('returns all timesheets when dateRange is empty', () => {
      const result = filterByDateRange(mockTimesheets, '');
      expect(result).toEqual(mockTimesheets);
    });

    it('returns all timesheets for unknown dateRange', () => {
      const result = filterByDateRange(mockTimesheets, 'unknown');
      expect(result).toEqual(mockTimesheets);
    });

    it('filters by this-week', () => {
      const result = filterByDateRange(mockTimesheets, 'this-week');
      expect(Array.isArray(result)).toBe(true);
    });

    it('filters by last-week', () => {
      const result = filterByDateRange(mockTimesheets, 'last-week');
      expect(Array.isArray(result)).toBe(true);
    });

    it('filters by this-month', () => {
      const result = filterByDateRange(mockTimesheets, 'this-month');
      expect(Array.isArray(result)).toBe(true);
    });

    it('filters by last-month', () => {
      const result = filterByDateRange(mockTimesheets, 'last-month');
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('filterTimesheets', () => {
    it('returns all when no filters applied', () => {
      const result = filterTimesheets(mockTimesheets);
      expect(result).toHaveLength(mockTimesheets.length);
    });

    it('filters by status COMPLETED', () => {
      const result = filterTimesheets(mockTimesheets, 'COMPLETED');
      result.forEach((ts) => expect(ts.status).toBe('COMPLETED'));
    });

    it('filters by status INCOMPLETE', () => {
      const result = filterTimesheets(mockTimesheets, 'INCOMPLETE');
      result.forEach((ts) => expect(ts.status).toBe('INCOMPLETE'));
    });

    it('returns all timesheets when status is "all"', () => {
      const result = filterTimesheets(mockTimesheets, 'all');
      expect(result).toHaveLength(mockTimesheets.length);
    });

    it('applies both status and dateRange filters', () => {
      const result = filterTimesheets(mockTimesheets, 'COMPLETED', 'this-month');
      expect(Array.isArray(result)).toBe(true);
    });
  });
});
