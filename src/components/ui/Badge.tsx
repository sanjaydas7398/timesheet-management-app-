import React, { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

export type BadgeVariant = 'completed' | 'incomplete' | 'missing';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant: BadgeVariant;
}

const badgeVariants: Record<BadgeVariant, string> = {
  completed: 'bg-[#D1FAE5] text-[#065F46] border-[#A7F3D0]',
  incomplete: 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]',
  missing: 'bg-[#FEE2E2] text-[#991B1B] border-[#FECACA]',
};

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md border px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide',
          badgeVariants[variant],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);
Badge.displayName = 'Badge';

export { Badge };
