export interface CapitalGainLossItem {
  id: string;
  assetName: string;
  buyDate: string;
  sellDate?: string;
  purchasePrice: number;
  currentPrice: number;
  quantity: number;
  holdingDays: number;
  isLongTerm: boolean; // >365 days
  unrealizedGainLoss: number;
}

export interface TaxLossHarvestingOpportunity {
  totalShortTermGains: number;
  totalLongTermGains: number;
  totalHarvestableLosses: number;
  potentialTaxSaved: number;
  candidateLossAssets: CapitalGainLossItem[];
}

export class TaxLossHarvestingCalculator {
  public static findHarvestingOpportunities(
    portfolio: CapitalGainLossItem[]
  ): TaxLossHarvestingOpportunity {
    let shortTermGains = 0;
    let longTermGains = 0;
    let harvestableLosses = 0;
    const candidates: CapitalGainLossItem[] = [];

    portfolio.forEach((item) => {
      if (item.unrealizedGainLoss > 0) {
        if (item.isLongTerm) longTermGains += item.unrealizedGainLoss;
        else shortTermGains += item.unrealizedGainLoss;
      } else if (item.unrealizedGainLoss < 0) {
        harvestableLosses += Math.abs(item.unrealizedGainLoss);
        candidates.push(item);
      }
    });

    // Short term tax rate = 20%, Long term tax rate = 12.5% (Indian Capital Gains 2024/25)
    const stcgTax = shortTermGains * 0.20;
    const ltcgTax = Math.max(0, longTermGains - 125000) * 0.125;
    const totalTaxWithoutHarvesting = stcgTax + ltcgTax;

    const netShortTerm = Math.max(0, shortTermGains - harvestableLosses);
    const totalTaxWithHarvesting = netShortTerm * 0.20 + ltcgTax;

    const potentialTaxSaved = Math.max(0, Math.round(totalTaxWithoutHarvesting - totalTaxWithHarvesting));

    return {
      totalShortTermGains: Math.round(shortTermGains),
      totalLongTermGains: Math.round(longTermGains),
      totalHarvestableLosses: Math.round(harvestableLosses),
      potentialTaxSaved,
      candidateLossAssets: candidates,
    };
  }
}
