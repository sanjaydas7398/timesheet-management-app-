import { TimesheetEntry } from '@/types/timesheet.types';

export const mockEntries: TimesheetEntry[] = [
  // Week 3 (Incomplete)
  {
    id: 'e1',
    timesheetId: '3',
    date: '2024-01-15',
    hours: 4,
    description: 'Homepage Development',
    projectName: 'Project Name',
    workType: 'Development',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'e2',
    timesheetId: '3',
    date: '2024-01-15',
    hours: 4,
    description: 'Homepage Development',
    projectName: 'Project Name',
    workType: 'Development',
    createdAt: '2024-01-15T11:00:00Z',
    updatedAt: '2024-01-15T11:00:00Z',
  },
  {
    id: 'e3',
    timesheetId: '3',
    date: '2024-01-16',
    hours: 4,
    description: 'Homepage Development',
    projectName: 'Project Name',
    workType: 'Development',
    createdAt: '2024-01-16T10:00:00Z',
    updatedAt: '2024-01-16T10:00:00Z',
  },
  {
    id: 'e4',
    timesheetId: '3',
    date: '2024-01-16',
    hours: 4,
    description: 'Homepage Development',
    projectName: 'Project Name',
    workType: 'Development',
    createdAt: '2024-01-16T11:00:00Z',
    updatedAt: '2024-01-16T11:00:00Z',
  },
  {
    id: 'e5',
    timesheetId: '3',
    date: '2024-01-16',
    hours: 4,
    description: 'Homepage Development',
    projectName: 'Project Name',
    workType: 'Development',
    createdAt: '2024-01-16T12:00:00Z',
    updatedAt: '2024-01-16T12:00:00Z',
  },
  {
    id: 'e6',
    timesheetId: '3',
    date: '2024-01-17',
    hours: 4,
    description: 'Homepage Development',
    projectName: 'Project Name',
    workType: 'Development',
    createdAt: '2024-01-17T10:00:00Z',
    updatedAt: '2024-01-17T10:00:00Z',
  },
  {
    id: 'e7',
    timesheetId: '3',
    date: '2024-01-17',
    hours: 4,
    description: 'Homepage Development',
    projectName: 'Project Name',
    workType: 'Development',
    createdAt: '2024-01-17T11:00:00Z',
    updatedAt: '2024-01-17T11:00:00Z',
  },
  {
    id: 'e8',
    timesheetId: '3',
    date: '2024-01-17',
    hours: 4,
    description: 'Homepage Development',
    projectName: 'Project Name',
    workType: 'Development',
    createdAt: '2024-01-17T12:00:00Z',
    updatedAt: '2024-01-17T12:00:00Z',
  },
  {
    id: 'e9',
    timesheetId: '3',
    date: '2024-01-18',
    hours: 4,
    description: 'Homepage Development',
    projectName: 'Project Name',
    workType: 'Development',
    createdAt: '2024-01-18T10:00:00Z',
    updatedAt: '2024-01-18T10:00:00Z',
  },
  {
    id: 'e10',
    timesheetId: '3',
    date: '2024-01-18',
    hours: 4,
    description: 'Homepage Development',
    projectName: 'Project Name',
    workType: 'Development',
    createdAt: '2024-01-18T11:00:00Z',
    updatedAt: '2024-01-18T11:00:00Z',
  },
  {
    id: 'e11',
    timesheetId: '3',
    date: '2024-01-18',
    hours: 4,
    description: 'Homepage Development',
    projectName: 'Project Name',
    workType: 'Development',
    createdAt: '2024-01-18T12:00:00Z',
    updatedAt: '2024-01-18T12:00:00Z',
  },
];

export function getEntriesByTimesheetId(timesheetId: string): TimesheetEntry[] {
  return mockEntries.filter((entry) => entry.timesheetId === timesheetId);
}

export function getTotalHoursByTimesheetId(timesheetId: string): number {
  const entries = getEntriesByTimesheetId(timesheetId);
  return entries.reduce((total, entry) => total + entry.hours, 0);
}

export function getEntriesByDate(timesheetId: string, date: string): TimesheetEntry[] {
  return mockEntries.filter((entry) => entry.timesheetId === timesheetId && entry.date === date);
}
