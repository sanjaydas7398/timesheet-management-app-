import { describe, it, expect } from 'vitest';
import {
  mockTimesheets,
  getTimesheetById,
  getTimesheetsByUserId,
} from '@/data/mockTimesheets';

describe('mockTimesheets', () => {
  it('should contain at least one timesheet', () => {
    expect(mockTimesheets.length).toBeGreaterThan(0);
  });

  it('every timesheet should have required fields', () => {
    mockTimesheets.forEach((ts) => {
      expect(ts.id).toBeTruthy();
      expect(ts.weekNumber).toBeGreaterThan(0);
      expect(ts.startDate).toBeTruthy();
      expect(ts.endDate).toBeTruthy();
      expect(ts.status).toBeTruthy();
      expect(ts.userId).toBeTruthy();
    });
  });

  it('statuses should be valid values', () => {
    const validStatuses = ['draft', 'submitted', 'approved', 'rejected'];
    mockTimesheets.forEach((ts) => {
      expect(validStatuses).toContain(ts.status);
    });
  });
});

describe('getTimesheetById', () => {
  it('returns timesheet when id exists', () => {
    const result = getTimesheetById('1');
    expect(result).toBeDefined();
    expect(result?.id).toBe('1');
  });

  it('returns undefined when id does not exist', () => {
    const result = getTimesheetById('999');
    expect(result).toBeUndefined();
  });
});

describe('getTimesheetsByUserId', () => {
  it('returns timesheets for given userId', () => {
    const result = getTimesheetsByUserId('1');
    expect(result.length).toBeGreaterThan(0);
    result.forEach((ts) => expect(ts.userId).toBe('1'));
  });

  it('returns empty array for unknown userId', () => {
    const result = getTimesheetsByUserId('999');
    expect(result).toEqual([]);
  });
});
