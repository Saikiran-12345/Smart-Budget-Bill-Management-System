import { GratutityCalculationEngine, GratuityCalculationResult } from '../math/calculators/gratutityCalculationEngine';

export class GratuityService {
  public static getGratuityCalculation(
    lastDrawnBasicSalary = 80000,
    lastDrawnDA = 10000,
    totalServiceYears = 12,
    isCoveredUnderGratuityAct = true
  ): GratuityCalculationResult {
    return GratutityCalculationEngine.calculateGratuity(
      lastDrawnBasicSalary,
      lastDrawnDA,
      totalServiceYears,
      isCoveredUnderGratuityAct
    );
  }
}
