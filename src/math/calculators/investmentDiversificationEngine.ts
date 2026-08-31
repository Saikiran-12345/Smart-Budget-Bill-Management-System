import { AssetItem } from '../netWorthTracker';

export interface DiversificationIndexResult {
  totalAssetsCount: number;
  totalValuation: number;
  herfindahlIndexScore: number; // 0 (perfect diversification) to 10000 (single asset concentration)
  diversificationLevel: 'EXCELLENT' | 'MODERATE' | 'CONCENTRATED';
  topAssetConcentrationPercent: number;
}

export class InvestmentDiversificationEngine {
  public static calculateDiversificationIndex(assets: AssetItem[]): DiversificationIndexResult {
    const totalValuation = assets.reduce((s, a) => s + a.currentValue, 0);
    if (totalValuation === 0 || assets.length === 0) {
      return {
        totalAssetsCount: 0,
        totalValuation: 0,
        herfindahlIndexScore: 10000,
        diversificationLevel: 'CONCENTRATED',
        topAssetConcentrationPercent: 100,
      };
    }

    let sumSquaredShares = 0;
    let maxShare = 0;

    assets.forEach((a) => {
      const sharePercent = (a.currentValue / totalValuation) * 100;
      sumSquaredShares += Math.pow(sharePercent, 2);
      if (sharePercent > maxShare) maxShare = sharePercent;
    });

    const herfindahlIndexScore = Math.round(sumSquaredShares);

    let diversificationLevel: 'EXCELLENT' | 'MODERATE' | 'CONCENTRATED' = 'MODERATE';
    if (herfindahlIndexScore < 2500 && assets.length >= 4) diversificationLevel = 'EXCELLENT';
    else if (herfindahlIndexScore > 4500) diversificationLevel = 'CONCENTRATED';

    return {
      totalAssetsCount: assets.length,
      totalValuation: Math.round(totalValuation),
      herfindahlIndexScore,
      diversificationLevel,
      topAssetConcentrationPercent: parseFloat(maxShare.toFixed(1)),
    };
  }
}
