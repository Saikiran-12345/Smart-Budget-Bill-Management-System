import { describe, it, expect } from 'vitest';
import { PortfolioRiskRatingEngine } from '../math/calculators/portfolioRiskRatingEngine';

describe('PortfolioRiskRatingEngine Math', () => {
  it('should evaluate risk rating and equity concentration score', () => {
    const res = PortfolioRiskRatingEngine.calculateRiskRating([
      { id: '1', assetName: 'Mutual Funds', category: 'MUTUAL_FUNDS', currentValue: 600000, isLiquid: true },
      { id: '2', assetName: 'Stocks', category: 'STOCKS', currentValue: 200000, isLiquid: true },
      { id: '3', assetName: 'Savings', category: 'LIQUID_CASH', currentValue: 200000, isLiquid: true },
    ]);

    expect(res.totalValuation).toBe(1000000);
    expect(res.equityConcentrationPercent).toBe(80);
    expect(res.riskScore).toBeGreaterThanOrEqual(6);
  });
});
