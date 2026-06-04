'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils/cn';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'custom';
  width?: string;
  height?: string;
}

export function Modal({ isOpen, onClose, title, children, size = 'md', width, height }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    custom: '',
  };

  const sizeStyles = size === 'custom' && width && height ? {
    maxWidth: width,
    width: '100%',
    height,
    borderRadius: '8px',
    border: '1px solid #E5E7EB',
  } : {};

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          ref={modalRef}
          className={cn(
            'relative w-full transform overflow-hidden bg-white shadow-xl transition-all',
            size !== 'custom' && 'rounded-lg',
            sizeClasses[size]
          )}
          style={sizeStyles}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#E5E7EB] px-6 py-4">
            <h3
              id="modal-title"
              className="text-lg font-semibold leading-[150%] text-[#111928]"
            >
              {title}
            </h3>
            <button
              onClick={onClose}
              className="rounded-lg p-1 text-[#6B7280] transition-colors hover:bg-[#F3F4F6] hover:text-[#111928] cursor-pointer"
              aria-label="Close modal"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
