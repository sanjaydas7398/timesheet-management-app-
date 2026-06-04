import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Progress } from './Progress';

describe('Progress', () => {
  it('renders progress bar', () => {
    render(<Progress value={50} />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
  });

  it('sets correct aria attributes', () => {
    render(<Progress value={30} max={100} />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '30');
    expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    expect(progressBar).toHaveAttribute('aria-valuemax', '100');
  });

  it('calculates percentage correctly', () => {
    render(<Progress value={20} max={40} />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar.style.width).toBe('50%');
  });

  it('clamps percentage to 0 when value is negative', () => {
    render(<Progress value={-10} />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar.style.width).toBe('0%');
  });

  it('clamps percentage to 100 when value exceeds max', () => {
    render(<Progress value={200} max={100} />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar.style.width).toBe('100%');
  });

  it('shows label when showLabel is true', () => {
    render(<Progress value={30} max={40} showLabel />);
    expect(screen.getByText('30/40 hrs')).toBeInTheDocument();
  });

  it('does not show label by default', () => {
    render(<Progress value={30} max={40} />);
    expect(screen.queryByText('30/40 hrs')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Progress value={50} className="my-custom" />);
    expect(container.firstChild).toHaveClass('my-custom');
  });
});
