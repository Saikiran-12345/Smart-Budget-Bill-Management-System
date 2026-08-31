export interface StressTestScenarioResult {
  scenarioName: string;
  monthlyIncomeInScenario: number;
  monthlyOutflowInScenario: number;
  netCashFlowInScenario: number;
  monthsOfRunwayRemaining: number;
  isSolvent: boolean;
}

export class CashFlowStressTestEngine {
  public static runStressTests(
    currentMonthlyIncome: number,
    currentFixedOutflow: number,
    currentVariableOutflow: number,
    liquidSavingsBalance: number
  ): {
    baselineRunwayMonths: number;
    scenarios: StressTestScenarioResult[];
  } {
    const totalOutflow = currentFixedOutflow + currentVariableOutflow;
    const baselineRunwayMonths = totalOutflow > 0 ? liquidSavingsBalance / totalOutflow : 99;

    const scenarios: StressTestScenarioResult[] = [
      {
        scenarioName: '50% Income Salary Cut',
        monthlyIncomeInScenario: Math.round(currentMonthlyIncome * 0.5),
        monthlyOutflowInScenario: Math.round(currentFixedOutflow + currentVariableOutflow * 0.7),
        netCashFlowInScenario: Math.round(currentMonthlyIncome * 0.5 - (currentFixedOutflow + currentVariableOutflow * 0.7)),
        monthsOfRunwayRemaining: parseFloat((liquidSavingsBalance / Math.max(1, currentFixedOutflow + currentVariableOutflow * 0.7 - currentMonthlyIncome * 0.5)).toFixed(1)),
        isSolvent: currentMonthlyIncome * 0.5 >= (currentFixedOutflow + currentVariableOutflow * 0.7),
      },
      {
        scenarioName: '100% Job Loss (Emergency Buffer Mode)',
        monthlyIncomeInScenario: 0,
        monthlyOutflowInScenario: Math.round(currentFixedOutflow),
        netCashFlowInScenario: -Math.round(currentFixedOutflow),
        monthsOfRunwayRemaining: parseFloat((liquidSavingsBalance / Math.max(1, currentFixedOutflow)).toFixed(1)),
        isSolvent: liquidSavingsBalance / Math.max(1, currentFixedOutflow) >= 6,
      },
      {
        scenarioName: 'Emergency Medical Event (₹1.5 Lakh Out-of-Pocket)',
        monthlyIncomeInScenario: currentMonthlyIncome,
        monthlyOutflowInScenario: Math.round(totalOutflow),
        netCashFlowInScenario: Math.round(currentMonthlyIncome - totalOutflow),
        monthsOfRunwayRemaining: parseFloat((Math.max(0, liquidSavingsBalance - 150000) / Math.max(1, totalOutflow)).toFixed(1)),
        isSolvent: Math.max(0, liquidSavingsBalance - 150000) / Math.max(1, totalOutflow) >= 3,
      },
    ];

    return {
      baselineRunwayMonths: parseFloat(baselineRunwayMonths.toFixed(1)),
      scenarios,
    };
  }
}
