import React, { TextareaHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, style, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'flex min-h-[120px] rounded-lg border bg-white px-3.5 py-2.5 text-sm text-[#111928] placeholder:text-[#6B7280] focus:outline-none focus:ring-0 focus:border-[#D1D5DB] disabled:cursor-not-allowed disabled:opacity-50 transition-colors resize-none',
          !style?.width && 'w-full',
          error
            ? 'border-[#F05252]'
            : 'border-[#D1D5DB]',
          className
        )}
        style={style}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
