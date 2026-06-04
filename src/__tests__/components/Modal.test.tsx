import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from '@/components/ui/Modal';

describe('Modal', () => {
  const mockOnClose = vi.fn();
  const mockChildren = <div>Test Modal Content</div>;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    document.body.style.overflow = 'unset';
  });

  it('should not render when isOpen is false', () => {
    const { container } = render(
      <Modal isOpen={false} onClose={mockOnClose} title="Test Modal">
        {mockChildren}
      </Modal>
    );
    expect(container.firstChild).toBeNull();
  });

  it('should render when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        {mockChildren}
      </Modal>
    );
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Test Modal Content')).toBeInTheDocument();
  });

  it('should display modal title correctly', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Custom Modal Title">
        {mockChildren}
      </Modal>
    );
    expect(screen.getByText('Custom Modal Title')).toBeInTheDocument();
  });

  it('should render children correctly', () => {
    const customChildren = (
      <div>
        <p>Custom Content</p>
        <button>Custom Button</button>
      </div>
    );
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test">
        {customChildren}
      </Modal>
    );
    expect(screen.getByText('Custom Content')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Custom Button' })).toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        {mockChildren}
      </Modal>
    );
    const closeButton = screen.getByLabelText('Close modal');
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should call onClose when backdrop is clicked', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        {mockChildren}
      </Modal>
    );
    const backdrop = screen.getByRole('dialog').parentElement?.previousSibling as HTMLElement;
    fireEvent.click(backdrop);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should call onClose when Escape key is pressed', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        {mockChildren}
      </Modal>
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should not call onClose when other keys are pressed', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        {mockChildren}
      </Modal>
    );
    fireEvent.keyDown(document, { key: 'Enter' });
    fireEvent.keyDown(document, { key: 'Tab' });
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('should set body overflow to hidden when modal is open', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        {mockChildren}
      </Modal>
    );
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('should restore body overflow when modal is closed', () => {
    const { rerender } = render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        {mockChildren}
      </Modal>
    );
    expect(document.body.style.overflow).toBe('hidden');
    
    rerender(
      <Modal isOpen={false} onClose={mockOnClose} title="Test Modal">
        {mockChildren}
      </Modal>
    );
    expect(document.body.style.overflow).toBe('unset');
  });

  it('should apply small size class', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal" size="sm">
        {mockChildren}
      </Modal>
    );
    const modalContent = screen.getByRole('dialog');
    expect(modalContent).toHaveClass('max-w-md');
  });

  it('should apply medium size class by default', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        {mockChildren}
      </Modal>
    );
    const modalContent = screen.getByRole('dialog');
    expect(modalContent).toHaveClass('max-w-lg');
  });

  it('should apply large size class', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal" size="lg">
        {mockChildren}
      </Modal>
    );
    const modalContent = screen.getByRole('dialog');
    expect(modalContent).toHaveClass('max-w-2xl');
  });

  it('should have proper accessibility attributes', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        {mockChildren}
      </Modal>
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'modal-title');
  });

  it('should have backdrop with aria-hidden', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        {mockChildren}
      </Modal>
    );
    const backdrop = screen.getByRole('dialog').parentElement?.previousSibling as HTMLElement;
    expect(backdrop).toHaveAttribute('aria-hidden', 'true');
  });

  it('should cleanup event listeners on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');
    const { unmount } = render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        {mockChildren}
      </Modal>
    );
    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
  });

  it('should not add duplicate event listeners when re-rendered', () => {
    const addEventListenerSpy = vi.spyOn(document, 'addEventListener');
    const { rerender } = render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        {mockChildren}
      </Modal>
    );
    const initialCallCount = addEventListenerSpy.mock.calls.length;
    
    rerender(
      <Modal isOpen={true} onClose={mockOnClose} title="Updated Modal">
        {mockChildren}
      </Modal>
    );
    
    expect(addEventListenerSpy.mock.calls.length).toBe(initialCallCount);
  });

  it('should handle rapid open/close transitions', () => {
    const { rerender } = render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        {mockChildren}
      </Modal>
    );
    
    rerender(
      <Modal isOpen={false} onClose={mockOnClose} title="Test Modal">
        {mockChildren}
      </Modal>
    );
    
    rerender(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        {mockChildren}
      </Modal>
    );
    
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('should render complex children with nested elements', () => {
    const complexChildren = (
      <div>
        <form>
          <input type="text" placeholder="Test input" />
          <select>
            <option>Option 1</option>
          </select>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Complex Modal">
        {complexChildren}
      </Modal>
    );
    expect(screen.getByPlaceholderText('Test input')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });
});
