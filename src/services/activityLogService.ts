import { ActivityLogItem, ActivityActionType } from '../types/activity';
import { StorageService } from './storageService';
import { AuthService } from './authService';

const STORAGE_KEY = 'activity_audit_logs';

export class ActivityLogService {
  public static getAll(): ActivityLogItem[] {
    return StorageService.getItem<ActivityLogItem[]>(STORAGE_KEY, [
      {
        id: 'act_001',
        action: 'LOGIN',
        module: 'Authentication',
        description: 'User admin@example.com logged into the system.',
        timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
        userEmail: 'admin@example.com',
      },
      {
        id: 'act_002',
        action: 'CREATE_EXPENSE',
        module: 'Expense Management',
        description: 'Created new expense item "Supermarket Groceries" (₹4,850).',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        userEmail: 'admin@example.com',
      },
    ]);
  }

  public static logAction(
    action: ActivityActionType,
    module: string,
    description: string,
    metadata?: Record<string, any>
  ): ActivityLogItem {
    const logs = this.getAll();
    const currentUser = AuthService.getCurrentUser();
    const userEmail = currentUser ? currentUser.email : 'system@local';

    const newLog: ActivityLogItem = {
      id: `act_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      action,
      module,
      description,
      timestamp: new Date().toISOString(),
      userEmail,
      metadata,
    };

    const updated = [newLog, ...logs.slice(0, 199)]; // retain last 200 logs
    StorageService.setItem(STORAGE_KEY, updated);
    return newLog;
  }

  public static clearLogs(): void {
    StorageService.setItem(STORAGE_KEY, []);
  }
}
