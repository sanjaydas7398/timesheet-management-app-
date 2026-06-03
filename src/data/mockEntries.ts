export interface MockTimesheetEntry {
  id: string;
  timesheetId: string;
  date: string;
  projectName: string;
  taskDescription: string;
  hours: number;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
}

export const mockTimesheetEntries: MockTimesheetEntry[] = [
  // Week 1 entries
  {
    id: '1',
    timesheetId: '1',
    date: '2025-01-01',
    projectName: 'Project Alpha',
    taskDescription: 'Frontend development',
    hours: 8,
    status: 'approved',
  },
  {
    id: '2',
    timesheetId: '1',
    date: '2025-01-02',
    projectName: 'Project Alpha',
    taskDescription: 'Code review and testing',
    hours: 8,
    status: 'approved',
  },
  {
    id: '3',
    timesheetId: '1',
    date: '2025-01-03',
    projectName: 'Project Beta',
    taskDescription: 'API integration',
    hours: 8,
    status: 'approved',
  },
  {
    id: '4',
    timesheetId: '1',
    date: '2025-01-04',
    projectName: 'Project Beta',
    taskDescription: 'Database optimization',
    hours: 8,
    status: 'approved',
  },
  {
    id: '5',
    timesheetId: '1',
    date: '2025-01-05',
    projectName: 'Project Alpha',
    taskDescription: 'Bug fixes',
    hours: 8,
    status: 'approved',
  },
  // Week 2 entries
  {
    id: '6',
    timesheetId: '2',
    date: '2025-01-08',
    projectName: 'Project Gamma',
    taskDescription: 'UI/UX design implementation',
    hours: 7,
    status: 'submitted',
  },
  {
    id: '7',
    timesheetId: '2',
    date: '2025-01-09',
    projectName: 'Project Gamma',
    taskDescription: 'Component development',
    hours: 8,
    status: 'submitted',
  },
  {
    id: '8',
    timesheetId: '2',
    date: '2025-01-10',
    projectName: 'Project Delta',
    taskDescription: 'Testing and debugging',
    hours: 8,
    status: 'submitted',
  },
  {
    id: '9',
    timesheetId: '2',
    date: '2025-01-11',
    projectName: 'Project Delta',
    taskDescription: 'Performance optimization',
    hours: 7.5,
    status: 'submitted',
  },
  {
    id: '10',
    timesheetId: '2',
    date: '2025-01-12',
    projectName: 'Project Gamma',
    taskDescription: 'Documentation',
    hours: 7.5,
    status: 'submitted',
  },
  // Week 3 entries
  {
    id: '11',
    timesheetId: '3',
    date: '2025-01-15',
    projectName: 'Project Epsilon',
    taskDescription: 'Initial setup',
    hours: 8,
    status: 'draft',
  },
  {
    id: '12',
    timesheetId: '3',
    date: '2025-01-16',
    projectName: 'Project Epsilon',
    taskDescription: 'Feature development',
    hours: 8,
    status: 'draft',
  },
  {
    id: '13',
    timesheetId: '3',
    date: '2025-01-17',
    projectName: 'Project Epsilon',
    taskDescription: 'Code refactoring',
    hours: 7,
    status: 'draft',
  },
  {
    id: '14',
    timesheetId: '3',
    date: '2025-01-18',
    projectName: 'Project Zeta',
    taskDescription: 'Research and planning',
    hours: 6,
    status: 'draft',
  },
  {
    id: '15',
    timesheetId: '3',
    date: '2025-01-19',
    projectName: 'Project Zeta',
    taskDescription: 'Prototype development',
    hours: 6,
    status: 'draft',
  },
];

export const getEntriesByTimesheetId = (timesheetId: string): MockTimesheetEntry[] => {
  return mockTimesheetEntries.filter((entry) => entry.timesheetId === timesheetId);
};

export const getEntryById = (id: string): MockTimesheetEntry | undefined => {
  return mockTimesheetEntries.find((entry) => entry.id === id);
};
