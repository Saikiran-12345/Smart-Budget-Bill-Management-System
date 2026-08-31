export type TransactionType = 'INCOME' | 'EXPENSE' | 'BILL_PAYMENT' | 'SAVINGS_DEPOSIT' | 'SAVINGS_WITHDRAWAL';

export interface UnifiedTransaction {
  id: string;
  sourceId: string;
  type: TransactionType;
  title: string;
  amount: number;
  date: string;
  category: string;
  paymentMethod?: string;
  status: string;
  description: string;
  merchantOrBiller?: string;
  referenceNumber?: string;
  createdAt: string;
}

export interface TransactionFilterOptions {
  searchQuery?: string;
  type?: TransactionType | 'ALL';
  category?: string;
  startDate?: string;
  endDate?: string;
  minAmount?: number;
  maxAmount?: number;
  sortBy?: 'date' | 'amount' | 'title' | 'type';
  sortOrder?: 'asc' | 'desc';
}
