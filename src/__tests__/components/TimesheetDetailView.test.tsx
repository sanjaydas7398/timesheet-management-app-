import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TimesheetDetailView } from '@/components/modules/WeekDetail/TimesheetDetailView';
import { TimesheetEntry, Timesheet } from '@/types/timesheet.types';

const mockTimesheet: Timesheet = {
  id: '1',
  weekNumber: 4,
  startDate: '2025-01-20',
  endDate: '2025-01-24',
  status: 'INCOMPLETE',
  userId: '1',
  createdAt: '2025-01-20T10:00:00Z',
  updatedAt: '2025-01-20T10:00:00Z',
  totalHours: 16,
};

const mockEntries: TimesheetEntry[] = [
  {
    id: '1',
    timesheetId: '1',
    date: '2025-01-21',
    projectName: 'Project Alpha',
    description: 'Homepage Development',
    hours: 4,
    workType: 'development',
    createdAt: '2025-01-21T10:00:00Z',
    updatedAt: '2025-01-21T10:00:00Z',
  },
  {
    id: '2',
    timesheetId: '1',
    date: '2025-01-21',
    projectName: 'Project Beta',
    description: 'Bug fixes and testing',
    hours: 4,
    workType: 'bug-fixes',
    createdAt: '2025-01-21T11:00:00Z',
    updatedAt: '2025-01-21T11:00:00Z',
  },
  {
    id: '3',
    timesheetId: '1',
    date: '2025-01-22',
    projectName: 'Project Gamma',
    description: 'API Integration',
    hours: 8,
    workType: 'development',
    createdAt: '2025-01-22T10:00:00Z',
    updatedAt: '2025-01-22T10:00:00Z',
  },
];

// Mock fetch globally
const mockFetch = vi.fn();

describe('TimesheetDetailView', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = mockFetch;

    // Default mock responses
    mockFetch.mockImplementation((url: string) => {
      if (url.includes('/entries')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: mockEntries }),
        });
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: mockTimesheet }),
      });
    });
  });

  describe('Rendering', () => {
    it('renders loading state initially', () => {
      render(<TimesheetDetailView timesheetId="1" onBack={vi.fn()} />);
      expect(screen.getAllByTestId('skeleton')[0]).toBeInTheDocument();
    });

    it('renders the page title and date range after loading', async () => {
      render(<TimesheetDetailView timesheetId="1" onBack={vi.fn()} />);

      await waitFor(() => {
        expect(screen.getByText(/This week's timesheet/)).toBeInTheDocument();
      });
      expect(screen.getByText('20 - 24 January, 2025')).toBeInTheDocument();
    });
  });

  describe('Progress Bar', () => {
    it('displays total hours and percentage', async () => {
      render(<TimesheetDetailView timesheetId="1" onBack={vi.fn()} />);

      await waitFor(() => {
        expect(screen.getByText('16/40 hrs')).toBeInTheDocument();
      });
      expect(screen.getByText('40%')).toBeInTheDocument();
    });
  });

  describe('Daily Entries', () => {
    it('groups entries by date', async () => {
      render(<TimesheetDetailView timesheetId="1" onBack={vi.fn()} />);

      await waitFor(() => {
        expect(screen.getByText('Jan 21')).toBeInTheDocument();
      });
      expect(screen.getByText('Jan 22')).toBeInTheDocument();
    });

    it('displays entry details correctly', async () => {
      render(<TimesheetDetailView timesheetId="1" onBack={vi.fn()} />);

      await waitFor(() => {
        expect(screen.getByText('Project Alpha')).toBeInTheDocument();
      });
      expect(screen.getByText('Homepage Development')).toBeInTheDocument();
    });
  });

  describe('Three Dots Menu (Actions)', () => {
    it('displays three dots button for each entry', async () => {
      render(<TimesheetDetailView timesheetId="1" onBack={vi.fn()} />);

      await waitFor(() => {
        const menuButtons = screen.getAllByLabelText('More options');
        expect(menuButtons).toHaveLength(3);
      });
    });

    it('opens dropdown menu when three dots clicked', async () => {
      render(<TimesheetDetailView timesheetId="1" onBack={vi.fn()} />);

      await waitFor(() => {
        expect(screen.getAllByLabelText('More options').length).toBe(3);
      });

      const menuButtons = screen.getAllByLabelText('More options');
      fireEvent.click(menuButtons[0]);

      expect(screen.getByText('Edit')).toBeInTheDocument();
      expect(screen.getByText('Delete')).toBeInTheDocument();
    });
  });

  describe('Add New Task Button', () => {
    it('displays "Add new task" button for each day', async () => {
      render(<TimesheetDetailView timesheetId="1" onBack={vi.fn()} />);

      await waitFor(() => {
        const addButtons = screen.getAllByText('Add new task');
        expect(addButtons.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Error Handling', () => {
    it('displays error message on fetch failure', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'));

      render(<TimesheetDetailView timesheetId="1" onBack={vi.fn()} />);

      await waitFor(() => {
        expect(screen.getByText('Failed to load timesheet details')).toBeInTheDocument();
      });
    });
  });
});
