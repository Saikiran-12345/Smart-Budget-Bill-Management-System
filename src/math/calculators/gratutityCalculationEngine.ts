export interface GratuityCalculationResult {
  lastDrawnBasicSalary: number;
  lastDrawnDA: number;
  totalServiceYears: number;
  isCoveredUnderGratuityAct: boolean;
  calculatedGratuityAmount: number;
  taxExemptLimitINR: number; // ₹20,00,000 max exempt
  taxFreeGratuityAmount: number;
  taxableGratuityAmount: number;
}

export class GratutityCalculationEngine {
  public static calculateGratuity(
    lastDrawnBasicSalary = 80000,
    lastDrawnDA = 10000,
    totalServiceYears = 12,
    isCoveredUnderGratuityAct = true
  ): GratuityCalculationResult {
    const totalMonthlySalary = lastDrawnBasicSalary + lastDrawnDA;

    let calculatedGratuityAmount = 0;
    if (isCoveredUnderGratuityAct) {
      // (15 * Monthly Salary * Tenure) / 26
      calculatedGratuityAmount = Math.round((15 * totalMonthlySalary * totalServiceYears) / 26);
    } else {
      // (15 * Monthly Salary * Tenure) / 30
      calculatedGratuityAmount = Math.round((15 * totalMonthlySalary * totalServiceYears) / 30);
    }

    const taxExemptLimitINR = 2000000;
    const taxFreeGratuityAmount = Math.min(taxExemptLimitINR, calculatedGratuityAmount);
    const taxableGratuityAmount = Math.max(0, calculatedGratuityAmount - taxFreeGratuityAmount);

    return {
      lastDrawnBasicSalary,
      lastDrawnDA,
      totalServiceYears,
      isCoveredUnderGratuityAct,
      calculatedGratuityAmount,
      taxExemptLimitINR,
      taxFreeGratuityAmount,
      taxableGratuityAmount,
    };
  }
}
