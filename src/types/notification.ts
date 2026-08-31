export type NotificationType =
  | 'BILL_DUE_SOON'
  | 'BILL_OVERDUE'
  | 'BUDGET_WARNING'
  | 'BUDGET_EXCEEDED'
  | 'SAVINGS_GOAL_MET'
  | 'SAVINGS_GOAL_MILESTONE'
  | 'SYSTEM_ALERT';

export type NotificationSeverity = 'INFO' | 'SUCCESS' | 'WARNING' | 'DANGER';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  severity: NotificationSeverity;
  linkUrl?: string;
  actionRequired?: boolean;
}
