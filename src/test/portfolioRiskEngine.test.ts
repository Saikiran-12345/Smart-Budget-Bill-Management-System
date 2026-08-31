import { describe, it, expect } from 'vitest';
import { PortfolioRiskEngine } from '../math/portfolioRiskEngine';

describe('PortfolioRiskEngine Math', () => {
  it('should calculate asset allocation percentages and risk score', () => {
    const res = PortfolioRiskEngine.analyzePortfolio([
      { id: '1', assetName: 'MF', category: 'MUTUAL_FUNDS', currentValue: 400000, isLiquid: true },
      { id: '2', assetName: 'Stocks', category: 'STOCKS', currentValue: 300000, isLiquid: true },
      { id: '3', assetName: 'Gold', category: 'GOLD', currentValue: 100000, isLiquid: true },
    ]);

    expect(res.totalPortfolioValue).toBe(800000);
    expect(res.riskScore).toBeGreaterThanOrEqual(1);
    expect(res.riskScore).toBeLessThanOrEqual(10);
    expect(res.allocations.length).toBe(3);
  });
});
