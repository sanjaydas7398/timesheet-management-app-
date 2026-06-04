import { LoginCredentials, LoginResponse } from '@/types/auth.types';

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Login failed');
    }

    return response.json();
  },

  async logout(): Promise<void> {
    // Clear session storage or cookies
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },

  setToken(token: string): void {
    localStorage.setItem('token', token);
  },

  getUser(): string | null {
    return localStorage.getItem('user');
  },

  setUser(user: string): void {
    localStorage.setItem('user', user);
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};
