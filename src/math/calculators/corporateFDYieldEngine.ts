export interface CorporateFDYieldSummary {
  companyName: string;
  depositAmountINR: number;
  tenureMonths: number;
  interestRatePercent: number;
  isSeniorCitizen: boolean;
  totalInterestEarnedINR: number;
  maturityValueINR: number;
  tdsDeductionEstimateINR: number; // 10% TDS if interest > ₹5,000
}

export class CorporateFDYieldEngine {
  public static calculateCorporateFD(
    companyName = 'Bajaj Finance',
    depositAmountINR = 100000,
    tenureMonths = 36,
    baseInterestRatePercent = 8.10,
    isSeniorCitizen = false
  ): CorporateFDYieldSummary {
    const effectiveRate = isSeniorCitizen ? baseInterestRatePercent + 0.25 : baseInterestRatePercent;
    const years = tenureMonths / 12;

    const maturityValue = Math.round(depositAmountINR * Math.pow(1 + effectiveRate / 100, years));
    const totalInterestEarnedINR = Math.max(0, maturityValue - depositAmountINR);

    const tdsDeductionEstimateINR = totalInterestEarnedINR > 5000 ? Math.round(totalInterestEarnedINR * 0.10) : 0;

    return {
      companyName,
      depositAmountINR,
      tenureMonths,
      interestRatePercent: effectiveRate,
      isSeniorCitizen,
      totalInterestEarnedINR,
      maturityValueINR: maturityValue,
      tdsDeductionEstimateINR,
    };
  }
}
