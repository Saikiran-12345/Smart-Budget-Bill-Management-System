import { IncomeItem } from '../types/income';
import { ExpenseItem } from '../types/expense';
import { BillItem } from '../types/bill';
import { SavingsGoal } from '../types/savings';
import { FinancialHealthScore } from '../types/analytics';
import { calculateTotalIncome } from './incomeMath';
import { calculateTotalExpenses } from './expenseMath';
import { calculateBillPaymentCompletionRate } from './billMath';
import { calculateTotalSavingsAccumulated } from './savingsMath';

export const calculateFinancialHealthScore = (
  incomes: IncomeItem[],
  expenses: ExpenseItem[],
  bills: BillItem[],
  savingsGoals: SavingsGoal[]
): FinancialHealthScore => {
  const totalIncome = calculateTotalIncome(incomes);
  const totalExpenses = calculateTotalExpenses(expenses);
  const totalSavings = calculateTotalSavingsAccumulated(savingsGoals);
  const billMetrics = calculateBillPaymentCompletionRate(bills);

  // 1. Savings Rate Score (0 - 30 pts)
  const savingsAmount = Math.max(0, totalIncome - totalExpenses);
  const savingsRate = totalIncome > 0 ? (savingsAmount / totalIncome) * 100 : 0;
  let savingsRateScore = Math.min(30, Math.round((savingsRate / 20) * 30));

  // 2. Budget & Expense Ratio Score (0 - 30 pts)
  const expenseRatio = totalIncome > 0 ? (totalExpenses / totalIncome) * 100 : 100;
  let budgetComplianceScore = 30;
  if (expenseRatio > 90) budgetComplianceScore = 5;
  else if (expenseRatio > 80) budgetComplianceScore = 15;
  else if (expenseRatio > 70) budgetComplianceScore = 22;
  else if (expenseRatio > 50) budgetComplianceScore = 28;

  // 3. Bill Payment On-Time Score (0 - 25 pts)
  let billOnTimeScore = Math.round((billMetrics.completionPercentage / 100) * 25);
  if (billMetrics.overdueCount > 0) {
    billOnTimeScore = Math.max(0, billOnTimeScore - billMetrics.overdueCount * 5);
  }

  // 4. Emergency Fund Runway Months (0 - 15 pts)
  const avgMonthlyExpense = totalExpenses > 0 ? totalExpenses : 1;
  const emergencyFundMonths = parseFloat((totalSavings / avgMonthlyExpense).toFixed(1));
  let emergencyFundScore = Math.min(15, Math.round((emergencyFundMonths / 6) * 15));

  const totalScore = Math.min(100, Math.max(0, savingsRateScore + budgetComplianceScore + billOnTimeScore + emergencyFundScore));

  let rating: 'POOR' | 'FAIR' | 'GOOD' | 'EXCELLENT' = 'FAIR';
  if (totalScore >= 80) rating = 'EXCELLENT';
  else if (totalScore >= 65) rating = 'GOOD';
  else if (totalScore >= 45) rating = 'FAIR';
  else rating = 'POOR';

  const recommendations: string[] = [];
  if (savingsRate < 20) {
    recommendations.push('Aim to save at least 20% of your total monthly income.');
  }
  if (billMetrics.overdueCount > 0) {
    recommendations.push(`Clear your ${billMetrics.overdueCount} overdue bill(s) immediately to protect your credit health.`);
  }
  if (emergencyFundMonths < 3) {
    recommendations.push(`Build an emergency cushion covering at least 3 to 6 months of living costs (current: ${emergencyFundMonths} months).`);
  }
  if (expenseRatio > 80) {
    recommendations.push('Your expenses exceed 80% of income. Review high category spending to free up cashflow.');
  }
  if (recommendations.length === 0) {
    recommendations.push('Outstanding financial discipline! Keep building wealth and reviewing your investments quarterly.');
  }

  return {
    score: totalScore,
    rating,
    savingsRateScore,
    budgetComplianceScore,
    billOnTimeScore,
    emergencyFundMonths,
    recommendations,
  };
};
