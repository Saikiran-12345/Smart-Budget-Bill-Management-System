export interface CashFlowMonthForecastPoint {
  monthIndex: number;
  monthName: string;
  projectedIncome: number;
  projectedFixedExpenses: number;
  projectedVariableExpenses: number;
  netCashFlow: number;
  cumulativeCashBalance: number;
}

export class CashFlow12MonthForecastEngine {
  public static generate12MonthForecast(
    monthlySalary = 120000,
    monthlyFixedExpenses = 45000,
    monthlyVariableExpenses = 25000,
    startingCashBalance = 150000,
    annualBonusMonth = 12,
    bonusAmount = 60000
  ): CashFlowMonthForecastPoint[] {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let runningBalance = startingCashBalance;

    return monthNames.map((name, idx) => {
      const mIdx = idx + 1;
      let inc = monthlySalary;
      if (mIdx === annualBonusMonth) inc += bonusAmount;

      const net = inc - (monthlyFixedExpenses + monthlyVariableExpenses);
      runningBalance += net;

      return {
        monthIndex: mIdx,
        monthName: name,
        projectedIncome: Math.round(inc),
        projectedFixedExpenses: Math.round(monthlyFixedExpenses),
        projectedVariableExpenses: Math.round(monthlyVariableExpenses),
        netCashFlow: Math.round(net),
        cumulativeCashBalance: Math.round(runningBalance),
      };
    });
  }
}
