export interface NPSTier2LiquidityDetail {
  initialInvestment: number;
  expectedAnnualReturnPercent: number;
  investmentPeriodYears: number;
  estimatedCorpusValue: number;
  estimatedCapitalGains: number;
  isTaxableAtSlabRate: boolean;
  estimatedTaxPayable30Percent: number;
  netInHandAmount: number;
}

export class NPSTier2LiquidityEngine {
  public static calculateTier2Return(
    initialInvestment = 200000,
    expectedAnnualReturnPercent = 10.5,
    investmentPeriodYears = 5,
    investorTaxSlabPercent = 30
  ): NPSTier2LiquidityDetail {
    const estimatedCorpusValue = Math.round(
      initialInvestment * Math.pow(1 + expectedAnnualReturnPercent / 100, investmentPeriodYears)
    );
    const estimatedCapitalGains = Math.max(0, estimatedCorpusValue - initialInvestment);
    const estimatedTaxPayable30Percent = Math.round((estimatedCapitalGains * investorTaxSlabPercent) / 100);
    const netInHandAmount = estimatedCorpusValue - estimatedTaxPayable30Percent;

    return {
      initialInvestment,
      expectedAnnualReturnPercent,
      investmentPeriodYears,
      estimatedCorpusValue,
      estimatedCapitalGains,
      isTaxableAtSlabRate: true,
      estimatedTaxPayable30Percent,
      netInHandAmount,
    };
  }
}
