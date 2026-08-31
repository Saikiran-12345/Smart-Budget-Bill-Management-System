export interface LossHarvestingOpportunityItem {
  holdingId: string;
  symbol: string;
  assetCategory: 'STOCKS' | 'MUTUAL_FUNDS';
  purchasePrice: number;
  currentMarketPrice: number;
  quantity: number;
  unrealizedCapitalLoss: number;
  holdingDays: number;
  isShortTerm: boolean;
}

export class TaxLossHarvestingCalculatorEngine {
  public static calculateHarvestPotential(
    opportunities: LossHarvestingOpportunityItem[],
    realizedSTCGGains = 80000,
    realizedLTCGGains = 140000
  ): {
    totalRealizedGains: number;
    totalHarvestableLosses: number;
    taxSavedAmount: number;
    recommendedHarvestList: LossHarvestingOpportunityItem[];
  } {
    const recommendedHarvestList = opportunities.filter((o) => o.unrealizedCapitalLoss < 0);
    const totalHarvestableLosses = recommendedHarvestList.reduce((s, o) => s + Math.abs(o.unrealizedCapitalLoss), 0);

    const stcgTaxBefore = realizedSTCGGains * 0.20;
    const ltcgTaxBefore = Math.max(0, realizedLTCGGains - 125000) * 0.125;
    const totalTaxBefore = stcgTaxBefore + ltcgTaxBefore;

    const netSTCG = Math.max(0, realizedSTCGGains - totalHarvestableLosses);
    const totalTaxAfter = netSTCG * 0.20 + ltcgTaxBefore;

    const taxSavedAmount = Math.max(0, Math.round(totalTaxBefore - totalTaxAfter));

    return {
      totalRealizedGains: realizedSTCGGains + realizedLTCGGains,
      totalHarvestableLosses: Math.round(totalHarvestableLosses),
      taxSavedAmount,
      recommendedHarvestList,
    };
  }
}
