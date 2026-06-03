import React, { LabelHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

const Label = forwardRef<HTMLLabelElement, LabelProps>(({ className, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={cn(
        'block text-sm font-medium leading-[150%] text-[#111928] peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className
      )}
      {...props}
    />
  );
});
Label.displayName = 'Label';

export { Label };
