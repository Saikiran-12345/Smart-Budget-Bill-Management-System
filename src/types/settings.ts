export interface SystemSettings {
  currencySymbol: string; // '₹', '$', '€', '£', etc.
  currencyCode: string; // 'INR', 'USD', 'EUR', 'GBP'
  dateFormat: string; // 'YYYY-MM-DD', 'DD/MM/YYYY', 'MM/DD/YYYY'
  theme: 'light' | 'dark' | 'system';
  enableBudgetAlerts: boolean;
  budgetAlert50: boolean;
  budgetAlert75: boolean;
  budgetAlert90: boolean;
  budgetAlert100: boolean;
  enableBillReminders: boolean;
  billReminderDaysBefore: number;
  enableSavingsMilestoneAlerts: boolean;
  compactTableView: boolean;
  defaultRowsPerPage: number;
  fiscalYearStartMonth: number; // 1 = Jan, 4 = Apr
  soundEnabled: boolean;
}
