import { AppNotification } from '../types/notification';
import { INITIAL_DEMO_NOTIFICATIONS } from '../constants/initialDemoData';
import { StorageService } from './storageService';
import { BillService } from './billService';
import { BudgetService } from './budgetService';
import { calculateBudgetStatusSummary } from '../math/budgetMath';
import { isDateInPast, getDaysDifference } from '../math/dateUtils';

const STORAGE_KEY = 'app_notifications_list';

export class NotificationService {
  public static getAll(): AppNotification[] {
    return StorageService.getItem<AppNotification[]>(STORAGE_KEY, INITIAL_DEMO_NOTIFICATIONS);
  }

  public static getUnreadCount(): number {
    return this.getAll().filter((n) => !n.isRead).length;
  }

  public static markAsRead(id: string): void {
    const list = this.getAll();
    const index = list.findIndex((n) => n.id === id);
    if (index !== -1) {
      list[index].isRead = true;
      StorageService.setItem(STORAGE_KEY, list);
    }
  }

  public static markAllAsRead(): void {
    const list = this.getAll().map((n) => ({ ...n, isRead: true }));
    StorageService.setItem(STORAGE_KEY, list);
  }

  public static delete(id: string): void {
    const list = this.getAll().filter((n) => n.id !== id);
    StorageService.setItem(STORAGE_KEY, list);
  }

  public static clearAll(): void {
    StorageService.setItem(STORAGE_KEY, []);
  }

  public static generateDynamicSystemAlerts(): AppNotification[] {
    const notifications = this.getAll();
    const bills = BillService.getAll();
    const budgets = BudgetService.getAll();
    const todayStr = new Date().toISOString().split('T')[0];

    let newAlertsCount = 0;

    // Check overdue/upcoming bills
    bills.forEach((b) => {
      if (b.status === 'PAID' || b.status === 'CANCELLED') return;
      const daysDiff = getDaysDifference(todayStr, b.dueDate);

      if (isDateInPast(b.dueDate)) {
        const existing = notifications.find((n) => n.type === 'BILL_OVERDUE' && n.message.includes(b.billName));
        if (!existing) {
          notifications.unshift({
            id: `notif_bill_overdue_${b.id}_${Date.now()}`,
            type: 'BILL_OVERDUE',
            title: 'Bill Overdue Alert!',
            message: `${b.billName} payment of ₹${b.amount.toLocaleString()} was due on ${b.dueDate}.`,
            timestamp: new Date().toISOString(),
            isRead: false,
            severity: 'DANGER',
            linkUrl: '/bills',
            actionRequired: true,
          });
          newAlertsCount++;
        }
      } else if (daysDiff <= b.reminderDaysBefore) {
        const existing = notifications.find((n) => n.type === 'BILL_DUE_SOON' && n.message.includes(b.billName));
        if (!existing) {
          notifications.unshift({
            id: `notif_bill_due_${b.id}_${Date.now()}`,
            type: 'BILL_DUE_SOON',
            title: 'Upcoming Bill Due',
            message: `${b.billName} (₹${b.amount.toLocaleString()}) is due in ${daysDiff} day(s).`,
            timestamp: new Date().toISOString(),
            isRead: false,
            severity: 'WARNING',
            linkUrl: '/bills',
          });
          newAlertsCount++;
        }
      }
    });

    // Check budget thresholds
    budgets.forEach((b) => {
      const summary = calculateBudgetStatusSummary(b);
      if (summary.isOverBudget) {
        const existing = notifications.find((n) => n.type === 'BUDGET_EXCEEDED' && n.message.includes(b.budgetName));
        if (!existing) {
          notifications.unshift({
            id: `notif_bud_exceeded_${b.id}_${Date.now()}`,
            type: 'BUDGET_EXCEEDED',
            title: 'Budget Limit Exceeded',
            message: `${b.budgetName} has reached ${summary.percentageUsed.toFixed(1)}% of limit.`,
            timestamp: new Date().toISOString(),
            isRead: false,
            severity: 'WARNING',
            linkUrl: '/budget',
          });
          newAlertsCount++;
        }
      }
    });

    if (newAlertsCount > 0) {
      StorageService.setItem(STORAGE_KEY, notifications);
    }

    return notifications;
  }
}
