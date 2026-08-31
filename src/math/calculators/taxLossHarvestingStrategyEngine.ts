export interface CapitalHoldingLossDetail {
  holdingId: string;
  holdingName: string;
  assetType: 'STOCKS' | 'MUTUAL_FUNDS';
  purchasePrice: number;
  currentPrice: number;
  quantity: number;
  unrealizedLoss: number;
  holdingDays: number;
  isLongTerm: boolean; // >365 days
}

export class TaxLossHarvestingStrategyEngine {
  public static evaluateHarvestingStrategy(
    holdings: CapitalHoldingLossDetail[],
    realizedShortTermGains: number,
    realizedLongTermGains: number
  ): {
    totalRealizedGains: number;
    harvestableLosses: number;
    potentialTaxSavingsAmount: number;
    recommendedHarvestHoldings: CapitalHoldingLossDetail[];
  } {
    const totalRealizedGains = realizedShortTermGains + realizedLongTermGains;
    const recommendedHarvestHoldings = holdings.filter((h) => h.unrealizedLoss < 0);

    const harvestableLosses = recommendedHarvestHoldings.reduce((s, h) => s + Math.abs(h.unrealizedLoss), 0);

    // Tax rates: STCG = 20%, LTCG = 12.5% above ₹1.25L
    const stcgTaxBefore = realizedShortTermGains * 0.20;
    const ltcgTaxBefore = Math.max(0, realizedLongTermGains - 125000) * 0.125;
    const totalTaxBefore = stcgTaxBefore + ltcgTaxBefore;

    const netSTCG = Math.max(0, realizedShortTermGains - harvestableLosses);
    const totalTaxAfter = netSTCG * 0.20 + ltcgTaxBefore;

    const potentialTaxSavingsAmount = Math.max(0, Math.round(totalTaxBefore - totalTaxAfter));

    return {
      totalRealizedGains: Math.round(totalRealizedGains),
      harvestableLosses: Math.round(harvestableLosses),
      potentialTaxSavingsAmount,
      recommendedHarvestHoldings,
    };
  }
}
