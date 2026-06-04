import { Timesheet, TimesheetStatus } from '@/types/timesheet.types';

export type MockTimesheet = Timesheet;

// Helper function to calculate total hours for a timesheet
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const calculateTimesheetHours = (_timesheetId: string): number => {
  // This will be imported from entries to avoid circular dependency
  return 0; // Will be calculated dynamically
};

export const mockTimesheets: Timesheet[] = [
  {
    id: '1',
    weekNumber: 1,
    startDate: '2024-01-01',
    endDate: '2024-01-05',
    status: 'COMPLETED' as TimesheetStatus,
    userId: '1',
    createdAt: '2024-01-05T10:00:00Z',
    updatedAt: '2024-01-05T10:00:00Z',
    totalHours: 40,
  },
  {
    id: '2',
    weekNumber: 2,
    startDate: '2024-01-08',
    endDate: '2024-01-12',
    status: 'COMPLETED' as TimesheetStatus,
    userId: '1',
    createdAt: '2024-01-12T10:00:00Z',
    updatedAt: '2024-01-12T10:00:00Z',
    totalHours: 40,
  },
  {
    id: '3',
    weekNumber: 3,
    startDate: '2024-01-15',
    endDate: '2024-01-19',
    status: 'INCOMPLETE' as TimesheetStatus,
    userId: '1',
    createdAt: '2024-01-19T10:00:00Z',
    updatedAt: '2024-01-19T10:00:00Z',
    totalHours: 35,
  },
  {
    id: '4',
    weekNumber: 4,
    startDate: '2024-01-22',
    endDate: '2024-01-26',
    status: 'COMPLETED' as TimesheetStatus,
    userId: '1',
    createdAt: '2024-01-26T10:00:00Z',
    updatedAt: '2024-01-26T10:00:00Z',
    totalHours: 40,
  },
  {
    id: '5',
    weekNumber: 5,
    startDate: '2024-01-28',
    endDate: '2024-02-01',
    status: 'MISSING' as TimesheetStatus,
    userId: '1',
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-02-01T10:00:00Z',
    totalHours: 0,
  },
  {
    id: '6',
    weekNumber: 6,
    startDate: '2024-02-05',
    endDate: '2024-02-09',
    status: 'COMPLETED' as TimesheetStatus,
    userId: '1',
    createdAt: '2024-02-09T10:00:00Z',
    updatedAt: '2024-02-09T10:00:00Z',
    totalHours: 40,
  },
  {
    id: '7',
    weekNumber: 7,
    startDate: '2024-02-12',
    endDate: '2024-02-16',
    status: 'INCOMPLETE' as TimesheetStatus,
    userId: '1',
    createdAt: '2024-02-16T10:00:00Z',
    updatedAt: '2024-02-16T10:00:00Z',
    totalHours: 28,
  },
  {
    id: '8',
    weekNumber: 8,
    startDate: '2024-02-19',
    endDate: '2024-02-23',
    status: 'COMPLETED' as TimesheetStatus,
    userId: '1',
    createdAt: '2024-02-23T10:00:00Z',
    updatedAt: '2024-02-23T10:00:00Z',
    totalHours: 40,
  },
];

export function getTimesheets(userId: string): Timesheet[] {
  return mockTimesheets.filter((ts) => ts.userId === userId);
}

export const getTimesheetsByUserId = getTimesheets;

export function getTimesheetById(id: string): Timesheet | undefined {
  return mockTimesheets.find((ts) => ts.id === id);
}

/**
 * Calculate status based on total hours
 * COMPLETED = 40 hours
 * INCOMPLETE = less than 40 hours (but > 0)
 * MISSING = 0 hours
 */
export function calculateTimesheetStatus(totalHours: number): TimesheetStatus {
  if (totalHours === 0) return 'MISSING';
  if (totalHours >= 40) return 'COMPLETED';
  return 'INCOMPLETE';
}

/**
 * Filter timesheets by date range
 * If range covers multiple weeks, show all those weeks
 */
export function filterByDateRange(
  timesheets: Timesheet[],
  dateRange: string
): Timesheet[] {
  if (!dateRange) return timesheets;

  const now = new Date();
  let startDate: Date;
  let endDate: Date = new Date(now);

  switch (dateRange) {
    case 'this-week':
      // Get start of current week (Monday)
      startDate = new Date(now);
      const day = startDate.getDay();
      const diff = startDate.getDate() - day + (day === 0 ? -6 : 1);
      startDate.setDate(diff);
      startDate.setHours(0, 0, 0, 0);
      
      // Get end of current week (Sunday)
      endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);
      endDate.setHours(23, 59, 59, 999);
      break;

    case 'last-week':
      // Get start of last week
      startDate = new Date(now);
      const currentDay = startDate.getDay();
      const diffToLastMonday = startDate.getDate() - currentDay - 6 + (currentDay === 0 ? -6 : 1);
      startDate.setDate(diffToLastMonday);
      startDate.setHours(0, 0, 0, 0);
      
      // Get end of last week
      endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);
      endDate.setHours(23, 59, 59, 999);
      break;

    case 'this-month':
      // Get start of current month
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      
      // Get end of current month
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      endDate.setHours(23, 59, 59, 999);
      break;

    case 'last-month':
      // Get start of last month
      startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      
      // Get end of last month
      endDate = new Date(now.getFullYear(), now.getMonth(), 0);
      endDate.setHours(23, 59, 59, 999);
      break;

    default:
      return timesheets;
  }

  // Filter timesheets where the week falls within the date range
  return timesheets.filter((ts) => {
    const tsStart = new Date(ts.startDate);
    const tsEnd = new Date(ts.endDate);
    
    // Check if timesheet week overlaps with selected range
    return (tsStart <= endDate && tsEnd >= startDate);
  });
}

/**
 * Filter timesheets by status
 */
export function filterTimesheets(
  timesheets: Timesheet[],
  status?: TimesheetStatus | 'all',
  dateRange?: string
): Timesheet[] {
  let filtered = [...timesheets];

  // Apply date range filter first
  if (dateRange) {
    filtered = filterByDateRange(filtered, dateRange);
  }

  // Apply status filter
  if (status && status !== 'all') {
    filtered = filtered.filter((ts) => ts.status === status);
  }

  return filtered;
}
