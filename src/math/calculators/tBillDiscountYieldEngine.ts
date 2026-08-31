export interface TBillYieldDetail {
  tBillCode: string;
  tenureDays: number;
  discountPriceINR: number;
  faceValueINR: number;
  annualizedDiscountYieldPercent: number;
  totalAbsoluteGainINR: number;
}

export class TBillDiscountYieldEngine {
  public static calculateTBillYield(
    tBillCode = '91D_TBILL',
    discountPriceINR = 98.32,
    faceValueINR = 100.00,
    tenureDays = 91
  ): TBillYieldDetail {
    const totalAbsoluteGainINR = Math.max(0, faceValueINR - discountPriceINR);
    const discountYield = discountPriceINR > 0 ? ((totalAbsoluteGainINR / discountPriceINR) * (365 / tenureDays)) * 100 : 0;

    return {
      tBillCode,
      tenureDays,
      discountPriceINR,
      faceValueINR,
      annualizedDiscountYieldPercent: parseFloat(discountYield.toFixed(2)),
      totalAbsoluteGainINR: parseFloat(totalAbsoluteGainINR.toFixed(2)),
    };
  }
}
