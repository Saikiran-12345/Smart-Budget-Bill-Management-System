export type UserRole = 'ADMIN' | 'USER' | 'VIEWER';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
  currency: string;
  joinedDate: string;
  lastLogin: string;
  preferredTheme: 'light' | 'dark' | 'system';
  isDemoUser: boolean;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: UserProfile | null;
  token: string | null;
  error: string | null;
  loading: boolean;
}

export interface LoginCredentials {
  email: string;
  password?: string;
  rememberMe?: boolean;
}
