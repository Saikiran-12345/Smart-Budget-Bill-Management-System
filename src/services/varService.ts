import { ValueAtRiskEngine, VaRSummary } from '../math/calculators/valueAtRiskEngine';

export class VaRService {
  public static getPortfolioVaR(
    portfolioValuationINR = 1000000,
    dailyVolatilityPercent = 1.2,
    confidenceLevel: 95 | 99 = 95
  ): VaRSummary {
    return ValueAtRiskEngine.calculateVaR(portfolioValuationINR, dailyVolatilityPercent, confidenceLevel);
  }
}
