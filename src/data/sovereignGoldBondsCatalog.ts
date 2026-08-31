export interface SovereignGoldBondTranche {
  trancheSeriesCode: string;
  trancheSeriesName: string;
  issueDateStr: string;
  maturityDateStr: string;
  issuePricePerGramINR: number;
  onlineDiscountedIssuePriceINR: number;
  fixedCouponInterestRatePercent: number; // 2.50% p.a. payable semi-annually
  currentSecondaryMarketPriceINR: number;
  capitalGainsTaxExemptionOnMaturity: boolean; // 100% tax exempt on maturity
}

export const SOVEREIGN_GOLD_BONDS_CATALOG: SovereignGoldBondTranche[] = [
  {
    trancheSeriesCode: 'SGB_2023_24_SERIES_IV',
    trancheSeriesName: 'Sovereign Gold Bond 2023-24 Series IV',
    issueDateStr: '2024-02-21',
    maturityDateStr: '2032-02-21',
    issuePricePerGramINR: 6263,
    onlineDiscountedIssuePriceINR: 6213,
    fixedCouponInterestRatePercent: 2.50,
    currentSecondaryMarketPriceINR: 7280,
    capitalGainsTaxExemptionOnMaturity: true,
  },
  {
    trancheSeriesCode: 'SGB_2023_24_SERIES_III',
    trancheSeriesName: 'Sovereign Gold Bond 2023-24 Series III',
    issueDateStr: '2023-12-28',
    maturityDateStr: '2031-12-28',
    issuePricePerGramINR: 6199,
    onlineDiscountedIssuePriceINR: 6149,
    fixedCouponInterestRatePercent: 2.50,
    currentSecondaryMarketPriceINR: 7250,
    capitalGainsTaxExemptionOnMaturity: true,
  },
  {
    trancheSeriesCode: 'SGB_2023_24_SERIES_II',
    trancheSeriesName: 'Sovereign Gold Bond 2023-24 Series II',
    issueDateStr: '2023-09-20',
    maturityDateStr: '2031-09-20',
    issuePricePerGramINR: 5923,
    onlineDiscountedIssuePriceINR: 5873,
    fixedCouponInterestRatePercent: 2.50,
    currentSecondaryMarketPriceINR: 7220,
    capitalGainsTaxExemptionOnMaturity: true,
  },
  {
    trancheSeriesCode: 'SGB_2023_24_SERIES_I',
    trancheSeriesName: 'Sovereign Gold Bond 2023-24 Series I',
    issueDateStr: '2023-06-27',
    maturityDateStr: '2031-06-27',
    issuePricePerGramINR: 5926,
    onlineDiscountedIssuePriceINR: 5876,
    fixedCouponInterestRatePercent: 2.50,
    currentSecondaryMarketPriceINR: 7210,
    capitalGainsTaxExemptionOnMaturity: true,
  },
  {
    trancheSeriesCode: 'SGB_2022_23_SERIES_IV',
    trancheSeriesName: 'Sovereign Gold Bond 2022-23 Series IV',
    issueDateStr: '2023-03-14',
    maturityDateStr: '2031-03-14',
    issuePricePerGramINR: 5611,
    onlineDiscountedIssuePriceINR: 5561,
    fixedCouponInterestRatePercent: 2.50,
    currentSecondaryMarketPriceINR: 7190,
    capitalGainsTaxExemptionOnMaturity: true,
  },
];
