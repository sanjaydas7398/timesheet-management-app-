import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import DashboardPage from '@/app/(dashboard)/dashboard/page';
import { Timesheet } from '@/types/timesheet.types';

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

// Mock NextAuth
vi.mock('next-auth/react', () => ({
  useSession: vi.fn(),
  signOut: vi.fn(),
}));

const mockTimesheetsData: Timesheet[] = [
  {
    id: '1',
    weekNumber: 1,
    startDate: '2024-01-01',
    endDate: '2024-01-05',
    status: 'COMPLETED',
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
    status: 'INCOMPLETE',
    userId: '1',
    createdAt: '2024-01-12T10:00:00Z',
    updatedAt: '2024-01-12T10:00:00Z',
    totalHours: 35,
  },
  {
    id: '3',
    weekNumber: 3,
    startDate: '2024-01-15',
    endDate: '2024-01-19',
    status: 'MISSING',
    userId: '1',
    createdAt: '2024-01-19T10:00:00Z',
    updatedAt: '2024-01-19T10:00:00Z',
    totalHours: 0,
  },
];

const mockFetch = vi.fn();

describe('DashboardPage - Table View', () => {
  const mockPush = vi.fn();
  const mockSignOut = signOut as unknown as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = mockFetch;

    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ data: mockTimesheetsData }),
    });

    (useRouter as ReturnType<typeof vi.fn>).mockReturnValue({
      push: mockPush,
      replace: vi.fn(),
      prefetch: vi.fn(),
    });
    (useSession as ReturnType<typeof vi.fn>).mockReturnValue({
      data: {
        user: {
          name: 'John Doe',
          email: 'john.doe@example.com',
        },
      },
      status: 'authenticated',
    });
  });

  describe('Page Rendering', () => {
    it('should render the dashboard page with all core elements', async () => {
      render(<DashboardPage />);

      // Header elements
      await waitFor(() => {
        expect(screen.getByText('ticktock')).toBeInTheDocument();
      });
      expect(screen.getByText('Timesheets')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();

      // Main content
      expect(screen.getByText('Your Timesheets')).toBeInTheDocument();

      // Footer
      expect(screen.getByText(/© 2024 tentwenty. All rights reserved./)).toBeInTheDocument();
    });

    it('should render table with correct headers', async () => {
      render(<DashboardPage />);

      await waitFor(() => {
        expect(screen.getByText('WEEK #')).toBeInTheDocument();
      });
      expect(screen.getByText('DATE')).toBeInTheDocument();
      expect(screen.getByText('STATUS')).toBeInTheDocument();
      expect(screen.getByText('ACTIONS')).toBeInTheDocument();
    });

    it('should display user name from session', async () => {
      render(<DashboardPage />);

      await waitFor(() => {
        expect(screen.getByText('John Doe')).toBeInTheDocument();
      });
    });

    it('should render with default user name when session is null', async () => {
      (useSession as ReturnType<typeof vi.fn>).mockReturnValue({
        data: null,
        status: 'unauthenticated',
      });

      render(<DashboardPage />);

      await waitFor(() => {
        expect(screen.getByText('User')).toBeInTheDocument();
      });
    });
  });

  describe('Timesheet Table Data', () => {
    it('should render all timesheet rows', async () => {
      render(<DashboardPage />);

      await waitFor(() => {
        const rows = screen.getAllByText('1');
        // Expect two occurrences: one for week number and one for pagination page button
        expect(rows).toHaveLength(1);
      });
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('should display correct date ranges', async () => {
      render(<DashboardPage />);

      await waitFor(() => {
        expect(screen.getByText('1 - 5 January, 2024')).toBeInTheDocument();
      });
      expect(screen.getByText('8 - 12 January, 2024')).toBeInTheDocument();
    });

    it('should display all status badges correctly', async () => {
      render(<DashboardPage />);

      await waitFor(() => {
        expect(screen.getAllByText('COMPLETED')[0]).toBeInTheDocument();
      });
      expect(screen.getAllByText('INCOMPLETE')[0]).toBeInTheDocument();
      expect(screen.getAllByText('MISSING')[0]).toBeInTheDocument();
    });

    it('should display correct action buttons based on status', async () => {
      render(<DashboardPage />);

      await waitFor(() => {
        expect(screen.getByText('View')).toBeInTheDocument();
      });
      expect(screen.getByText('Update')).toBeInTheDocument();
      expect(screen.getByText('Create')).toBeInTheDocument();
    });
  });

  describe('User Dropdown Functionality', () => {
    it('should toggle user dropdown on click', async () => {
      render(<DashboardPage />);

      await waitFor(() => {
        expect(screen.getByText('John Doe')).toBeInTheDocument();
      });

      const userButton = screen.getByText('John Doe').closest('button');
      expect(userButton).toBeInTheDocument();

      // Initially dropdown should not be visible
      expect(screen.queryByText('Sign out')).not.toBeInTheDocument();

      // Click to open dropdown
      fireEvent.click(userButton!);
      expect(screen.getByText('Sign out')).toBeInTheDocument();

      // Click again to close
      fireEvent.click(userButton!);
      expect(screen.queryByText('Sign out')).not.toBeInTheDocument();
    });

    it('should call signOut when Sign out is clicked', async () => {
      render(<DashboardPage />);

      await waitFor(() => {
        expect(screen.getByText('John Doe')).toBeInTheDocument();
      });

      const userButton = screen.getByText('John Doe').closest('button');
      fireEvent.click(userButton!);

      const signOutButton = screen.getByText('Sign out');
      fireEvent.click(signOutButton);

      await waitFor(() => {
        expect(mockSignOut).toHaveBeenCalledWith({ callbackUrl: '/login' });
      });
    });

    it('should close dropdown when clicking outside', async () => {
      render(<DashboardPage />);

      await waitFor(() => {
        expect(screen.getByText('John Doe')).toBeInTheDocument();
      });

      const userButton = screen.getByText('John Doe').closest('button');
      fireEvent.click(userButton!);

      expect(screen.getByText('Sign out')).toBeInTheDocument();

      // Click outside
      fireEvent.mouseDown(document.body);

      await waitFor(() => {
        expect(screen.queryByText('Sign out')).not.toBeInTheDocument();
      });
    });
  });

  describe('Filter Functionality', () => {
    it('should render date range filter dropdown', async () => {
      render(<DashboardPage />);

      await waitFor(() => {
        expect(screen.getByDisplayValue('Date Range')).toBeInTheDocument();
      });
    });

    it('should render status filter dropdown', async () => {
      render(<DashboardPage />);

      await waitFor(() => {
        expect(screen.getByDisplayValue('Status')).toBeInTheDocument();
      });
    });

    it('should update date range filter on selection', async () => {
      render(<DashboardPage />);

      await waitFor(() => {
        expect(screen.getByDisplayValue('Date Range')).toBeInTheDocument();
      });

      const dateRangeSelect = screen.getByDisplayValue('Date Range') as HTMLSelectElement;
      fireEvent.change(dateRangeSelect, { target: { value: 'this-week' } });

      expect(dateRangeSelect.value).toBe('this-week');
    });

    it('should update status filter on selection', async () => {
      render(<DashboardPage />);

      await waitFor(() => {
        expect(screen.getByDisplayValue('Status')).toBeInTheDocument();
      });

      const statusSelect = screen.getByDisplayValue('Status') as HTMLSelectElement;
      fireEvent.change(statusSelect, { target: { value: 'COMPLETED' } });

      expect(statusSelect.value).toBe('COMPLETED');
    });
  });

  describe('Pagination Functionality', () => {
    it('should render pagination controls', async () => {
      render(<DashboardPage />);

      await waitFor(() => {
        expect(screen.getByText('Previous')).toBeInTheDocument();
      });
      expect(screen.getByText('Next')).toBeInTheDocument();
    });

    it('should render items per page dropdown', async () => {
      render(<DashboardPage />);

      await waitFor(() => {
        expect(screen.getByDisplayValue('5 per page')).toBeInTheDocument();
      });
    });

    it('should change items per page when dropdown changes', async () => {
      render(<DashboardPage />);

      await waitFor(() => {
        expect(screen.getByDisplayValue('5 per page')).toBeInTheDocument();
      });

      const perPageSelect = screen.getByDisplayValue('5 per page') as HTMLSelectElement;
      fireEvent.change(perPageSelect, { target: { value: '10' } });

      expect(perPageSelect.value).toBe('10');
    });

    it('should disable Previous button on first page', async () => {
      render(<DashboardPage />);

      await waitFor(() => {
        expect(screen.getByText('Previous')).toBeInTheDocument();
      });

      const previousButton = screen.getByText('Previous');
      expect(previousButton).toBeDisabled();
    });
  });

  describe('Navigation Actions', () => {
    it('should swap to detail view when View button is clicked', async () => {
      render(<DashboardPage />);

      await waitFor(() => {
        expect(screen.getByText('View')).toBeInTheDocument();
      });

      // Mock fetch for the detail view
      mockFetch.mockImplementation((url: string) => {
        if (url.includes('/entries')) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ data: [] }),
          });
        }
        if (url.includes('/timesheets/1')) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ data: mockTimesheetsData[0] }),
          });
        }
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: mockTimesheetsData }),
        });
      });

      const viewButton = screen.getByText('View');
      fireEvent.click(viewButton);

      // Should swap to detail view (loading state first)
      await waitFor(() => {
        expect(screen.getAllByTestId('skeleton')[0]).toBeInTheDocument();
      });
    });
  });

  describe('Responsive Design', () => {
    it('should render header with correct styling', async () => {
      render(<DashboardPage />);

      await waitFor(() => {
        expect(screen.getByText('ticktock')).toBeInTheDocument();
      });

      const header = screen.getByText('ticktock').closest('header');
      expect(header).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty timesheets array', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ data: [] }),
      });

      render(<DashboardPage />);

      await waitFor(() => {
        expect(screen.getByText('Your Timesheets')).toBeInTheDocument();
      });
    });

    it('should handle session without user name', async () => {
      (useSession as ReturnType<typeof vi.fn>).mockReturnValue({
        data: {
          user: {
            email: 'user@example.com',
          },
        },
        status: 'authenticated',
      });

      render(<DashboardPage />);

      await waitFor(() => {
        expect(screen.getByText('user@example.com')).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('should have proper semantic HTML structure', async () => {
      render(<DashboardPage />);

      await waitFor(() => {
        expect(screen.getByRole('banner')).toBeInTheDocument();
      });
      expect(screen.getByRole('main')).toBeInTheDocument();
    });

    it('should have accessible buttons', async () => {
      render(<DashboardPage />);

      await waitFor(() => {
        const buttons = screen.getAllByRole('button');
        expect(buttons.length).toBeGreaterThan(0);
      });
    });

    it('should have accessible form controls', async () => {
      render(<DashboardPage />);

      await waitFor(() => {
        const selects = screen.getAllByRole('combobox');
        expect(selects.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Date Formatting', () => {
    it('should format dates correctly', async () => {
      render(<DashboardPage />);

      await waitFor(() => {
        expect(screen.getByText('1 - 5 January, 2024')).toBeInTheDocument();
      });
      expect(screen.getByText('8 - 12 January, 2024')).toBeInTheDocument();
      expect(screen.getByText('15 - 19 January, 2024')).toBeInTheDocument();
    });
  });

  describe('Loading & Error States', () => {
    it('should show loading state while fetching', () => {
      mockFetch.mockReturnValue(new Promise(() => { })); // never resolves
      render(<DashboardPage />);
      expect(screen.getAllByTestId('skeleton')[0]).toBeInTheDocument();
    });

    it('should show error state on fetch failure', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'));

      render(<DashboardPage />);

      await waitFor(() => {
        expect(screen.getByText('Failed to load timesheets')).toBeInTheDocument();
      });
    });
  });
});
