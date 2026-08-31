export interface MonthlyFinancialSummary {
  year: number;
  month: number;
  monthName: string;
  totalIncome: number;
  totalExpenses: number;
  totalBillsPaid: number;
  totalSavingsAdded: number;
  netSavings: number;
  savingsRate: number; // percentage
  topExpenseCategory: string;
  largestSingleExpense: number;
  cashflow: number;
}

export interface YearlyFinancialSummary {
  year: number;
  totalIncome: number;
  totalExpenses: number;
  totalBills: number;
  totalSavings: number;
  netCashflow: number;
  averageMonthlyIncome: number;
  averageMonthlyExpense: number;
  monthlyData: MonthlyFinancialSummary[];
}

export interface SpendingCategoryDistribution {
  category: string;
  amount: number;
  percentage: number;
  count: number;
  color: string;
}

export interface DailySpendingPoint {
  date: string;
  dayName: string;
  amount: number;
}

export interface FinancialHealthScore {
  score: number; // 0 to 100
  rating: 'POOR' | 'FAIR' | 'GOOD' | 'EXCELLENT';
  savingsRateScore: number;
  budgetComplianceScore: number;
  billOnTimeScore: number;
  emergencyFundMonths: number;
  recommendations: string[];
}
