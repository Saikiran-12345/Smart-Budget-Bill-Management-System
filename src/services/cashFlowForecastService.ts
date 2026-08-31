import { CashFlow12MonthForecastEngine, CashFlowMonthForecastPoint } from '../math/calculators/cashFlow12MonthForecastEngine';

export class CashFlowForecastService {
  public static get12MonthForecast(
    monthlySalary = 120000,
    monthlyFixedExpenses = 45000,
    monthlyVariableExpenses = 25000,
    startingCashBalance = 150000
  ): CashFlowMonthForecastPoint[] {
    return CashFlow12MonthForecastEngine.generate12MonthForecast(
      monthlySalary,
      monthlyFixedExpenses,
      monthlyVariableExpenses,
      startingCashBalance
    );
  }
}
