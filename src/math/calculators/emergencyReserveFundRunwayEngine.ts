export interface StressTestScenarioPoint {
  scenarioName: string;
  monthlyOutflowInScenario: number;
  runwayMonthsAvailable: number;
  stressTestStatus: 'PASS' | 'WARNING' | 'FAIL';
}

export class EmergencyReserveFundRunwayEngine {
  public static runScenarios(
    liquidReserveAmount = 300000,
    normalMonthlyExpenses = 50000
  ): {
    baselineRunwayMonths: number;
    scenarios: StressTestScenarioPoint[];
  } {
    const baselineRunwayMonths = normalMonthlyExpenses > 0 ? liquidReserveAmount / normalMonthlyExpenses : 0;

    const scenarios: StressTestScenarioPoint[] = [
      {
        scenarioName: '100% Salary Income Sudden Stop',
        monthlyOutflowInScenario: Math.round(normalMonthlyExpenses * 0.8), // 20% cut in discretionary
        runwayMonthsAvailable: parseFloat((liquidReserveAmount / (normalMonthlyExpenses * 0.8 || 1)).toFixed(1)),
        stressTestStatus: liquidReserveAmount / (normalMonthlyExpenses * 0.8 || 1) >= 6 ? 'PASS' : 'FAIL',
      },
      {
        scenarioName: 'Medical Emergency (+₹1.5 Lakh Out-of-Pocket)',
        monthlyOutflowInScenario: normalMonthlyExpenses,
        runwayMonthsAvailable: parseFloat((Math.max(0, liquidReserveAmount - 150000) / (normalMonthlyExpenses || 1)).toFixed(1)),
        stressTestStatus: Math.max(0, liquidReserveAmount - 150000) / (normalMonthlyExpenses || 1) >= 3 ? 'PASS' : 'WARNING',
      },
      {
        scenarioName: 'Inflation Surge (+15% Essential Costs)',
        monthlyOutflowInScenario: Math.round(normalMonthlyExpenses * 1.15),
        runwayMonthsAvailable: parseFloat((liquidReserveAmount / (normalMonthlyExpenses * 1.15 || 1)).toFixed(1)),
        stressTestStatus: liquidReserveAmount / (normalMonthlyExpenses * 1.15 || 1) >= 6 ? 'PASS' : 'WARNING',
      },
    ];

    return {
      baselineRunwayMonths: parseFloat(baselineRunwayMonths.toFixed(1)),
      scenarios,
    };
  }
}
