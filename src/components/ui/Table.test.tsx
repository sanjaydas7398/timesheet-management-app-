import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from './Table';

describe('Table Components', () => {
  describe('Table', () => {
    it('renders a table element', () => {
      render(<Table data-testid="table"><tbody><tr><td>cell</td></tr></tbody></Table>);
      expect(screen.getByTestId('table')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Table data-testid="table" className="custom"><tbody><tr><td>cell</td></tr></tbody></Table>);
      expect(screen.getByTestId('table')).toHaveClass('custom');
    });
  });

  describe('TableHeader', () => {
    it('renders a thead element', () => {
      render(
        <table>
          <TableHeader data-testid="thead">
            <tr><th>Header</th></tr>
          </TableHeader>
        </table>
      );
      expect(screen.getByTestId('thead')).toBeInTheDocument();
    });
  });

  describe('TableBody', () => {
    it('renders a tbody element', () => {
      render(
        <table>
          <TableBody data-testid="tbody">
            <tr><td>Body</td></tr>
          </TableBody>
        </table>
      );
      expect(screen.getByTestId('tbody')).toBeInTheDocument();
    });
  });

  describe('TableRow', () => {
    it('renders a tr element', () => {
      render(
        <table><tbody>
          <TableRow data-testid="row"><td>Cell</td></TableRow>
        </tbody></table>
      );
      expect(screen.getByTestId('row')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(
        <table><tbody>
          <TableRow data-testid="row" className="custom-row"><td>Cell</td></TableRow>
        </tbody></table>
      );
      expect(screen.getByTestId('row')).toHaveClass('custom-row');
    });
  });

  describe('TableHead', () => {
    it('renders a th element', () => {
      render(
        <table><thead><tr>
          <TableHead>Header</TableHead>
        </tr></thead></table>
      );
      expect(screen.getByText('Header')).toBeInTheDocument();
    });
  });

  describe('TableCell', () => {
    it('renders a td element', () => {
      render(
        <table><tbody><tr>
          <TableCell>Content</TableCell>
        </tr></tbody></table>
      );
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(
        <table><tbody><tr>
          <TableCell data-testid="cell" className="custom-cell">Content</TableCell>
        </tr></tbody></table>
      );
      expect(screen.getByTestId('cell')).toHaveClass('custom-cell');
    });
  });
});
