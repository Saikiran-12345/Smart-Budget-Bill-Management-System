import { SharpeRatioRiskEngine, SharpeRatioAnalysis } from '../math/calculators/sharpeRatioRiskEngine';
import { SortinoRatioEngine, SortinoRatioAnalysis } from '../math/calculators/sortinoRatioEngine';

export class RiskAnalyticsService {
  public static getSharpeRatio(
    portfolioReturn = 14.5,
    riskFreeRate = 7.0,
    volatility = 12.0
  ): SharpeRatioAnalysis {
    return SharpeRatioRiskEngine.calculateSharpeRatio(portfolioReturn, riskFreeRate, volatility);
  }

  public static getSortinoRatio(
    portfolioReturn = 16.2,
    riskFreeRate = 7.0,
    downsideDev = 6.5
  ): SortinoRatioAnalysis {
    return SortinoRatioEngine.calculateSortinoRatio(portfolioReturn, riskFreeRate, downsideDev);
  }
}
