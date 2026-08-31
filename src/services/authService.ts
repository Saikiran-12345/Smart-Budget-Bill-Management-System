import { UserProfile, LoginCredentials } from '../types/user';
import { DEMO_USERS } from '../constants/defaultSettings';
import { StorageService } from './storageService';

const AUTH_USER_KEY = 'auth_current_user';

export class AuthService {
  public static getCurrentUser(): UserProfile | null {
    return StorageService.getItem<UserProfile | null>(AUTH_USER_KEY, DEMO_USERS[0]);
  }

  public static login(credentials: LoginCredentials): { success: boolean; user?: UserProfile; error?: string } {
    const user = DEMO_USERS.find(
      (u) => u.email.toLowerCase() === credentials.email.toLowerCase().trim()
    );

    if (!user) {
      // Allow any email login for demo convenience if email isn't in DEMO_USERS
      const newUser: UserProfile = {
        id: `user_${Date.now()}`,
        email: credentials.email,
        name: credentials.email.split('@')[0],
        role: 'USER',
        currency: '₹',
        joinedDate: new Date().toISOString().split('T')[0],
        lastLogin: new Date().toISOString(),
        preferredTheme: 'light',
        isDemoUser: true,
      };
      StorageService.setItem(AUTH_USER_KEY, newUser);
      return { success: true, user: newUser };
    }

    const updatedUser = {
      ...user,
      lastLogin: new Date().toISOString(),
    };

    StorageService.setItem(AUTH_USER_KEY, updatedUser);
    return { success: true, user: updatedUser };
  }

  public static logout(): void {
    StorageService.removeItem(AUTH_USER_KEY);
  }

  public static switchDemoProfile(userId: string): UserProfile | null {
    const targetUser = DEMO_USERS.find((u) => u.id === userId);
    if (targetUser) {
      StorageService.setItem(AUTH_USER_KEY, targetUser);
      return targetUser;
    }
    return null;
  }
}
