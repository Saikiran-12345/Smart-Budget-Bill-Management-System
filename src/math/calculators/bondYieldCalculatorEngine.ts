export interface BondYieldAnalysis {
  bondName: string;
  faceValue: number;
  marketPrice: number;
  annualCouponRatePercent: number;
  annualCouponPayment: number;
  annualCouponAmount: number;
  yearsToMaturity: number;
  currentYieldPercent: number;
  yieldToMaturityPercent: number;
  yieldToMaturityYTMPercent: number;
}

export class BondYieldCalculatorEngine {
  public static calculateBondYield(
    faceValue = 1000,
    annualCouponRatePercent = 7.5,
    marketPrice = 980,
    yearsToMaturity = 5,
    bondName = 'G-Sec Bond'
  ): BondYieldAnalysis {
    const annualCouponPayment = (faceValue * annualCouponRatePercent) / 100;
    const currentYieldPercent = marketPrice > 0 ? (annualCouponPayment / marketPrice) * 100 : 0;

    const num = annualCouponPayment + (faceValue - marketPrice) / yearsToMaturity;
    const den = (faceValue + marketPrice) / 2;
    const ytm = den > 0 ? (num / den) * 100 : 0;

    return {
      bondName,
      faceValue,
      marketPrice,
      annualCouponRatePercent,
      annualCouponPayment: Math.round(annualCouponPayment),
      annualCouponAmount: Math.round(annualCouponPayment),
      yearsToMaturity,
      currentYieldPercent: parseFloat(currentYieldPercent.toFixed(2)),
      yieldToMaturityPercent: parseFloat(ytm.toFixed(2)),
      yieldToMaturityYTMPercent: parseFloat(ytm.toFixed(2)),
    };
  }
}
