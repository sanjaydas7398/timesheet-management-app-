import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  describe('Rendering', () => {
    it('renders checkbox element', () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
    });

    it('renders without label', () => {
      render(<Checkbox />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
      expect(screen.queryByRole('label')).not.toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<Checkbox label="Accept terms" />);
      expect(screen.getByLabelText('Accept terms')).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      render(<Checkbox className="custom-checkbox" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveClass('custom-checkbox');
    });
  });

  describe('Label Association', () => {
    it('associates label with checkbox using htmlFor', () => {
      render(<Checkbox label="Test Label" id="test-checkbox" />);
      const checkbox = screen.getByRole('checkbox');
      const label = screen.getByText('Test Label');

      expect(checkbox).toHaveAttribute('id', 'test-checkbox');
      expect(label.closest('label')).toHaveAttribute('for', 'test-checkbox');
    });

    it('generates unique id when not provided', () => {
      render(<Checkbox label="Auto ID" />);
      const checkbox = screen.getByRole('checkbox');
      const id = checkbox.getAttribute('id');

      expect(id).toBeTruthy();
      expect(id).toContain('_r_'); // React useId format
    });

    it('clicking label toggles checkbox', async () => {
      const user = userEvent.setup();
      render(<Checkbox label="Click me" />);

      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.checked).toBe(false);

      await user.click(screen.getByText('Click me'));
      expect(checkbox.checked).toBe(true);
    });
  });

  describe('States', () => {
    it('renders unchecked by default', () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.checked).toBe(false);
    });

    it('renders checked when defaultChecked is true', () => {
      render(<Checkbox defaultChecked />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.checked).toBe(true);
    });

    it('renders as disabled', () => {
      render(<Checkbox disabled />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeDisabled();
    });

    it('has disabled styles when disabled', () => {
      render(<Checkbox disabled />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveClass('disabled:cursor-not-allowed');
    });
  });

  describe('User Interactions', () => {
    it('toggles on click', async () => {
      const user = userEvent.setup();
      render(<Checkbox />);

      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.checked).toBe(false);

      await user.click(checkbox);
      expect(checkbox.checked).toBe(true);

      await user.click(checkbox);
      expect(checkbox.checked).toBe(false);
    });

    it('calls onChange when clicked', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<Checkbox onChange={handleChange} />);

      await user.click(screen.getByRole('checkbox'));
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('does not toggle when disabled', async () => {
      const user = userEvent.setup();
      render(<Checkbox disabled />);

      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      await user.click(checkbox);
      expect(checkbox.checked).toBe(false);
    });

    it('handles keyboard interaction (Space)', async () => {
      const user = userEvent.setup();
      render(<Checkbox />);

      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      checkbox.focus();

      await user.keyboard(' ');
      expect(checkbox.checked).toBe(true);
    });
  });

  describe('Controlled Component', () => {
    it('works as controlled component', async () => {
      const user = userEvent.setup();
      const ControlledCheckbox = () => {
        const [checked, setChecked] = React.useState(false);
        return (
          <Checkbox
            label="Controlled"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
        );
      };

      render(<ControlledCheckbox />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;

      expect(checkbox.checked).toBe(false);
      await user.click(checkbox);
      expect(checkbox.checked).toBe(true);
    });
  });

  describe('Attributes', () => {
    it('supports name attribute', () => {
      render(<Checkbox name="terms" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('name', 'terms');
    });

    it('supports value attribute', () => {
      render(<Checkbox value="accepted" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('value', 'accepted');
    });

    it('supports required attribute', () => {
      render(<Checkbox required />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeRequired();
    });
  });

  describe('Forward Ref', () => {
    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(<Checkbox ref={ref} />);
      expect(ref).toHaveBeenCalled();
    });

    it('allows ref access to checkbox element', () => {
      const ref = { current: null as HTMLInputElement | null };
      render(<Checkbox ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
  });

  describe('Accessibility', () => {
    it('has correct checkbox role', () => {
      render(<Checkbox />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('supports aria-label', () => {
      render(<Checkbox aria-label="Accept terms" />);
      expect(screen.getByLabelText('Accept terms')).toBeInTheDocument();
    });

    it('label is clickable', () => {
      render(<Checkbox label="Clickable Label" />);
      const label = screen.getByText('Clickable Label').closest('label');
      expect(label).toHaveClass('cursor-pointer');
    });
  });
});

// Add React import for controlled component test
import React from 'react';
