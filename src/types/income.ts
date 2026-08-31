export type IncomeCategoryType = 'Salary' | 'Freelance' | 'Business' | 'Bonus' | 'Investment' | 'Gift' | 'Refund' | 'Other';

export type IncomeFrequency = 'ONE_TIME' | 'WEEKLY' | 'BI_WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'YEARLY';

export type IncomeStatus = 'RECEIVED' | 'PENDING' | 'SCHEDULED' | 'CANCELLED';

export interface IncomeItem {
  id: string;
  source: string;
  amount: number;
  date: string;
  category: IncomeCategoryType;
  description: string;
  frequency: IncomeFrequency;
  status: IncomeStatus;
  isRecurring: boolean;
  taxDeductible?: boolean;
  referenceNumber?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface IncomeFilterOptions {
  searchQuery?: string;
  category?: IncomeCategoryType | 'ALL';
  frequency?: IncomeFrequency | 'ALL';
  status?: IncomeStatus | 'ALL';
  startDate?: string;
  endDate?: string;
  minAmount?: number;
  maxAmount?: number;
  sortBy?: 'date' | 'amount' | 'source' | 'category';
  sortOrder?: 'asc' | 'desc';
}

export interface IncomeCategorySummary {
  category: IncomeCategoryType;
  totalAmount: number;
  count: number;
  percentage: number;
  averageAmount: number;
}

export interface IncomeMonthlySummary {
  year: number;
  month: number;
  monthName: string;
  totalAmount: number;
  count: number;
  categories: Record<IncomeCategoryType, number>;
}
