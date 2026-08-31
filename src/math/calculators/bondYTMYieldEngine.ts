export interface BondYTMDetail {
  bondTitle: string;
  faceValue: number;
  marketPrice: number;
  couponRatePercent: number;
  annualCouponPayment: number;
  yearsToMaturity: number;
  currentYieldPercent: number;
  ytmPercent: number;
}

export class BondYTMYieldEngine {
  public static calculateYield(
    bondTitle = '7.18% GS 2033',
    faceValue = 1000,
    marketPrice = 985,
    couponRatePercent = 7.18,
    yearsToMaturity = 7
  ): BondYTMDetail {
    const annualCouponPayment = (faceValue * couponRatePercent) / 100;
    const currentYieldPercent = marketPrice > 0 ? (annualCouponPayment / marketPrice) * 100 : 0;

    const num = annualCouponPayment + (faceValue - marketPrice) / yearsToMaturity;
    const den = (faceValue + marketPrice) / 2;
    const ytmPercent = den > 0 ? (num / den) * 100 : 0;

    return {
      bondTitle,
      faceValue,
      marketPrice,
      couponRatePercent,
      annualCouponPayment: Math.round(annualCouponPayment),
      yearsToMaturity,
      currentYieldPercent: parseFloat(currentYieldPercent.toFixed(2)),
      ytmPercent: parseFloat(ytmPercent.toFixed(2)),
    };
  }
}
