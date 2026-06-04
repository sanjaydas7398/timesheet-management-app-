export type TimesheetStatus = 'COMPLETED' | 'INCOMPLETE' | 'MISSING';

export interface Timesheet {
  id: string;
  weekNumber: number;
  startDate: string;
  endDate: string;
  status: TimesheetStatus;
  userId: string;
  createdAt: string;
  updatedAt: string;
  totalHours?: number;
}

export interface TimesheetEntry {
  id: string;
  timesheetId: string;
  date: string;
  hours: number;
  description: string;
  projectName: string;
  workType?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TimesheetEntryFormData {
  projectName: string;
  workType: string;
  description: string;
  hours: number;
  date: string;
}

export interface TimesheetFormData {
  weekNumber: number;
  startDate: string;
  endDate: string;
  status: TimesheetStatus;
  entries?: Partial<TimesheetEntry>[];
}

export interface TimesheetFilters {
  dateRange?: string;
  status?: TimesheetStatus | 'all';
  page?: number;
  pageSize?: number;
}

export interface PaginatedTimesheets {
  data: Timesheet[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface DailyEntries {
  date: string;
  entries: TimesheetEntry[];
  totalHours: number;
}
