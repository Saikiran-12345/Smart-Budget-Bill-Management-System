export interface Section54EBondSummary {
  longTermCapitalGainINR: number;
  bondInvestmentAmountINR: number; // Capped at ₹50,000,00 per financial year
  lockinPeriodYears: number; // 5 years
  annualCouponRatePercent: number; // 5.25% p.a. payable annually
  issuingEntities: string[]; // REC, PFC, NHAI, IRFC
  taxSavedOnCapitalGains125Percent: number;
  totalAnnualCouponIncomeINR: number;
}

export class Section54ECCapitalGainsBondsEngine {
  public static calculate54EBonds(
    longTermCapitalGainINR = 4000000,
    proposedBondInvestmentINR = 4000000
  ): Section54EBondSummary {
    const cappedInvestment = Math.min(5000000, proposedBondInvestmentINR, longTermCapitalGainINR);
    const taxSavedOnCapitalGains125Percent = Math.round((cappedInvestment * 0.125));
    const totalAnnualCouponIncomeINR = Math.round((cappedInvestment * 5.25) / 100);

    return {
      longTermCapitalGainINR,
      bondInvestmentAmountINR: cappedInvestment,
      lockinPeriodYears: 5,
      annualCouponRatePercent: 5.25,
      issuingEntities: ['REC Ltd', 'PFC Ltd', 'NHAI', 'IRFC'],
      taxSavedOnCapitalGains125Percent,
      totalAnnualCouponIncomeINR,
    };
  }
}
