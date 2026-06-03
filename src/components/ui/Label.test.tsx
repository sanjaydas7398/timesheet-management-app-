import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Label } from './Label';

describe('Label', () => {
  describe('Rendering', () => {
    it('renders label element', () => {
      render(<Label>Test Label</Label>);
      const label = screen.getByText('Test Label');
      expect(label).toBeInTheDocument();
      expect(label.tagName).toBe('LABEL');
    });

    it('renders children correctly', () => {
      render(<Label>Email Address</Label>);
      expect(screen.getByText('Email Address')).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      render(<Label className="custom-label">Label</Label>);
      const label = screen.getByText('Label');
      expect(label).toHaveClass('custom-label');
    });

    it('applies default styles', () => {
      render(<Label>Styled Label</Label>);
      const label = screen.getByText('Styled Label');
      expect(label).toHaveClass('text-sm', 'font-medium', 'text-[#111928]');
    });

    it('merges custom className with default styles', () => {
      render(<Label className="text-red-500">Custom</Label>);
      const label = screen.getByText('Custom');
      expect(label).toHaveClass('text-sm', 'font-medium');
    });
  });

  describe('Attributes', () => {
    it('supports htmlFor attribute', () => {
      render(<Label htmlFor="email-input">Email</Label>);
      const label = screen.getByText('Email');
      expect(label).toHaveAttribute('for', 'email-input');
    });

    it('supports id attribute', () => {
      render(<Label id="email-label">Email</Label>);
      const label = screen.getByText('Email');
      expect(label).toHaveAttribute('id', 'email-label');
    });

    it('associates with input via htmlFor', () => {
      render(
        <>
          <Label htmlFor="test-input">Test Input</Label>
          <input id="test-input" />
        </>
      );

      const label = screen.getByText('Test Input');
      const input = screen.getByRole('textbox');

      expect(label).toHaveAttribute('for', 'test-input');
      expect(input).toHaveAttribute('id', 'test-input');
    });
  });

  describe('Content Types', () => {
    it('renders text content', () => {
      render(<Label>Simple Text</Label>);
      expect(screen.getByText('Simple Text')).toBeInTheDocument();
    });

    it('renders with nested elements', () => {
      render(
        <Label>
          Label with <span>nested</span> elements
        </Label>
      );
      expect(screen.getByText('nested')).toBeInTheDocument();
    });

    it('renders with asterisk for required fields', () => {
      render(
        <Label>
          Email <span className="text-red-500">*</span>
        </Label>
      );
      expect(screen.getByText('*')).toBeInTheDocument();
    });
  });

  describe('Event Handlers', () => {
    it('handles onClick event', async () => {
      const handleClick = vi.fn();
      render(<Label onClick={handleClick}>Clickable</Label>);

      const label = screen.getByText('Clickable');
      label.click();

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles onMouseEnter event', async () => {
      const handleMouseEnter = vi.fn();
      const user = userEvent.setup();
      render(<Label onMouseEnter={handleMouseEnter}>Hover</Label>);

      const label = screen.getByText('Hover');
      await user.hover(label);

      expect(handleMouseEnter).toHaveBeenCalled();
    });
  });

  describe('Forward Ref', () => {
    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(<Label ref={ref}>Ref Test</Label>);
      expect(ref).toHaveBeenCalled();
    });

    it('allows ref access to label element', () => {
      const ref = { current: null as HTMLLabelElement | null };
      render(<Label ref={ref}>Label</Label>);
      expect(ref.current).toBeInstanceOf(HTMLLabelElement);
      expect(ref.current?.tagName).toBe('LABEL');
    });
  });

  describe('Accessibility', () => {
    it('maintains semantic HTML with label element', () => {
      render(<Label htmlFor="input">Accessible Label</Label>);
      const label = screen.getByText('Accessible Label');
      expect(label.tagName).toBe('LABEL');
    });

    it('has peer-disabled styles for disabled state support', () => {
      render(<Label>Disabled Support</Label>);
      const label = screen.getByText('Disabled Support');
      expect(label).toHaveClass('peer-disabled:cursor-not-allowed');
    });
  });

  describe('Styling', () => {
    it('has correct text size', () => {
      render(<Label>Size Test</Label>);
      const label = screen.getByText('Size Test');
      expect(label).toHaveClass('text-sm');
    });

    it('has correct font weight', () => {
      render(<Label>Weight Test</Label>);
      const label = screen.getByText('Weight Test');
      expect(label).toHaveClass('font-medium');
    });

    it('has correct line height', () => {
      render(<Label>Line Height Test</Label>);
      const label = screen.getByText('Line Height Test');
      expect(label).toHaveClass('leading-[150%]');
    });

    it('has correct text color', () => {
      render(<Label>Color Test</Label>);
      const label = screen.getByText('Color Test');
      expect(label).toHaveClass('text-[#111928]');
    });
  });
});
