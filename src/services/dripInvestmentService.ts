import { DividendReinvestmentCalculatorEngine, DRIPYearPoint } from '../math/calculators/dividendReinvestmentCalculatorEngine';

export class DRIPInvestmentService {
  public static getDRIPSchedule(
    initialPrincipal = 200000,
    annualDividendYieldPercent = 3.5,
    annualCapitalGrowthPercent = 7.0,
    years = 15
  ): DRIPYearPoint[] {
    return DividendReinvestmentCalculatorEngine.calculateDRIPCompounding(
      initialPrincipal,
      annualDividendYieldPercent,
      annualCapitalGrowthPercent,
      years
    );
  }
}
