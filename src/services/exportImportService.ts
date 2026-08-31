import { FullApplicationBackup, ImportValidationResult } from '../types/export';
import { StorageService } from './storageService';
import { AuthService } from './authService';
import { IncomeService } from './incomeService';
import { ExpenseService } from './expenseService';
import { CategoryService } from './categoryService';
import { BillService } from './billService';
import { PaymentService } from './paymentService';
import { BudgetService } from './budgetService';
import { SavingsService } from './savingsService';
import { NotificationService } from './notificationService';
import { ActivityLogService } from './activityLogService';
import { SettingsService } from './settingsService';
import { INITIAL_DEMO_INCOMES, INITIAL_DEMO_EXPENSES, INITIAL_DEMO_BILLS, INITIAL_DEMO_PAYMENTS, INITIAL_DEMO_BUDGETS, INITIAL_DEMO_SAVINGS, INITIAL_DEMO_SAVINGS_TXNS, INITIAL_DEMO_NOTIFICATIONS } from '../constants/initialDemoData';
import { DEFAULT_CATEGORIES } from '../constants/initialCategories';
import { DEFAULT_SETTINGS } from '../constants/defaultSettings';

export class ExportImportService {
  public static exportFullData(): FullApplicationBackup {
    return {
      version: '1.0.0',
      exportDate: new Date().toISOString(),
      user: AuthService.getCurrentUser(),
      incomes: IncomeService.getAll(),
      expenses: ExpenseService.getAll(),
      categories: CategoryService.getAll(),
      bills: BillService.getAll(),
      payments: PaymentService.getAll(),
      budgets: BudgetService.getAll(),
      savingsGoals: SavingsService.getAllGoals(),
      savingsTransactions: SavingsService.getAllTransactions(),
      notifications: NotificationService.getAll(),
      activityLogs: ActivityLogService.getAll(),
      settings: SettingsService.getSettings(),
    };
  }

  public static validateBackupData(data: any): ImportValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!data || typeof data !== 'object') {
      return { isValid: false, errors: ['Invalid file content. Must be a valid JSON object.'], warnings: [] };
    }

    if (!Array.isArray(data.incomes)) {
      errors.push('Missing or invalid "incomes" array in JSON structure.');
    }
    if (!Array.isArray(data.expenses)) {
      errors.push('Missing or invalid "expenses" array in JSON structure.');
    }
    if (!Array.isArray(data.bills)) {
      errors.push('Missing or invalid "bills" array in JSON structure.');
    }
    if (!Array.isArray(data.budgets)) {
      errors.push('Missing or invalid "budgets" array in JSON structure.');
    }
    if (!Array.isArray(data.savingsGoals)) {
      errors.push('Missing or invalid "savingsGoals" array in JSON structure.');
    }

    if (errors.length > 0) {
      return { isValid: false, errors, warnings };
    }

    return {
      isValid: true,
      errors: [],
      warnings,
      counts: {
        incomesCount: data.incomes.length,
        expensesCount: data.expenses.length,
        billsCount: data.bills.length,
        paymentsCount: Array.isArray(data.payments) ? data.payments.length : 0,
        budgetsCount: data.budgets.length,
        savingsGoalsCount: data.savingsGoals.length,
      },
    };
  }

  public static importFullData(data: FullApplicationBackup): boolean {
    try {
      const validation = this.validateBackupData(data);
      if (!validation.isValid) return false;

      StorageService.setItem('incomes_list', data.incomes);
      StorageService.setItem('expenses_list', data.expenses);
      if (data.categories) StorageService.setItem('expense_categories', data.categories);
      StorageService.setItem('bills_list', data.bills);
      if (data.payments) StorageService.setItem('bill_payments_list', data.payments);
      StorageService.setItem('budgets_list', data.budgets);
      StorageService.setItem('savings_goals_list', data.savingsGoals);
      if (data.savingsTransactions) StorageService.setItem('savings_transactions_list', data.savingsTransactions);
      if (data.notifications) StorageService.setItem('app_notifications_list', data.notifications);
      if (data.settings) StorageService.setItem('system_settings', data.settings);

      ActivityLogService.logAction('IMPORT_DATA', 'Data Management', 'Successfully imported financial database from JSON file.');
      return true;
    } catch (err) {
      console.error('Import failed:', err);
      return false;
    }
  }

  public static resetToDemoData(): void {
    StorageService.setItem('incomes_list', INITIAL_DEMO_INCOMES);
    StorageService.setItem('expenses_list', INITIAL_DEMO_EXPENSES);
    StorageService.setItem('expense_categories', DEFAULT_CATEGORIES);
    StorageService.setItem('bills_list', INITIAL_DEMO_BILLS);
    StorageService.setItem('bill_payments_list', INITIAL_DEMO_PAYMENTS);
    StorageService.setItem('budgets_list', INITIAL_DEMO_BUDGETS);
    StorageService.setItem('savings_goals_list', INITIAL_DEMO_SAVINGS);
    StorageService.setItem('savings_transactions_list', INITIAL_DEMO_SAVINGS_TXNS);
    StorageService.setItem('app_notifications_list', INITIAL_DEMO_NOTIFICATIONS);
    StorageService.setItem('system_settings', DEFAULT_SETTINGS);

    ActivityLogService.logAction('RESET_DATA', 'Data Management', 'Reset application data back to factory demo state.');
  }

  public static clearAllData(): void {
    StorageService.clearAll();
    ActivityLogService.logAction('RESET_DATA', 'Data Management', 'Cleared all local storage data.');
  }
}
