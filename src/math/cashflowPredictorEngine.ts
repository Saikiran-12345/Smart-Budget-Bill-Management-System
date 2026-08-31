import { IncomeItem } from '../types/income';
import { ExpenseItem } from '../types/expense';

export interface CashflowForecastMonth {
  monthName: string;
  monthIndex: number;
  year: number;
  projectedIncome: number;
  projectedExpense: number;
  projectedNetCashflow: number;
  projectedSavingsBalance: number;
}

export class CashflowPredictorEngine {
  public static forecastCashflow(
    historicalIncomes: IncomeItem[],
    historicalExpenses: ExpenseItem[],
    currentSavingsBalance: number,
    monthsToForecast = 12
  ): CashflowForecastMonth[] {
    const avgMonthlyIncome = historicalIncomes.length > 0
      ? historicalIncomes.reduce((s, i) => s + i.amount, 0) / 3
      : 100000;

    const avgMonthlyExpense = historicalExpenses.length > 0
      ? historicalExpenses.reduce((s, e) => s + e.amount, 0) / 3
      : 60000;

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const now = new Date();
    let currentMonthIdx = now.getMonth();
    let currentYear = now.getFullYear();
    let runningBalance = currentSavingsBalance;

    const forecast: CashflowForecastMonth[] = [];

    for (let m = 0; m < monthsToForecast; m++) {
      currentMonthIdx = (currentMonthIdx + 1) % 12;
      if (currentMonthIdx === 0) currentYear++;

      // Seasonal adjustment (e.g. higher expenses in Nov/Dec holidays)
      let seasonalExpenseFactor = 1.0;
      if (currentMonthIdx === 10 || currentMonthIdx === 11) seasonalExpenseFactor = 1.25; // Nov/Dec
      else if (currentMonthIdx === 7) seasonalExpenseFactor = 1.15; // Aug festive

      const projectedInc = Math.round(avgMonthlyIncome);
      const projectedExp = Math.round(avgMonthlyExpense * seasonalExpenseFactor);
      const projectedNet = projectedInc - projectedExp;

      runningBalance += projectedNet;

      forecast.push({
        monthName: monthNames[currentMonthIdx],
        monthIndex: currentMonthIdx + 1,
        year: currentYear,
        projectedIncome: projectedInc,
        projectedExpense: projectedExp,
        projectedNetCashflow: projectedNet,
        projectedSavingsBalance: Math.round(runningBalance),
      });
    }

    return forecast;
  }
}
