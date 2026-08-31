export type BudgetPeriod = 'MONTHLY' | 'QUARTERLY' | 'YEARLY';

export type AlertLevel = 'NORMAL' | 'WARNING_50' | 'WARNING_75' | 'CRITICAL_90' | 'EXCEEDED_100';

export interface BudgetItem {
  id: string;
  budgetName: string;
  category: string;
  allocatedAmount: number;
  spentAmount: number;
  period: BudgetPeriod;
  month: number; // 1-12
  year: number;
  startDate: string;
  endDate: string;
  rolloverUnused: boolean;
  alertThresholdPercent: number; // e.g. 80%
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BudgetStatusSummary {
  budgetId: string;
  budgetName: string;
  category: string;
  allocated: number;
  spent: number;
  remaining: number;
  percentageUsed: number;
  alertLevel: AlertLevel;
  isOverBudget: boolean;
}

export interface OverallBudgetSummary {
  totalBudgeted: number;
  totalSpent: number;
  totalRemaining: number;
  overallPercentageUsed: number;
  activeBudgetsCount: number;
  overBudgetCount: number;
  nearLimitCount: number;
}
