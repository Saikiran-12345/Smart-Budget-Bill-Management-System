export interface REITDistributionDetail {
  reitSymbol: string;
  totalUnitsHeld: number;
  currentMarketPriceINR: number;
  totalValuationINR: number;
  annualDistributionPerUnitINR: number;
  annualDistributionIncomeINR: number;
  distributionYieldPercent: number;
  taxFreeComponentPercent: number; // Return of capital / interest dividend split
}

export class REITDistributionYieldEngine {
  public static calculateREITYield(
    reitSymbol = 'EMBASSY_REIT',
    totalUnitsHeld = 1000,
    currentMarketPriceINR = 375.40,
    annualDistributionPerUnitINR = 21.45,
    taxFreeComponentPercent = 35.0
  ): REITDistributionDetail {
    const totalValuationINR = Math.round(totalUnitsHeld * currentMarketPriceINR);
    const annualDistributionIncomeINR = Math.round(totalUnitsHeld * annualDistributionPerUnitINR);
    const distributionYieldPercent = currentMarketPriceINR > 0 ? (annualDistributionPerUnitINR / currentMarketPriceINR) * 100 : 0;

    return {
      reitSymbol,
      totalUnitsHeld,
      currentMarketPriceINR,
      totalValuationINR,
      annualDistributionPerUnitINR,
      annualDistributionIncomeINR,
      distributionYieldPercent: parseFloat(distributionYieldPercent.toFixed(2)),
      taxFreeComponentPercent,
    };
  }
}
