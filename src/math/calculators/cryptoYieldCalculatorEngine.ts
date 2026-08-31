export interface CryptoStakingYieldDetail {
  tokenName: string;
  stakedAmountTokens: number;
  tokenUnitPriceINR: number;
  totalInvestmentValueINR: number;
  annualStakingAPYPercent: number;
  estimatedMonthlyYieldTokens: number;
  estimatedMonthlyYieldINR: number;
  estimatedAnnualYieldINR: number;
  riskRating: 'LOW_RISK' | 'MEDIUM_RISK' | 'HIGH_VOLATILITY' | 'EXTREME_RISK';
  impermanentLossRiskPercent: number;
}

export class CryptoYieldCalculatorEngine {
  public static calculateYield(
    tokenName = 'Ethereum (ETH)',
    stakedAmountTokens = 2.5,
    tokenUnitPriceINR = 250000,
    annualStakingAPYPercent = 5.2,
    impermanentLossRiskPercent = 2.5
  ): CryptoStakingYieldDetail {
    const totalInvestmentValueINR = stakedAmountTokens * tokenUnitPriceINR;
    const annualYieldTokens = (stakedAmountTokens * annualStakingAPYPercent) / 100;
    const monthlyYieldTokens = annualYieldTokens / 12;

    const estimatedMonthlyYieldINR = monthlyYieldTokens * tokenUnitPriceINR;
    const estimatedAnnualYieldINR = annualYieldTokens * tokenUnitPriceINR;

    let riskRating: 'LOW_RISK' | 'MEDIUM_RISK' | 'HIGH_VOLATILITY' | 'EXTREME_RISK' = 'HIGH_VOLATILITY';
    if (annualStakingAPYPercent > 15) riskRating = 'EXTREME_RISK';
    else if (annualStakingAPYPercent < 4) riskRating = 'MEDIUM_RISK';

    return {
      tokenName,
      stakedAmountTokens,
      tokenUnitPriceINR,
      totalInvestmentValueINR: Math.round(totalInvestmentValueINR),
      annualStakingAPYPercent,
      estimatedMonthlyYieldTokens: parseFloat(monthlyYieldTokens.toFixed(4)),
      estimatedMonthlyYieldINR: Math.round(estimatedMonthlyYieldINR),
      estimatedAnnualYieldINR: Math.round(estimatedAnnualYieldINR),
      riskRating,
      impermanentLossRiskPercent,
    };
  }

  public static calculateStakingYield(
    tokens: { id: string; tokenSymbol: string; tokenName: string; stakedAmount: number; tokenPriceUSD?: number; price?: number; annualYieldPercentage?: number; apy?: number }[]
  ) {
    let totalValue = 0;
    let totalAnnualYieldUSD = 0;

    const details = tokens.map((t) => {
      const p = t.tokenPriceUSD ?? t.price ?? 0;
      const a = t.annualYieldPercentage ?? t.apy ?? 0;

      const yieldDetail = CryptoYieldCalculatorEngine.calculateYield(
        t.tokenName,
        t.stakedAmount,
        p,
        a
      );
      totalValue += t.stakedAmount * p;
      totalAnnualYieldUSD += (t.stakedAmount * p * a) / 100;
      return yieldDetail;
    });

    const monthlyPassiveIncomeUSD = totalAnnualYieldUSD / 12;

    return {
      totalValue: Math.round(totalValue),
      totalPortfolioValueUSD: Math.round(totalValue),
      totalAnnualYieldUSD,
      monthlyPassiveIncomeUSD,
      totalMonthlyIncome: Math.round(monthlyPassiveIncomeUSD),
      tokens: details,
    };
  }
}
