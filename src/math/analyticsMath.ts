import { IncomeItem } from '../types/income';
import { ExpenseItem } from '../types/expense';
import { BillPayment } from '../types/payment';
import { SavingsTransaction } from '../types/savings';
import { MonthlyFinancialSummary, SpendingCategoryDistribution } from '../types/analytics';
import { calculateTotalIncome, filterIncomesByDateRange } from './incomeMath';
import { calculateTotalExpenses, filterExpensesByDateRange, calculateExpenseCategorySummaries } from './expenseMath';
import { calculateTotalPaymentsMade } from './billMath';
import { getMonthName, getMonthRange } from './dateUtils';

export const calculateMonthlyFinancialSummary = (
  year: number,
  month: number,
  incomes: IncomeItem[],
  expenses: ExpenseItem[],
  payments: BillPayment[],
  savingsTxns: SavingsTransaction[]
): MonthlyFinancialSummary => {
  const { startDate, endDate } = getMonthRange(year, month);

  const monthIncomes = filterIncomesByDateRange(incomes, startDate, endDate);
  const monthExpenses = filterExpensesByDateRange(expenses, startDate, endDate);

  const totalIncome = calculateTotalIncome(monthIncomes);
  const totalExpenses = calculateTotalExpenses(monthExpenses);

  const monthPayments = payments.filter((p) => p.paymentDate >= startDate && p.paymentDate <= endDate);
  const totalBillsPaid = calculateTotalPaymentsMade(monthPayments);

  const monthSavings = savingsTxns.filter((s) => s.date >= startDate && s.date <= endDate && s.type === 'DEPOSIT');
  const totalSavingsAdded = monthSavings.reduce((acc, s) => acc + s.amount, 0);

  const cashflow = totalIncome - totalExpenses;
  const netSavings = Math.max(0, cashflow);
  const savingsRate = totalIncome > 0 ? (totalSavingsAdded / totalIncome) * 100 : 0;

  const categorySummaries = calculateExpenseCategorySummaries(monthExpenses);
  const topExpenseCategory = categorySummaries.length > 0 ? categorySummaries[0].category : 'None';

  const largestSingleExpense = monthExpenses.reduce((max, e) => (e.amount > max ? e.amount : max), 0);

  return {
    year,
    month,
    monthName: getMonthName(month - 1),
    totalIncome,
    totalExpenses,
    totalBillsPaid,
    totalSavingsAdded,
    netSavings,
    savingsRate,
    topExpenseCategory,
    largestSingleExpense,
    cashflow,
  };
};

export const calculateSpendingCategoryDistributionForChart = (
  expenses: ExpenseItem[]
): SpendingCategoryDistribution[] => {
  const summaries = calculateExpenseCategorySummaries(expenses);
  const categoryColors: Record<string, string> = {
    Housing: '#3b82f6',
    Food: '#ef4444',
    Utilities: '#f59e0b',
    Travel: '#10b981',
    Shopping: '#8b5cf6',
    Healthcare: '#ec4899',
    Entertainment: '#06b6d4',
    Education: '#6366f1',
    Subscriptions: '#64748b',
    Other: '#94a3b8',
  };

  return summaries.map((s) => ({
    category: s.category,
    amount: s.totalAmount,
    percentage: parseFloat(s.percentage.toFixed(1)),
    count: s.count,
    color: categoryColors[s.category] || '#3b82f6',
  }));
};
