import { IncomeItem } from '../types/income';
import { ExpenseItem } from '../types/expense';
import { BillPayment } from '../types/payment';
import { calculateTotalIncome, filterIncomesByDateRange } from './incomeMath';
import { calculateTotalExpenses, filterExpensesByDateRange } from './expenseMath';

export interface CashflowPeriodData {
  periodLabel: string;
  startDate: string;
  endDate: string;
  grossIncome: number;
  grossExpenses: number;
  netCashflow: number;
  savingsRatePercentage: number;
  operatingMarginPercentage: number;
}

export interface CashflowAnalysisResult {
  currentPeriod: CashflowPeriodData;
  previousPeriod: CashflowPeriodData;
  growthPercentage: {
    incomeGrowth: number;
    expenseGrowth: number;
    cashflowGrowth: number;
  };
  liquidityRatio: number;
  debtServiceCoverageRatio: number;
  financialRunwayMonths: number;
}

export class CashflowEngine {
  public static analyzeCashflow(
    currentIncomes: IncomeItem[],
    currentExpenses: ExpenseItem[],
    previousIncomes: IncomeItem[],
    previousExpenses: ExpenseItem[],
    currentPayments: BillPayment[],
    totalSavingsBalance: number
  ): CashflowAnalysisResult {
    const currentIncomeSum = calculateTotalIncome(currentIncomes);
    const currentExpenseSum = calculateTotalExpenses(currentExpenses);
    const currentNet = currentIncomeSum - currentExpenseSum;
    const currentSavingsRate = currentIncomeSum > 0 ? (Math.max(0, currentNet) / currentIncomeSum) * 100 : 0;
    const currentMargin = currentIncomeSum > 0 ? (currentNet / currentIncomeSum) * 100 : 0;

    const previousIncomeSum = calculateTotalIncome(previousIncomes);
    const previousExpenseSum = calculateTotalExpenses(previousExpenses);
    const previousNet = previousIncomeSum - previousExpenseSum;
    const previousSavingsRate = previousIncomeSum > 0 ? (Math.max(0, previousNet) / previousIncomeSum) * 100 : 0;
    const previousMargin = previousIncomeSum > 0 ? (previousNet / previousIncomeSum) * 100 : 0;

    const incomeGrowth = previousIncomeSum > 0 ? ((currentIncomeSum - previousIncomeSum) / previousIncomeSum) * 100 : 0;
    const expenseGrowth = previousExpenseSum > 0 ? ((currentExpenseSum - previousExpenseSum) / previousExpenseSum) * 100 : 0;
    const cashflowGrowth = previousNet !== 0 ? ((currentNet - previousNet) / Math.abs(previousNet)) * 100 : 0;

    const liquidityRatio = currentExpenseSum > 0 ? totalSavingsBalance / currentExpenseSum : 0;

    const totalDebtPayments = currentPayments.reduce((sum, p) => sum + p.amountPaid, 0);
    const debtServiceCoverageRatio = totalDebtPayments > 0 ? currentIncomeSum / totalDebtPayments : 10;

    const avgMonthlyBurn = currentExpenseSum > 0 ? currentExpenseSum : 1;
    const financialRunwayMonths = parseFloat((totalSavingsBalance / avgMonthlyBurn).toFixed(1));

    return {
      currentPeriod: {
        periodLabel: 'Current Month',
        startDate: '',
        endDate: '',
        grossIncome: currentIncomeSum,
        grossExpenses: currentExpenseSum,
        netCashflow: currentNet,
        savingsRatePercentage: parseFloat(currentSavingsRate.toFixed(1)),
        operatingMarginPercentage: parseFloat(currentMargin.toFixed(1)),
      },
      previousPeriod: {
        periodLabel: 'Previous Month',
        startDate: '',
        endDate: '',
        grossIncome: previousIncomeSum,
        grossExpenses: previousExpenseSum,
        netCashflow: previousNet,
        savingsRatePercentage: parseFloat(previousSavingsRate.toFixed(1)),
        operatingMarginPercentage: parseFloat(previousMargin.toFixed(1)),
      },
      growthPercentage: {
        incomeGrowth: parseFloat(incomeGrowth.toFixed(1)),
        expenseGrowth: parseFloat(expenseGrowth.toFixed(1)),
        cashflowGrowth: parseFloat(cashflowGrowth.toFixed(1)),
      },
      liquidityRatio: parseFloat(liquidityRatio.toFixed(2)),
      debtServiceCoverageRatio: parseFloat(debtServiceCoverageRatio.toFixed(2)),
      financialRunwayMonths,
    };
  }

  public static generate12MonthCashflowForecast(
    baseMonthlyIncome: number,
    baseMonthlyExpense: number,
    expectedIncomeGrowthRate = 0.05, // 5% annual
    expectedExpenseInflationRate = 0.04 // 4% annual
  ): { monthIndex: number; monthName: string; projectedIncome: number; projectedExpense: number; projectedNet: number }[] {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyIncomeMultiplier = 1 + expectedIncomeGrowthRate / 12;
    const monthlyExpenseMultiplier = 1 + expectedExpenseInflationRate / 12;

    let currentInc = baseMonthlyIncome;
    let currentExp = baseMonthlyExpense;

    return months.map((monthName, idx) => {
      currentInc *= monthlyIncomeMultiplier;
      currentExp *= monthlyExpenseMultiplier;
      const projectedNet = currentInc - currentExp;

      return {
        monthIndex: idx + 1,
        monthName,
        projectedIncome: Math.round(currentInc),
        projectedExpense: Math.round(currentExp),
        projectedNet: Math.round(projectedNet),
      };
    });
  }
}
