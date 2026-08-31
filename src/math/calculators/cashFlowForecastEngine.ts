export interface MonthlyCashFlowPoint {
  monthIndex: number;
  monthName: string;
  projectedIncome: number;
  projectedExpenses: number;
  netCashFlow: number;
  cumulativeCashBalance: number;
}

export class CashFlowForecastEngine {
  public static generate12MonthForecast(
    monthlySalary: number,
    monthlyFixedExpenses: number,
    monthlyVariableExpenses: number,
    startingCashBalance: number,
    bonusMonthIndex = 12, // December bonus
    bonusAmount = monthlySalary * 0.5
  ): MonthlyCashFlowPoint[] {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let runningBalance = startingCashBalance;

    return monthNames.map((name, idx) => {
      const mIdx = idx + 1;
      let inc = monthlySalary;
      if (mIdx === bonusMonthIndex) inc += bonusAmount;

      const exp = monthlyFixedExpenses + monthlyVariableExpenses;
      const net = inc - exp;
      runningBalance += net;

      return {
        monthIndex: mIdx,
        monthName: name,
        projectedIncome: Math.round(inc),
        projectedExpenses: Math.round(exp),
        netCashFlow: Math.round(net),
        cumulativeCashBalance: Math.round(runningBalance),
      };
    });
  }
}
