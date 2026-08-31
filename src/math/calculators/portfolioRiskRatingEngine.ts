import { AssetItem } from '../netWorthTracker';

export interface PortfolioRiskRating {
  totalValuation: number;
  equityConcentrationPercent: number;
  debtConcentrationPercent: number;
  cashConcentrationPercent: number;
  riskScore: number; // 1 to 10
  riskLabel: 'VERY_LOW' | 'LOW' | 'MODERATE' | 'HIGH' | 'VERY_HIGH';
  sharpeRatioEstimate: number;
}

export class PortfolioRiskRatingEngine {
  public static calculateRiskRating(assets: AssetItem[]): PortfolioRiskRating {
    const totalValuation = assets.reduce((s, a) => s + a.currentValue, 0);
    if (totalValuation === 0) {
      return {
        totalValuation: 0,
        equityConcentrationPercent: 0,
        debtConcentrationPercent: 0,
        cashConcentrationPercent: 100,
        riskScore: 1,
        riskLabel: 'VERY_LOW',
        sharpeRatioEstimate: 1.0,
      };
    }

    let equityVal = 0;
    let debtVal = 0;
    let cashVal = 0;

    assets.forEach((a) => {
      if (a.category === 'STOCKS' || a.category === 'MUTUAL_FUNDS') equityVal += a.currentValue;
      else if (a.category === 'RETIREMENT' || a.category === 'GOLD') debtVal += a.currentValue;
      else cashVal += a.currentValue;
    });

    const equityPct = (equityVal / totalValuation) * 100;
    const debtPct = (debtVal / totalValuation) * 100;
    const cashPct = (cashVal / totalValuation) * 100;

    const riskScore = Math.min(10, Math.max(1, Math.round((equityPct / 100) * 8 + (debtPct / 100) * 3 + 1)));

    let riskLabel: 'VERY_LOW' | 'LOW' | 'MODERATE' | 'HIGH' | 'VERY_HIGH' = 'MODERATE';
    if (riskScore >= 8) riskLabel = 'VERY_HIGH';
    else if (riskScore >= 6) riskLabel = 'HIGH';
    else if (riskScore <= 2) riskLabel = 'VERY_LOW';
    else if (riskScore <= 4) riskLabel = 'LOW';

    return {
      totalValuation: Math.round(totalValuation),
      equityConcentrationPercent: parseFloat(equityPct.toFixed(1)),
      debtConcentrationPercent: parseFloat(debtPct.toFixed(1)),
      cashConcentrationPercent: parseFloat(cashPct.toFixed(1)),
      riskScore,
      riskLabel,
      sharpeRatioEstimate: parseFloat((1.2 + riskScore * 0.05).toFixed(2)),
    };
  }
}
