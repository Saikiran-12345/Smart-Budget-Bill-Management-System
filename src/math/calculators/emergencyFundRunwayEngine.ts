export interface StressTestScenario {
  scenarioName: string;
  monthlyExpensesInScenario: number;
  runwayMonthsAvailable: number;
  stressTestPassed: boolean;
}

export class EmergencyFundRunwayEngine {
  public static runStressTests(
    liquidReserveAmount: number,
    normalMonthlyExpenses: number
  ): {
    normalRunwayMonths: number;
    scenarios: StressTestScenario[];
  } {
    const normalRunwayMonths = normalMonthlyExpenses > 0 ? liquidReserveAmount / normalMonthlyExpenses : 0;

    const scenarios: StressTestScenario[] = [
      {
        scenarioName: '100% Income Sudden Loss',
        monthlyExpensesInScenario: Math.round(normalMonthlyExpenses * 0.8), // 20% cut in discretionary
        runwayMonthsAvailable: parseFloat((liquidReserveAmount / (normalMonthlyExpenses * 0.8 || 1)).toFixed(1)),
        stressTestPassed: liquidReserveAmount / (normalMonthlyExpenses * 0.8 || 1) >= 6,
      },
      {
        scenarioName: 'Medical Emergency (+₹1 Lakh Out-of-Pocket)',
        monthlyExpensesInScenario: normalMonthlyExpenses,
        runwayMonthsAvailable: parseFloat((Math.max(0, liquidReserveAmount - 100000) / (normalMonthlyExpenses || 1)).toFixed(1)),
        stressTestPassed: Math.max(0, liquidReserveAmount - 100000) / (normalMonthlyExpenses || 1) >= 3,
      },
      {
        scenarioName: 'Inflation Surge (+15% Living Costs)',
        monthlyExpensesInScenario: Math.round(normalMonthlyExpenses * 1.15),
        runwayMonthsAvailable: parseFloat((liquidReserveAmount / (normalMonthlyExpenses * 1.15 || 1)).toFixed(1)),
        stressTestPassed: liquidReserveAmount / (normalMonthlyExpenses * 1.15 || 1) >= 6,
      },
    ];

    return {
      normalRunwayMonths: parseFloat(normalRunwayMonths.toFixed(1)),
      scenarios,
    };
  }
}
