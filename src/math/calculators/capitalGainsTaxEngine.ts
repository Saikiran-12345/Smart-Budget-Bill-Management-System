export interface CapitalGainsTaxResult {
  assetType: 'EQUITY_STOCKS' | 'REAL_ESTATE' | 'DEBT_FUNDS' | 'GOLD';
  purchasePrice: number;
  salePrice: number;
  holdingPeriodMonths: number;
  isLongTerm: boolean;
  totalGainOrLoss: number;
  taxExemptionClaimed: number;
  taxableCapitalGain: number;
  estimatedTaxLiability: number;
  taxRatePercent: number;
}

export class CapitalGainsTaxEngine {
  public static calculateCapitalGains(
    assetType: 'EQUITY_STOCKS' | 'REAL_ESTATE' | 'DEBT_FUNDS' | 'GOLD',
    purchasePrice: number,
    salePrice: number,
    holdingPeriodMonths: number
  ): CapitalGainsTaxResult {
    const totalGainOrLoss = salePrice - purchasePrice;
    let isLongTerm = false;
    let taxRatePercent = 20;

    if (assetType === 'EQUITY_STOCKS') {
      isLongTerm = holdingPeriodMonths >= 12;
      taxRatePercent = isLongTerm ? 12.5 : 20;
    } else if (assetType === 'REAL_ESTATE' || assetType === 'GOLD') {
      isLongTerm = holdingPeriodMonths >= 24;
      taxRatePercent = isLongTerm ? 12.5 : 20;
    } else {
      isLongTerm = holdingPeriodMonths >= 36;
      taxRatePercent = 20;
    }

    let taxExemptionClaimed = 0;
    if (assetType === 'EQUITY_STOCKS' && isLongTerm) {
      taxExemptionClaimed = Math.min(125000, Math.max(0, totalGainOrLoss));
    }

    const taxableCapitalGain = Math.max(0, totalGainOrLoss - taxExemptionClaimed);
    const estimatedTaxLiability = Math.round((taxableCapitalGain * taxRatePercent) / 100);

    return {
      assetType,
      purchasePrice,
      salePrice,
      holdingPeriodMonths,
      isLongTerm,
      totalGainOrLoss: Math.round(totalGainOrLoss),
      taxExemptionClaimed: Math.round(taxExemptionClaimed),
      taxableCapitalGain: Math.round(taxableCapitalGain),
      estimatedTaxLiability,
      taxRatePercent,
    };
  }
}
