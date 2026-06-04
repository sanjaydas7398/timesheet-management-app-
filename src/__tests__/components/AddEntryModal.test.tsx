import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AddEntryModal } from '@/components/modules/AddEntryModal/AddEntryModal';
import { vi } from 'vitest';

describe('AddEntryModal', () => {
  const onClose = vi.fn();
  const onSubmit = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('does not render when isOpen is false', () => {
    render(<AddEntryModal isOpen={false} onClose={onClose} onSubmit={onSubmit} />);
    expect(screen.queryByText('Add New Entry')).not.toBeInTheDocument();
  });

  it('renders modal when isOpen is true', () => {
    render(<AddEntryModal isOpen={true} onClose={onClose} onSubmit={onSubmit} />);
    expect(screen.getByText('Add New Entry')).toBeInTheDocument();
  });

  it('renders form elements', () => {
    render(<AddEntryModal isOpen={true} onClose={onClose} onSubmit={onSubmit} />);
    
    expect(screen.getByLabelText(/Select Project/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Type of Work/i)).toBeInTheDocument();
    expect(screen.getByRole('spinbutton', { name: /Hours/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Write text here ...')).toBeInTheDocument();
  });

  it('shows validation errors when submitting empty form', async () => {
    render(<AddEntryModal isOpen={true} onClose={onClose} onSubmit={onSubmit} />);
    
    // Clear the description (hours default to 12)
    const submitButton = screen.getByRole('button', { name: /Add entry/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Project is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Work type is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Task description is required/i)).toBeInTheDocument();
    });
  });

  it('validates hours field', async () => {
    render(<AddEntryModal isOpen={true} onClose={onClose} onSubmit={onSubmit} />);
    
    const hoursInput = screen.getByRole('spinbutton', { name: /Hours/i });
    fireEvent.change(hoursInput, { target: { value: '0' } });
    
    const submitButton = screen.getByRole('button', { name: /Add entry/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Hours must be greater than 0/i)).toBeInTheDocument();
    });
  });

  it('calls onClose when cancel button is clicked', () => {
    render(<AddEntryModal isOpen={true} onClose={onClose} onSubmit={onSubmit} />);
    
    const cancelButton = screen.getByRole('button', { name: /Cancel/i });
    fireEvent.click(cancelButton);
    
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('updates form data on select change', () => {
    render(<AddEntryModal isOpen={true} onClose={onClose} onSubmit={onSubmit} />);
    
    const projectSelect = screen.getByLabelText(/Select Project/i);
    fireEvent.change(projectSelect, { target: { value: 'Project Alpha' } });
    
    expect((projectSelect as HTMLSelectElement).value).toBe('Project Alpha');
  });

  it('calls onSubmit with form data', async () => {
    render(<AddEntryModal isOpen={true} onClose={onClose} onSubmit={onSubmit} date="2024-01-01" />);
    
    fireEvent.change(screen.getByLabelText(/Select Project/i), { target: { value: 'Project Alpha' } });
    fireEvent.change(screen.getByLabelText(/Type of Work/i), { target: { value: 'Development' } });
    fireEvent.change(screen.getByPlaceholderText('Write text here ...'), { target: { value: 'Test description' } });
    fireEvent.change(screen.getByRole('spinbutton', { name: /Hours/i }), { target: { value: '4' } });
    
    fireEvent.click(screen.getByRole('button', { name: /Add entry/i }));
    
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        projectName: 'Project Alpha',
        workType: 'Development',
        description: 'Test description',
        hours: 4,
        date: '2024-01-01'
      });
    });
  });
});