import { describe, it, expect } from 'vitest';
import {
  mockTimesheetEntries,
  getEntriesByTimesheetId,
  getEntryById,
} from '@/data/mockEntries';

describe('mockTimesheetEntries', () => {
  it('should contain at least one entry', () => {
    expect(mockTimesheetEntries.length).toBeGreaterThan(0);
  });

  it('every entry should have required fields', () => {
    mockTimesheetEntries.forEach((entry) => {
      expect(entry.id).toBeTruthy();
      expect(entry.timesheetId).toBeTruthy();
      expect(entry.date).toBeTruthy();
      expect(entry.projectName).toBeTruthy();
      expect(entry.hours).toBeGreaterThan(0);
      expect(entry.status).toBeTruthy();
    });
  });

  it('hours should be a positive number', () => {
    mockTimesheetEntries.forEach((entry) => {
      expect(entry.hours).toBeGreaterThan(0);
    });
  });
});

describe('getEntriesByTimesheetId', () => {
  it('returns entries for given timesheetId', () => {
    const result = getEntriesByTimesheetId('1');
    expect(result.length).toBeGreaterThan(0);
    result.forEach((entry) => expect(entry.timesheetId).toBe('1'));
  });

  it('returns empty array for unknown timesheetId', () => {
    const result = getEntriesByTimesheetId('999');
    expect(result).toEqual([]);
  });
});

describe('getEntryById', () => {
  it('returns entry when id exists', () => {
    const result = getEntryById('1');
    expect(result).toBeDefined();
    expect(result?.id).toBe('1');
  });

  it('returns undefined when id does not exist', () => {
    const result = getEntryById('999');
    expect(result).toBeUndefined();
  });
});
