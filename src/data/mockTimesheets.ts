export interface MockTimesheet {
  id: string;
  weekNumber: number;
  startDate: string;
  endDate: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  totalHours: number;
  userId: string;
}

export const mockTimesheets: MockTimesheet[] = [
  {
    id: '1',
    weekNumber: 1,
    startDate: '2025-01-01',
    endDate: '2025-01-07',
    status: 'approved',
    totalHours: 40,
    userId: '1',
  },
  {
    id: '2',
    weekNumber: 2,
    startDate: '2025-01-08',
    endDate: '2025-01-14',
    status: 'submitted',
    totalHours: 38,
    userId: '1',
  },
  {
    id: '3',
    weekNumber: 3,
    startDate: '2025-01-15',
    endDate: '2025-01-21',
    status: 'draft',
    totalHours: 35,
    userId: '1',
  },
  {
    id: '4',
    weekNumber: 4,
    startDate: '2025-01-22',
    endDate: '2025-01-28',
    status: 'approved',
    totalHours: 42,
    userId: '1',
  },
  {
    id: '5',
    weekNumber: 5,
    startDate: '2025-01-29',
    endDate: '2025-02-04',
    status: 'rejected',
    totalHours: 32,
    userId: '1',
  },
];

export const getTimesheetById = (id: string): MockTimesheet | undefined => {
  return mockTimesheets.find((timesheet) => timesheet.id === id);
};

export const getTimesheetsByUserId = (userId: string): MockTimesheet[] => {
  return mockTimesheets.filter((timesheet) => timesheet.userId === userId);
};
