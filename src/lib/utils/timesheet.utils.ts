import { Timesheet, TimesheetStatus, TimesheetEntry } from '@/types/timesheet.types';

/**
 * Calculate total hours for a timesheet from its entries
 */
export function calculateTotalHours(entries: TimesheetEntry[]): number {
  return entries.reduce((total, entry) => total + entry.hours, 0);
}

/**
 * Determine timesheet status based on total hours
 * 
 * Rules:
 * - COMPLETED: User has added exactly 40 hours
 * - INCOMPLETE: User has added less than 40 hours (but more than 0)
 * - MISSING: User has not added any hours (0 hours)
 */
export function determineTimesheetStatus(totalHours: number): TimesheetStatus {
  if (totalHours === 0) {
    return 'MISSING';
  } else if (totalHours >= 40) {
    return 'COMPLETED';
  } else {
    return 'INCOMPLETE';
  }
}

/**
 * Update timesheet with calculated status and total hours
 */
export function updateTimesheetStatus(
  timesheet: Timesheet,
  entries: TimesheetEntry[]
): Timesheet {
  const totalHours = calculateTotalHours(entries);
  const status = determineTimesheetStatus(totalHours);

  return {
    ...timesheet,
    totalHours,
    status,
  };
}

/**
 * Check if a date falls within a range
 */
export function isDateInRange(date: Date, startDate: Date, endDate: Date): boolean {
  return date >= startDate && date <= endDate;
}

/**
 * Check if a timesheet week overlaps with a date range
 */
export function doesTimesheetOverlapRange(
  timesheet: Timesheet,
  startDate: Date,
  endDate: Date
): boolean {
  const tsStart = new Date(timesheet.startDate);
  const tsEnd = new Date(timesheet.endDate);

  // Check if there's any overlap
  return tsStart <= endDate && tsEnd >= startDate;
}

/**
 * Get date range for filter options
 */
export function getDateRangeFromFilter(filter: string): { startDate: Date; endDate: Date } | null {
  const now = new Date();
  let startDate: Date;
  let endDate: Date;

  switch (filter) {
    case 'this-week':
      // Get Monday of current week
      startDate = new Date(now);
      const day = startDate.getDay();
      const diff = startDate.getDate() - day + (day === 0 ? -6 : 1);
      startDate.setDate(diff);
      startDate.setHours(0, 0, 0, 0);

      // Get Sunday of current week
      endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);
      endDate.setHours(23, 59, 59, 999);
      break;

    case 'last-week':
      // Get Monday of last week
      startDate = new Date(now);
      const currentDay = startDate.getDay();
      const diffToLastMonday = startDate.getDate() - currentDay - 6 + (currentDay === 0 ? -6 : 1);
      startDate.setDate(diffToLastMonday);
      startDate.setHours(0, 0, 0, 0);

      // Get Sunday of last week
      endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);
      endDate.setHours(23, 59, 59, 999);
      break;

    case 'this-month':
      // First day of current month
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      startDate.setHours(0, 0, 0, 0);

      // Last day of current month
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      endDate.setHours(23, 59, 59, 999);
      break;

    case 'last-month':
      // First day of last month
      startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      startDate.setHours(0, 0, 0, 0);

      // Last day of last month
      endDate = new Date(now.getFullYear(), now.getMonth(), 0);
      endDate.setHours(23, 59, 59, 999);
      break;

    default:
      return null;
  }

  return { startDate, endDate };
}

/**
 * Filter timesheets by date range and status
 * 
 * Date Range Rules:
 * - If the selected range covers multiple weeks, show all those weeks in the result
 * 
 * Status Rules:
 * - COMPLETED: 40 hours added
 * - INCOMPLETE: Less than 40 hours (but > 0)
 * - MISSING: 0 hours added
 */
export function filterTimesheetsAdvanced(
  timesheets: Timesheet[],
  statusFilter?: TimesheetStatus | 'all' | '',
  dateRangeFilter?: string
): Timesheet[] {
  let filtered = [...timesheets];

  // Apply date range filter - includes all weeks that overlap with the range
  if (dateRangeFilter) {
    const dateRange = getDateRangeFromFilter(dateRangeFilter);
    if (dateRange) {
      filtered = filtered.filter((ts) =>
        doesTimesheetOverlapRange(ts, dateRange.startDate, dateRange.endDate)
      );
    }
  }

  // Apply status filter
  if (statusFilter && statusFilter !== 'all') {
    filtered = filtered.filter((ts) => ts.status === statusFilter);
  }

  return filtered;
}

/**
 * Format date range for display
 */
export function formatDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const startDay = start.getDate();
  const endDay = end.getDate();
  const month = end.toLocaleDateString('en-US', { month: 'long' });
  const year = end.getFullYear();

  return `${startDay} - ${endDay} ${month}, ${year}`;
}

/**
 * Get status badge color classes
 */
export function getStatusBadgeClasses(status: TimesheetStatus): {
  text: string;
  bg: string;
} {
  const styles = {
    COMPLETED: {
      text: 'text-green-800',
      bg: 'bg-green-100',
    },
    INCOMPLETE: {
      text: 'text-yellow-800',
      bg: 'bg-yellow-100',
    },
    MISSING: {
      text: 'text-pink-800',
      bg: 'bg-pink-100',
    },
  };

  return styles[status];
}

/**
 * Get action button text based on status
 */
export function getActionButtonText(status: TimesheetStatus): string {
  const actions = {
    COMPLETED: 'View',
    INCOMPLETE: 'Update',
    MISSING: 'Create',
  };

  return actions[status];
}
