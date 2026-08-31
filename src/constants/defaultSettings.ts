import { SystemSettings } from '../types';

export const DEFAULT_SETTINGS: SystemSettings = {
  currencySymbol: '₹',
  currencyCode: 'INR',
  dateFormat: 'YYYY-MM-DD',
  theme: 'light',
  enableBudgetAlerts: true,
  budgetAlert50: true,
  budgetAlert75: true,
  budgetAlert90: true,
  budgetAlert100: true,
  enableBillReminders: true,
  billReminderDaysBefore: 5,
  enableSavingsMilestoneAlerts: true,
  compactTableView: false,
  defaultRowsPerPage: 10,
  fiscalYearStartMonth: 4, // April for INR
  soundEnabled: false,
};

export const SUPPORTED_CURRENCIES = [
  { symbol: '₹', code: 'INR', label: 'Indian Rupee (₹)' },
  { symbol: '$', code: 'USD', label: 'US Dollar ($)' },
  { symbol: '€', code: 'EUR', label: 'Euro (€)' },
  { symbol: '£', code: 'GBP', label: 'British Pound (£)' },
  { symbol: '¥', code: 'JPY', label: 'Japanese Yen (¥)' },
  { symbol: 'A$', code: 'AUD', label: 'Australian Dollar (A$)' },
  { symbol: 'C$', code: 'CAD', label: 'Canadian Dollar (C$)' },
  { symbol: 'CHF', code: 'CHF', label: 'Swiss Franc (CHF)' },
  { symbol: 'AED', code: 'AED', label: 'UAE Dirham (AED)' },
  { symbol: 'S$', code: 'SGD', label: 'Singapore Dollar (S$)' },
];

export const DEMO_USERS = [
  {
    id: 'user_admin_001',
    email: 'admin@example.com',
    name: 'Alex Johnson (Admin)',
    role: 'ADMIN' as const,
    currency: '₹',
    joinedDate: '2025-01-01',
    lastLogin: new Date().toISOString(),
    preferredTheme: 'light' as const,
    isDemoUser: true,
  },
  {
    id: 'user_regular_002',
    email: 'user@example.com',
    name: 'Sarah Smith (User)',
    role: 'USER' as const,
    currency: '₹',
    joinedDate: '2025-02-15',
    lastLogin: new Date().toISOString(),
    preferredTheme: 'dark' as const,
    isDemoUser: true,
  },
];
