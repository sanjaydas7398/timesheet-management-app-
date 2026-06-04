import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
}

export function Progress({ value, max = 100, className, showLabel = false }: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn('w-full', className)}>
      <div className="flex h-2 w-full overflow-hidden rounded-full bg-[#E5E7EB]">
        <div
          className="h-full bg-[#FF8A4C] transition-all duration-300 ease-in-out"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
      {showLabel && (
        <div className="mt-1 text-right text-xs font-medium text-[#6B7280]">
          {value}/{max} hrs
        </div>
      )}
    </div>
  );
}
