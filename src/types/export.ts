import { IncomeItem } from './income';
import { ExpenseItem } from './expense';
import { Category } from './category';
import { BillItem } from './bill';
import { BillPayment } from './payment';
import { BudgetItem } from './budget';
import { SavingsGoal, SavingsTransaction } from './savings';
import { AppNotification } from './notification';
import { ActivityLogItem } from './activity';
import { SystemSettings } from './settings';
import { UserProfile } from './user';

export interface FullApplicationBackup {
  version: string;
  exportDate: string;
  user: UserProfile | null;
  incomes: IncomeItem[];
  expenses: ExpenseItem[];
  categories: Category[];
  bills: BillItem[];
  payments: BillPayment[];
  budgets: BudgetItem[];
  savingsGoals: SavingsGoal[];
  savingsTransactions: SavingsTransaction[];
  notifications: AppNotification[];
  activityLogs: ActivityLogItem[];
  settings: SystemSettings;
}

export interface ImportValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  counts?: {
    incomesCount: number;
    expensesCount: number;
    billsCount: number;
    paymentsCount: number;
    budgetsCount: number;
    savingsGoalsCount: number;
  };
}
