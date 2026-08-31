export interface SCSSSummary {
  depositAmount: number; // Max ₹30,000,00
  annualInterestRatePercent: number; // 8.2% p.a.
  quarterlyPayoutINR: number;
  totalAnnualPayoutINR: number;
  fiveYearTotalInterestINR: number;
  section80CEligible: boolean;
  tdsThresholdINR: number; // ₹50,000
}

export class SeniorCitizenSavingsSchemeEngine {
  public static calculateSCSS(
    depositAmount = 1500000,
    annualInterestRatePercent = 8.2
  ): SCSSSummary {
    const cappedDeposit = Math.min(3000000, depositAmount);
    const totalAnnualPayoutINR = Math.round((cappedDeposit * annualInterestRatePercent) / 100);
    const quarterlyPayoutINR = Math.round(totalAnnualPayoutINR / 4);
    const fiveYearTotalInterestINR = totalAnnualPayoutINR * 5;

    return {
      depositAmount: cappedDeposit,
      annualInterestRatePercent,
      quarterlyPayoutINR,
      totalAnnualPayoutINR,
      fiveYearTotalInterestINR,
      section80CEligible: true,
      tdsThresholdINR: 50000,
    };
  }
}
