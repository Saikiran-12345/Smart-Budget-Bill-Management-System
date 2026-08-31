export type BillStatus = 'UPCOMING' | 'PENDING' | 'PAID' | 'OVERDUE' | 'CANCELLED';

export type BillFrequency = 'ONE_TIME' | 'WEEKLY' | 'BI_WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'SEMI_ANNUALLY' | 'YEARLY';

export interface BillItem {
  id: string;
  billName: string;
  billerName: string;
  category: string;
  amount: number;
  dueDate: string;
  frequency: BillFrequency;
  status: BillStatus;
  notes?: string;
  autoPay: boolean;
  accountNumber?: string;
  reminderDaysBefore: number;
  lateFeePercentage?: number;
  lastPaidDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BillFilterOptions {
  searchQuery?: string;
  category?: string;
  status?: BillStatus | 'ALL';
  frequency?: BillFrequency | 'ALL';
  startDate?: string;
  endDate?: string;
  sortBy?: 'dueDate' | 'amount' | 'billName' | 'status';
  sortOrder?: 'asc' | 'desc';
}
