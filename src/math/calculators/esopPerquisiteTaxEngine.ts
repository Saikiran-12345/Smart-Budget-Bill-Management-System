export interface ESOPPerquisiteDetail {
  vestedSharesCount: number;
  grantPrice: number;
  fairMarketValueFMV: number;
  exitPrice: number;
  perquisiteTaxableValue: number;
  perquisiteTaxPaid30Percent: number;
  capitalGainTaxPaidRatePercent: number;
  totalTaxPaid: number;
  netInHandProfit: number;
}

export class ESOPPerquisiteTaxEngine {
  public static calculateESOP(
    vestedSharesCount = 2000,
    grantPrice = 100,
    fairMarketValueFMV = 400,
    exitPrice = 750
  ): ESOPPerquisiteDetail {
    const exerciseCost = vestedSharesCount * grantPrice;
    const fmvValue = vestedSharesCount * fairMarketValueFMV;
    const saleProceeds = vestedSharesCount * exitPrice;

    const perquisiteTaxableValue = Math.max(0, fmvValue - exerciseCost);
    const perquisiteTaxPaid30Percent = Math.round(perquisiteTaxableValue * 0.30);

    const capitalGainAtExit = Math.max(0, saleProceeds - fmvValue);
    const capitalGainTaxPaidRatePercent = Math.round(capitalGainAtExit * 0.125);

    const totalTaxPaid = perquisiteTaxPaid30Percent + capitalGainTaxPaidRatePercent;
    const netInHandProfit = Math.round(saleProceeds - exerciseCost - totalTaxPaid);

    return {
      vestedSharesCount,
      grantPrice,
      fairMarketValueFMV,
      exitPrice,
      perquisiteTaxableValue: Math.round(perquisiteTaxableValue),
      perquisiteTaxPaid30Percent,
      capitalGainTaxPaidRatePercent,
      totalTaxPaid,
      netInHandProfit,
    };
  }
}
