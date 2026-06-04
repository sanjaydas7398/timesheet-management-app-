import React from 'react';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Tailwind-like utility classes or custom width/height.
   * Example: "h-6 w-32".
   */
  className?: string;
}

/**
 * Simple skeleton loader that displays a pulsing gray block.
 * Use the `className` prop to size the element (height, width, margins, etc.).
 */
export function Skeleton({ className = '', ...rest }: SkeletonProps) {
  return (
    <div
      data-testid="skeleton"
      className={`bg-gray-300 rounded ${className} animate-pulse`}
      {...rest}
    />
  );
}
