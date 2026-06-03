import { describe, it, expect } from 'vitest';
import { cn } from './cn';

describe('cn utility', () => {
  it('merges class names', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });

  it('handles conditional classes', () => {
    expect(cn('base', true && 'active', false && 'hidden')).toBe('base active');
  });

  it('merges Tailwind classes correctly', () => {
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4');
  });

  it('handles undefined and null values', () => {
    expect(cn('base', undefined, null, 'extra')).toBe('base extra');
  });

  it('handles arrays of classes', () => {
    expect(cn(['class1', 'class2'], 'class3')).toBe('class1 class2 class3');
  });

  it('handles objects with boolean values', () => {
    expect(cn({ active: true, hidden: false, visible: true })).toBe('active visible');
  });

  it('handles empty input', () => {
    expect(cn()).toBe('');
  });

  it('deduplicates conflicting Tailwind classes', () => {
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
  });

  it('handles complex combinations', () => {
    const result = cn(
      'base-class',
      { active: true, disabled: false },
      undefined,
      ['flex', 'items-center'],
      'hover:bg-blue-500'
    );
    expect(result).toContain('base-class');
    expect(result).toContain('active');
    expect(result).toContain('flex');
    expect(result).toContain('items-center');
    expect(result).not.toContain('disabled');
  });
});
