import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, LoginCredentials } from '../types/user';
import { AuthService } from '../services/authService';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => boolean;
  logout: () => void;
  switchProfile: (userId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => AuthService.getCurrentUser());

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    setUser(currentUser);
  }, []);

  const login = (credentials: LoginCredentials): boolean => {
    const result = AuthService.login(credentials);
    if (result.success && result.user) {
      setUser(result.user);
      return true;
    }
    return false;
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  const switchProfile = (userId: string) => {
    const switched = AuthService.switchDemoProfile(userId);
    if (switched) {
      setUser(switched);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, switchProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
