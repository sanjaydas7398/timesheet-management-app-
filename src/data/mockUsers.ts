export interface MockUser {
  id: string;
  email: string;
  password: string;
  name: string;
  role: string;
}

export const mockUsers: MockUser[] = [
  {
    id: '1',
    email: 'admin@tentwenty.com',
    password: 'admin123',
    name: 'John Doe',
    role: 'Admin',
  },
  {
    id: '2',
    email: 'user@tentwenty.com',
    password: 'user123',
    name: 'Jane Smith',
    role: 'User',
  },
  {
    id: '3',
    email: 'test@example.com',
    password: 'test123',
    name: 'Test User',
    role: 'User',
  },
];

export const findUserByEmail = (email: string): MockUser | undefined => {
  return mockUsers.find((user) => user.email === email);
};

export const validateUser = (email: string, password: string): MockUser | null => {
  const user = findUserByEmail(email);
  if (user && user.password === password) {
    return user;
  }
  return null;
};
