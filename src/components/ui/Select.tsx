import React, { SelectHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, children, style, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          'flex h-11 appearance-none rounded-lg border bg-white px-3.5 py-2.5 pr-10 text-sm text-[#111928] focus:outline-none focus:ring-0 focus:border-[#D1D5DB] disabled:cursor-not-allowed disabled:opacity-50 transition-colors cursor-pointer',
          'bg-[url("data:image/svg+xml,%3Csvg%20width%3D%2212%22%20height%3D%228%22%20viewBox%3D%220%200%2012%208%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M1%201.5L6%206.5L11%201.5%22%20stroke%3D%22%236B7280%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E")] bg-[length:12px_8px] bg-[right_12px_center] bg-no-repeat',
          '[&>option]:cursor-pointer [&>option]:text-[#111928]',
          !style?.width && 'w-full',
          error
            ? 'border-[#F05252]'
            : 'border-[#D1D5DB]',
          className
        )}
        style={style}
        {...props}
      >
        {children}
      </select>
    );
  }
);
Select.displayName = 'Select';

export { Select };
