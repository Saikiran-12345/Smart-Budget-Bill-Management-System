export interface CryptoStakingDetail {
  tokenSymbol: string;
  tokenName: string;
  stakedQuantity: number;
  priceINR: number;
  annualAPYPercent: number;
  monthlyRewardINR: number;
  annualRewardINR: number;
  riskCategory: 'LOW_RISK' | 'MODERATE' | 'HIGH_VOLATILITY';
}

export class CryptoStakingYieldEngine {
  public static calculateYield(
    tokenSymbol = 'ETH',
    tokenName = 'Ethereum',
    stakedQuantity = 3.0,
    priceINR = 260000,
    annualAPYPercent = 5.5
  ): CryptoStakingYieldDetail {
    const totalValuation = stakedQuantity * priceINR;
    const annualRewardTokens = (stakedQuantity * annualAPYPercent) / 100;
    const monthlyRewardTokens = annualRewardTokens / 12;

    const monthlyRewardINR = monthlyRewardTokens * priceINR;
    const annualRewardINR = annualRewardTokens * priceINR;

    let riskCategory: 'LOW_RISK' | 'MODERATE' | 'HIGH_VOLATILITY' = 'HIGH_VOLATILITY';
    if (annualAPYPercent < 4) riskCategory = 'LOW_RISK';
    else if (annualAPYPercent <= 8) riskCategory = 'MODERATE';

    return {
      tokenSymbol,
      tokenName,
      stakedQuantity,
      priceINR,
      annualAPYPercent,
      monthlyRewardINR: Math.round(monthlyRewardINR),
      annualRewardINR: Math.round(annualRewardINR),
      riskCategory,
    };
  }
}
