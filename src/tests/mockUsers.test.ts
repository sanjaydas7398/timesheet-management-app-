import { describe, it, expect } from 'vitest';
import { findUserByEmail, validateUser, mockUsers } from '@/data/mockUsers';

describe('mockUsers', () => {
  it('should contain at least one user', () => {
    expect(mockUsers.length).toBeGreaterThan(0);
  });

  it('every user should have required fields', () => {
    mockUsers.forEach((user) => {
      expect(user.id).toBeTruthy();
      expect(user.email).toBeTruthy();
      expect(user.password).toBeTruthy();
      expect(user.name).toBeTruthy();
      expect(user.role).toBeTruthy();
    });
  });
});

describe('findUserByEmail', () => {
  it('returns user when email exists', () => {
    const user = findUserByEmail('admin@tentwenty.com');
    expect(user).toBeDefined();
    expect(user?.email).toBe('admin@tentwenty.com');
    expect(user?.name).toBe('John Doe');
  });

  it('returns undefined when email does not exist', () => {
    const user = findUserByEmail('notfound@example.com');
    expect(user).toBeUndefined();
  });

  it('is case sensitive', () => {
    const user = findUserByEmail('ADMIN@TENTWENTY.COM');
    expect(user).toBeUndefined();
  });
});

describe('validateUser', () => {
  it('returns user with correct credentials', () => {
    const user = validateUser('admin@tentwenty.com', 'admin123');
    expect(user).not.toBeNull();
    expect(user?.email).toBe('admin@tentwenty.com');
    expect(user?.id).toBe('1');
  });

  it('returns null with wrong password', () => {
    const user = validateUser('admin@tentwenty.com', 'wrongpassword');
    expect(user).toBeNull();
  });

  it('returns null with wrong email', () => {
    const user = validateUser('notfound@example.com', 'admin123');
    expect(user).toBeNull();
  });

  it('returns null with empty credentials', () => {
    const user = validateUser('', '');
    expect(user).toBeNull();
  });

  it('validates all mock users correctly', () => {
    const result1 = validateUser('admin@tentwenty.com', 'admin123');
    const result2 = validateUser('user@tentwenty.com', 'user123');
    const result3 = validateUser('test@example.com', 'test123');

    expect(result1).not.toBeNull();
    expect(result2).not.toBeNull();
    expect(result3).not.toBeNull();
  });
});
