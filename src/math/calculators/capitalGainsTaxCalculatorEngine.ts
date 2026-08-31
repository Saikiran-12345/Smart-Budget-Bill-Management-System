export interface CapitalGainTaxDetail {
  assetCategory: 'EQUITY_STOCKS' | 'REAL_ESTATE' | 'GOLD_JEWELLERY' | 'DEBT_FUNDS';
  purchasePrice: number;
  salePrice: number;
  holdingPeriodMonths: number;
  grossCapitalGain: number;
  isLongTerm: boolean;
  taxableCapitalGain: number;
  applicableTaxRatePercent: number;
  estimatedTaxPayable: number;
}

export class CapitalGainsTaxCalculatorEngine {
  public static calculateCapitalGains(
    assetCategory: 'EQUITY_STOCKS' | 'REAL_ESTATE' | 'GOLD_JEWELLERY' | 'DEBT_FUNDS',
    purchasePrice: number,
    salePrice: number,
    holdingPeriodMonths: number
  ): CapitalGainTaxDetail {
    const grossCapitalGain = Math.max(0, salePrice - purchasePrice);

    let isLongTerm = false;
    let applicableTaxRatePercent = 20;

    if (assetCategory === 'EQUITY_STOCKS') {
      isLongTerm = holdingPeriodMonths > 12;
      applicableTaxRatePercent = isLongTerm ? 12.5 : 20.0;
    } else if (assetCategory === 'REAL_ESTATE' || assetCategory === 'GOLD_JEWELLERY') {
      isLongTerm = holdingPeriodMonths > 24;
      applicableTaxRatePercent = isLongTerm ? 12.5 : 30.0;
    } else {
      isLongTerm = holdingPeriodMonths > 36;
      applicableTaxRatePercent = isLongTerm ? 12.5 : 30.0;
    }

    let taxableCapitalGain = grossCapitalGain;
    if (assetCategory === 'EQUITY_STOCKS' && isLongTerm) {
      taxableCapitalGain = Math.max(0, grossCapitalGain - 125000); // ₹1.25 Lakh exemption threshold
    }

    const estimatedTaxPayable = Math.round((taxableCapitalGain * applicableTaxRatePercent) / 100);

    return {
      assetCategory,
      purchasePrice,
      salePrice,
      holdingPeriodMonths,
      grossCapitalGain: Math.round(grossCapitalGain),
      isLongTerm,
      taxableCapitalGain: Math.round(taxableCapitalGain),
      applicableTaxRatePercent,
      estimatedTaxPayable,
    };
  }
}
