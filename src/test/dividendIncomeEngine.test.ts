import { describe, it, expect } from 'vitest';
import { DividendIncomeEngine, DividendRecord } from '../math/dividendIncomeEngine';

const sampleDividends: DividendRecord[] = [
  { id: '1', stockName: 'TCS', tickerSymbol: 'TCS', sharesOwned: 100, dividendPerShare: 28, payoutDate: '2026-08-15', frequency: 'QUARTERLY' },
  { id: '2', stockName: 'Infosys', tickerSymbol: 'INFY', sharesOwned: 200, dividendPerShare: 18, payoutDate: '2026-08-20', frequency: 'SEMI_ANNUALLY' },
];

describe('DividendIncomeEngine Math', () => {
  it('should calculate annual dividend yield', () => {
    const res = DividendIncomeEngine.calculateDividendYield(sampleDividends, 500000);
    expect(res.totalAnnualDividendIncome).toBe(6400);
    expect(res.overallYieldPercentage).toBeCloseTo(1.28, 2);
  });
});
