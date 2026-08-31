export interface CapitalLossHarvestOpportunity {
  holdingId: string;
  holdingSymbol: string;
  assetClass: 'STOCKS' | 'EQUITY_MUTUAL_FUNDS';
  buyPrice: number;
  currentPrice: number;
  holdingQuantity: number;
  unrealizedLossINR: number;
  holdingPeriodDays: number;
  isShortTerm: boolean; // <365 days
}

export class TaxLossHarvestingOpportunityEngine {
  public static findHarvestOpportunities(
    holdings: CapitalLossHarvestOpportunity[],
    realizedSTCG = 100000,
    realizedLTCG = 150000
  ): {
    totalRealizedGains: number;
    totalHarvestableLosses: number;
    potentialTaxSavingsINR: number;
    opportunities: CapitalLossHarvestOpportunity[];
  } {
    const opportunities = holdings.filter((h) => h.unrealizedLossINR < 0);
    const totalHarvestableLosses = opportunities.reduce((s, h) => s + Math.abs(h.unrealizedLossINR), 0);

    const stcgTaxBefore = realizedSTCG * 0.20;
    const ltcgTaxBefore = Math.max(0, realizedLTCG - 125000) * 0.125;
    const totalTaxBefore = stcgTaxBefore + ltcgTaxBefore;

    const netSTCG = Math.max(0, realizedSTCG - totalHarvestableLosses);
    const totalTaxAfter = netSTCG * 0.20 + ltcgTaxBefore;

    const potentialTaxSavingsINR = Math.max(0, Math.round(totalTaxBefore - totalTaxAfter));

    return {
      totalRealizedGains: realizedSTCG + realizedLTCG,
      totalHarvestableLosses: Math.round(totalHarvestableLosses),
      potentialTaxSavingsINR,
      opportunities,
    };
  }
}
