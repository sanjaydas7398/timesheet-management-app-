import { render, screen, fireEvent } from '@testing-library/react';
import { TimesheetTable } from '@/components/modules/TimesheetTable';
import { Timesheet } from '@/types/timesheet.types';

const mockTimesheets: Timesheet[] = [
  {
    id: '1',
    weekNumber: 1,
    startDate: '2024-01-01',
    endDate: '2024-01-05',
    status: 'COMPLETED',
    userId: '1',
    createdAt: '2024-01-05T10:00:00Z',
    updatedAt: '2024-01-05T10:00:00Z',
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
  },
];

describe('TimesheetTable', () => {
  const mockOnViewUpdate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders table headers correctly', () => {
    render(<TimesheetTable timesheets={mockTimesheets} />);
    
    expect(screen.getByText('WEEK #')).toBeInTheDocument();
    expect(screen.getByText('DATE')).toBeInTheDocument();
    expect(screen.getByText('STATUS')).toBeInTheDocument();
    expect(screen.getByText('ACTIONS')).toBeInTheDocument();
  });

  it('renders all timesheet rows', () => {
    render(<TimesheetTable timesheets={mockTimesheets} />);
    
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('renders correct status badges', () => {
    render(<TimesheetTable timesheets={mockTimesheets} />);
    
    expect(screen.getAllByText('COMPLETED')[0]).toBeInTheDocument();
    expect(screen.getAllByText('INCOMPLETE')[0]).toBeInTheDocument();
    expect(screen.getAllByText('MISSING')[0]).toBeInTheDocument();
  });

  it('calls onViewUpdate with the correct timesheet when action button is clicked', () => {
    render(<TimesheetTable timesheets={mockTimesheets} onViewUpdate={mockOnViewUpdate} />);
    
    const viewButton = screen.getByText('View');
    fireEvent.click(viewButton);
    expect(mockOnViewUpdate).toHaveBeenCalledWith(mockTimesheets[0]);

    const updateButton = screen.getByText('Update');
    fireEvent.click(updateButton);
    expect(mockOnViewUpdate).toHaveBeenCalledWith(mockTimesheets[1]);

    const createButton = screen.getByText('Create');
    fireEvent.click(createButton);
    expect(mockOnViewUpdate).toHaveBeenCalledWith(mockTimesheets[2]);
  });

  it('displays date range in correct format', () => {
    render(<TimesheetTable timesheets={mockTimesheets} />);
    
    expect(screen.getByText('1 - 5 January, 2024')).toBeInTheDocument();
  });
});