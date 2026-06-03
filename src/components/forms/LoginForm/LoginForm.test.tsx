import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { LoginForm } from './index';

describe('LoginForm', () => {
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  describe('Rendering', () => {
    it('renders form with all fields', () => {
      render(<LoginForm onSubmit={mockOnSubmit} />);

      expect(screen.getByRole('heading', { name: /welcome back/i })).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/remember me/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    });

    it('renders email input with correct attributes', () => {
      render(<LoginForm onSubmit={mockOnSubmit} />);
      const emailInput = screen.getByLabelText(/email/i);

      expect(emailInput).toHaveAttribute('type', 'email');
      expect(emailInput).toHaveAttribute('placeholder', 'name@example.com');
      expect(emailInput).toHaveAttribute('autocomplete', 'email');
    });

    it('renders password input with correct attributes', () => {
      render(<LoginForm onSubmit={mockOnSubmit} />);
      const passwordInput = screen.getByLabelText(/password/i);

      expect(passwordInput).toHaveAttribute('type', 'password');
      expect(passwordInput).toHaveAttribute('autocomplete', 'current-password');
    });

    it('does not show error message initially', () => {
      render(<LoginForm onSubmit={mockOnSubmit} />);
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('shows error message when provided', () => {
      render(<LoginForm onSubmit={mockOnSubmit} error="Invalid credentials" />);
      expect(screen.getByRole('alert')).toHaveTextContent('Invalid credentials');
    });
  });

  describe('Form Validation', () => {
    it('shows error when email is empty', async () => {
      const user = userEvent.setup();
      render(<LoginForm onSubmit={mockOnSubmit} />);

      const submitButton = screen.getByRole('button', { name: /sign in/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      });
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('shows error when email is invalid', async () => {
      const user = userEvent.setup();
      render(<LoginForm onSubmit={mockOnSubmit} />);

      const emailInput = screen.getByLabelText(/email/i);
      await user.type(emailInput, 'invalid-email');
      await user.click(screen.getByRole('button', { name: /sign in/i }));

      await waitFor(() => {
        expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
      });
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('shows error when password is empty', async () => {
      const user = userEvent.setup();
      render(<LoginForm onSubmit={mockOnSubmit} />);

      const emailInput = screen.getByLabelText(/email/i);
      await user.type(emailInput, 'test@example.com');
      await user.click(screen.getByRole('button', { name: /sign in/i }));

      await waitFor(() => {
        expect(screen.getByText(/password is required/i)).toBeInTheDocument();
      });
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('does not show errors when both fields are valid', async () => {
      const user = userEvent.setup();
      render(<LoginForm onSubmit={mockOnSubmit} />);

      await user.type(screen.getByLabelText(/email/i), 'test@example.com');
      await user.type(screen.getByLabelText(/password/i), 'password123');
      await user.click(screen.getByRole('button', { name: /sign in/i }));

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalled();
      });

      expect(screen.queryByText(/email is required/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/password is required/i)).not.toBeInTheDocument();
    });
  });

  describe('Form Submission', () => {
    it('calls onSubmit with form values', async () => {
      const user = userEvent.setup();
      render(<LoginForm onSubmit={mockOnSubmit} />);

      await user.type(screen.getByLabelText(/email/i), 'test@example.com');
      await user.type(screen.getByLabelText(/password/i), 'password123');
      await user.click(screen.getByRole('button', { name: /sign in/i }));

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalled();
      });

      const callArgs = mockOnSubmit.mock.calls[0][0];
      expect(callArgs).toEqual({
        email: 'test@example.com',
        password: 'password123',
        rememberMe: false,
      });
    });

    it('includes rememberMe value when checked', async () => {
      const user = userEvent.setup();
      render(<LoginForm onSubmit={mockOnSubmit} />);

      await user.type(screen.getByLabelText(/email/i), 'test@example.com');
      await user.type(screen.getByLabelText(/password/i), 'password123');
      await user.click(screen.getByLabelText(/remember me/i));
      await user.click(screen.getByRole('button', { name: /sign in/i }));

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalled();
      });

      const callArgs = mockOnSubmit.mock.calls[0][0];
      expect(callArgs).toEqual({
        email: 'test@example.com',
        password: 'password123',
        rememberMe: true,
      });
    });

    it('does not submit when validation fails', async () => {
      const user = userEvent.setup();
      render(<LoginForm onSubmit={mockOnSubmit} />);

      await user.click(screen.getByRole('button', { name: /sign in/i }));

      await waitFor(() => {
        expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      });
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });

  describe('Loading State', () => {
    it('disables all inputs when loading', () => {
      render(<LoginForm onSubmit={mockOnSubmit} isLoading />);

      expect(screen.getByLabelText(/email/i)).toBeDisabled();
      expect(screen.getByLabelText(/password/i)).toBeDisabled();
      expect(screen.getByLabelText(/remember me/i)).toBeDisabled();
    });

    it('disables submit button when loading', () => {
      render(<LoginForm onSubmit={mockOnSubmit} isLoading />);
      expect(screen.getByRole('button', { name: /sign in/i })).toBeDisabled();
    });

    it('shows loading state on button', () => {
      render(<LoginForm onSubmit={mockOnSubmit} isLoading />);
      const button = screen.getByRole('button', { name: /sign in/i });
      expect(button).toHaveAttribute('aria-busy', 'true');
    });

    it('prevents submission when loading', async () => {
      const user = userEvent.setup();
      render(<LoginForm onSubmit={mockOnSubmit} isLoading />);

      await user.type(screen.getByLabelText(/email/i), 'test@example.com');
      await user.type(screen.getByLabelText(/password/i), 'password123');
      await user.click(screen.getByRole('button', { name: /sign in/i }));

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });

  describe('Error Display', () => {
    it('displays server error message', () => {
      render(<LoginForm onSubmit={mockOnSubmit} error="Server error occurred" />);
      const errorAlert = screen.getByRole('alert');

      expect(errorAlert).toBeInTheDocument();
      expect(errorAlert).toHaveTextContent('Server error occurred');
    });

    it('hides error message when error prop is empty', () => {
      const { rerender } = render(<LoginForm onSubmit={mockOnSubmit} error="Error message" />);
      expect(screen.getByRole('alert')).toBeInTheDocument();

      rerender(<LoginForm onSubmit={mockOnSubmit} error="" />);
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper form structure', () => {
      render(<LoginForm onSubmit={mockOnSubmit} />);
      const form = document.querySelector('form');
      expect(form).toBeInTheDocument();
    });

    it('labels are associated with inputs', () => {
      render(<LoginForm onSubmit={mockOnSubmit} />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);

      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
    });

    it('error messages have role alert', async () => {
      const user = userEvent.setup();
      render(<LoginForm onSubmit={mockOnSubmit} />);

      await user.click(screen.getByRole('button', { name: /sign in/i }));

      await waitFor(() => {
        const alerts = screen.getAllByRole('alert');
        expect(alerts.length).toBeGreaterThan(0);
      });
    });

    it('submit button has correct type', () => {
      render(<LoginForm onSubmit={mockOnSubmit} />);
      const button = screen.getByRole('button', { name: /sign in/i });
      expect(button).toHaveAttribute('type', 'submit');
    });
  });

  describe('User Interactions', () => {
    it('allows typing in email field', async () => {
      const user = userEvent.setup();
      render(<LoginForm onSubmit={mockOnSubmit} />);

      const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
      await user.type(emailInput, 'user@test.com');

      expect(emailInput.value).toBe('user@test.com');
    });

    it('allows typing in password field', async () => {
      const user = userEvent.setup();
      render(<LoginForm onSubmit={mockOnSubmit} />);

      const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement;
      await user.type(passwordInput, 'secretpass');

      expect(passwordInput.value).toBe('secretpass');
    });

    it('allows toggling remember me checkbox', async () => {
      const user = userEvent.setup();
      render(<LoginForm onSubmit={mockOnSubmit} />);

      const checkbox = screen.getByLabelText(/remember me/i) as HTMLInputElement;
      expect(checkbox.checked).toBe(false);

      await user.click(checkbox);
      expect(checkbox.checked).toBe(true);

      await user.click(checkbox);
      expect(checkbox.checked).toBe(false);
    });
  });
});

// Import React for beforeEach
import { beforeEach } from 'vitest';
