import { describe, it, expect, beforeEach } from 'vitest';
import { AuthService } from '../services/authService';
import { StorageService } from '../services/storageService';
import { DEMO_USERS } from '../constants/defaultSettings';

describe('AuthService Session Manager', () => {
  beforeEach(() => {
    StorageService.clearAll();
  });

  it('should authenticate demo user admin@example.com', () => {
    const result = AuthService.login({ email: 'admin@example.com' });
    expect(result.success).toBe(true);
    expect(result.user?.role).toBe('ADMIN');

    const current = AuthService.getCurrentUser();
    expect(current?.email).toBe('admin@example.com');
  });

  it('should switch demo profile to user@example.com', () => {
    AuthService.login({ email: 'admin@example.com' });
    const switched = AuthService.switchDemoProfile('user_regular_002');
    expect(switched?.email).toBe('user@example.com');

    const current = AuthService.getCurrentUser();
    expect(current?.email).toBe('user@example.com');
  });

  it('should reset to default demo profile upon logout', () => {
    AuthService.login({ email: 'admin@example.com' });
    AuthService.logout();
    expect(AuthService.getCurrentUser()?.id).toBe(DEMO_USERS[0].id);
  });
});
