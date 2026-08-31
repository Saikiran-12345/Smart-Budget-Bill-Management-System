export type CalendarEventType = 'BILL_DUE' | 'INCOME_PAYDAY' | 'SAVINGS_TARGET' | 'BUDGET_RENEWAL' | 'CUSTOM_REMINDER';

export interface CalendarEvent {
  id: string;
  title: string;
  amount: number;
  date: string;
  type: CalendarEventType;
  status?: string;
  category?: string;
  referenceId?: string;
  description?: string;
}

export interface CalendarDay {
  date: string;
  dayOfMonth: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: CalendarEvent[];
  totalDue: number;
  totalIncome: number;
}
