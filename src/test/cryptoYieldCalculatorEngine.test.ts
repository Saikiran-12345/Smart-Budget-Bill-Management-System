import { describe, it, expect } from 'vitest';
import { CryptoYieldCalculatorEngine } from '../math/calculators/cryptoYieldCalculatorEngine';

describe('CryptoYieldCalculatorEngine Math', () => {
  it('should calculate crypto staking APY and passive income', () => {
    const res = CryptoYieldCalculatorEngine.calculateStakingYield([
      { id: '1', tokenSymbol: 'ETH', tokenName: 'Ethereum', stakedAmount: 5, tokenPriceUSD: 3000, annualYieldPercentage: 4.5, stakingPeriodMonths: 12 },
    ]);

    expect(res.totalPortfolioValueUSD).toBe(15000);
    expect(res.totalAnnualYieldUSD).toBe(675);
    expect(res.monthlyPassiveIncomeUSD).toBe(56.25);
  });
});
