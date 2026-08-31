export type ExpenseCategoryType =
  | 'Food'
  | 'Travel'
  | 'Shopping'
  | 'Education'
  | 'Housing'
  | 'Utilities'
  | 'Entertainment'
  | 'Healthcare'
  | 'Personal Care'
  | 'Subscriptions'
  | 'Debt Payment'
  | 'Investments'
  | 'Insurance'
  | 'Other';

export type PaymentMethod =
  | 'Cash'
  | 'Credit Card'
  | 'Debit Card'
  | 'UPI'
  | 'Net Banking'
  | 'Bank Transfer'
  | 'Wallet';

export type ExpenseStatus = 'COMPLETED' | 'PENDING' | 'DISPUTED' | 'REFUNDED';

export interface ExpenseItem {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: ExpenseCategoryType;
  paymentMethod: PaymentMethod;
  description: string;
  merchant?: string;
  location?: string;
  receiptUrl?: string;
  isRecurring?: boolean;
  status: ExpenseStatus;
  taxDeductible?: boolean;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ExpenseFilterOptions {
  searchQuery?: string;
  category?: ExpenseCategoryType | 'ALL';
  paymentMethod?: PaymentMethod | 'ALL';
  status?: ExpenseStatus | 'ALL';
  startDate?: string;
  endDate?: string;
  minAmount?: number;
  maxAmount?: number;
  merchant?: string;
  isTaxDeductible?: boolean;
  sortBy?: 'date' | 'amount' | 'title' | 'category' | 'merchant';
  sortOrder?: 'asc' | 'desc';
}

export interface ExpenseCategorySummary {
  category: ExpenseCategoryType;
  totalAmount: number;
  count: number;
  percentage: number;
  averageAmount: number;
  maxAmount: number;
}

export interface ExpenseMonthlySummary {
  year: number;
  month: number;
  monthName: string;
  totalAmount: number;
  count: number;
  categories: Record<string, number>;
}
