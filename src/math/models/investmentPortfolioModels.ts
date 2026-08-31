export interface AssetAllocationBenchmark {
  profileName: 'CONSERVATIVE_CAPITAL_PRESERVATION' | 'MODERATE_BALANCED_GROWTH' | 'AGGRESSIVE_WEALTH_CREATION' | 'ULTRA_AGGRESSIVE_SMALL_CAP';
  recommendedEquityPercent: number;
  recommendedDebtPercent: number;
  recommendedGoldPercent: number;
  recommendedCashPercent: number;
  expectedAnnualCAGRPercent: number;
  historicalMaxDrawdownPercent: number;
}

export const ASSET_ALLOCATION_BENCHMARKS: AssetAllocationBenchmark[] = [
  {
    profileName: 'CONSERVATIVE_CAPITAL_PRESERVATION',
    recommendedEquityPercent: 20,
    recommendedDebtPercent: 65,
    recommendedGoldPercent: 10,
    recommendedCashPercent: 5,
    expectedAnnualCAGRPercent: 8.0,
    historicalMaxDrawdownPercent: -8.5,
  },
  {
    profileName: 'MODERATE_BALANCED_GROWTH',
    recommendedEquityPercent: 50,
    recommendedDebtPercent: 35,
    recommendedGoldPercent: 10,
    recommendedCashPercent: 5,
    expectedAnnualCAGRPercent: 11.5,
    historicalMaxDrawdownPercent: -18.2,
  },
  {
    profileName: 'AGGRESSIVE_WEALTH_CREATION',
    recommendedEquityPercent: 75,
    recommendedDebtPercent: 15,
    recommendedGoldPercent: 5,
    recommendedCashPercent: 5,
    expectedAnnualCAGRPercent: 14.5,
    historicalMaxDrawdownPercent: -28.4,
  },
  {
    profileName: 'ULTRA_AGGRESSIVE_SMALL_CAP',
    recommendedEquityPercent: 90,
    recommendedDebtPercent: 0,
    recommendedGoldPercent: 5,
    recommendedCashPercent: 5,
    expectedAnnualCAGRPercent: 18.2,
    historicalMaxDrawdownPercent: -38.6,
  },
];
