import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from './Pagination';

describe('Pagination', () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 5,
    pageSize: 5,
    onPageChange: vi.fn(),
    onPageSizeChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders page size select with options', () => {
      render(<Pagination {...defaultProps} />);
      const select = screen.getByDisplayValue('5 per page');
      expect(select).toBeInTheDocument();
    });

    it('renders Previous and Next buttons', () => {
      render(<Pagination {...defaultProps} />);
      expect(screen.getByText('Previous')).toBeInTheDocument();
      expect(screen.getByText('Next')).toBeInTheDocument();
    });

    it('renders page number buttons for totalPages <= 5', () => {
      render(<Pagination {...defaultProps} totalPages={3} />);
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('does not render page numbers when totalPages is 1', () => {
      render(<Pagination {...defaultProps} totalPages={1} />);
      expect(screen.queryByText('1')).not.toBeInTheDocument();
    });
  });

  describe('Page Numbers with Ellipsis', () => {
    it('shows ellipsis when currentPage <= 3 and totalPages > 5', () => {
      render(<Pagination {...defaultProps} currentPage={2} totalPages={10} />);
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument();
      expect(screen.getByText('...')).toBeInTheDocument();
    });

    it('shows ellipsis at start when currentPage near end', () => {
      render(<Pagination {...defaultProps} currentPage={9} totalPages={10} />);
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('8')).toBeInTheDocument();
      expect(screen.getByText('9')).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument();
    });

    it('shows ellipsis on both sides for middle pages', () => {
      render(<Pagination {...defaultProps} currentPage={5} totalPages={10} />);
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument();
      const dots = screen.getAllByText('...');
      expect(dots).toHaveLength(2);
    });
  });

  describe('Interactions', () => {
    it('calls onPageChange when Next is clicked', () => {
      render(<Pagination {...defaultProps} currentPage={1} />);
      fireEvent.click(screen.getByText('Next'));
      expect(defaultProps.onPageChange).toHaveBeenCalledWith(2);
    });

    it('calls onPageChange when Previous is clicked', () => {
      render(<Pagination {...defaultProps} currentPage={3} />);
      fireEvent.click(screen.getByText('Previous'));
      expect(defaultProps.onPageChange).toHaveBeenCalledWith(2);
    });

    it('disables Previous button on first page', () => {
      render(<Pagination {...defaultProps} currentPage={1} />);
      expect(screen.getByText('Previous')).toBeDisabled();
    });

    it('disables Next button on last page', () => {
      render(<Pagination {...defaultProps} currentPage={5} totalPages={5} />);
      expect(screen.getByText('Next')).toBeDisabled();
    });

    it('calls onPageChange when a page number is clicked', () => {
      render(<Pagination {...defaultProps} totalPages={3} />);
      fireEvent.click(screen.getByText('2'));
      expect(defaultProps.onPageChange).toHaveBeenCalledWith(2);
    });

    it('calls onPageSizeChange when page size select changes', () => {
      render(<Pagination {...defaultProps} />);
      fireEvent.change(screen.getByDisplayValue('5 per page'), {
        target: { value: '10' },
      });
      expect(defaultProps.onPageSizeChange).toHaveBeenCalledWith(10);
    });
  });
});
