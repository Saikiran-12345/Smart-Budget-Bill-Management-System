export interface CapitalGainsTaxSummary {
  assetClass: 'EQUITY_OR_EQUITY_MF' | 'DEBT_MUTUAL_FUND' | 'REAL_ESTATE_PROPERTY' | 'PHYSICAL_GOLD_OR_SGB';
  holdingPeriodDays: number;
  isLongTerm: boolean;
  purchaseCostINR: number;
  saleProceedsINR: number;
  grossCapitalGainINR: number;
  ltcgExemptionLimitINR: number; // ₹1,25,000 for equity (Finance Act 2024)
  taxableGainINR: number;
  applicableTaxRatePercent: number; // 20% STCG, 12.5% LTCG for equity
  estimatedTaxPayableINR: number;
}

export class CapitalGainsSTCG_LTCG_Engine {
  public static calculateCapitalGains(
    assetClass: 'EQUITY_OR_EQUITY_MF' | 'DEBT_MUTUAL_FUND' | 'REAL_ESTATE_PROPERTY' | 'PHYSICAL_GOLD_OR_SGB',
    purchaseCostINR = 200000,
    saleProceedsINR = 450000,
    holdingPeriodDays = 400
  ): CapitalGainsTaxSummary {
    let isLongTerm = false;
    let applicableTaxRatePercent = 0;
    let ltcgExemptionLimitINR = 0;

    if (assetClass === 'EQUITY_OR_EQUITY_MF') {
      isLongTerm = holdingPeriodDays >= 365;
      if (isLongTerm) {
        applicableTaxRatePercent = 12.5; // Post July 2024 budget rate
        ltcgExemptionLimitINR = 125000;
      } else {
        applicableTaxRatePercent = 20.0;
      }
    } else if (assetClass === 'REAL_ESTATE_PROPERTY') {
      isLongTerm = holdingPeriodDays >= 730; // 24 months
      applicableTaxRatePercent = isLongTerm ? 12.5 : 30.0;
    } else {
      isLongTerm = holdingPeriodDays >= 1095; // 36 months
      applicableTaxRatePercent = isLongTerm ? 12.5 : 30.0;
    }

    const grossCapitalGainINR = Math.max(0, saleProceedsINR - purchaseCostINR);
    const taxableGainINR = Math.max(0, grossCapitalGainINR - ltcgExemptionLimitINR);
    const estimatedTaxPayableINR = Math.round((taxableGainINR * applicableTaxRatePercent) / 100);

    return {
      assetClass,
      holdingPeriodDays,
      isLongTerm,
      purchaseCostINR,
      saleProceedsINR,
      grossCapitalGainINR,
      ltcgExemptionLimitINR,
      taxableGainINR,
      applicableTaxRatePercent,
      estimatedTaxPayableINR,
    };
  }
}
