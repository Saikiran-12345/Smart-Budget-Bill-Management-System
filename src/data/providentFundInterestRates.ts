export interface HistoricalPFInterestRate {
  financialYear: string;
  epfInterestRatePercent: number; // Employees Provident Fund (EPFO)
  ppfInterestRatePercent: number; // Public Provident Fund
  vpfInterestRatePercent: number; // Voluntary Provident Fund
  nscInterestRatePercent: number; // National Savings Certificate
}

export const HISTORICAL_PF_INTEREST_RATES: HistoricalPFInterestRate[] = [
  { financialYear: 'FY 2024-25', epfInterestRatePercent: 8.25, ppfInterestRatePercent: 7.10, vpfInterestRatePercent: 8.25, nscInterestRatePercent: 7.70 },
  { financialYear: 'FY 2023-24', epfInterestRatePercent: 8.25, ppfInterestRatePercent: 7.10, vpfInterestRatePercent: 8.25, nscInterestRatePercent: 7.70 },
  { financialYear: 'FY 2022-23', epfInterestRatePercent: 8.15, ppfInterestRatePercent: 7.10, vpfInterestRatePercent: 8.15, nscInterestRatePercent: 7.00 },
  { financialYear: 'FY 2021-22', epfInterestRatePercent: 8.10, ppfInterestRatePercent: 7.10, vpfInterestRatePercent: 8.10, nscInterestRatePercent: 6.80 },
  { financialYear: 'FY 2020-21', epfInterestRatePercent: 8.50, ppfInterestRatePercent: 7.10, vpfInterestRatePercent: 8.50, nscInterestRatePercent: 6.80 },
  { financialYear: 'FY 2019-20', epfInterestRatePercent: 8.50, ppfInterestRatePercent: 7.90, vpfInterestRatePercent: 8.50, nscInterestRatePercent: 7.90 },
  { financialYear: 'FY 2018-19', epfInterestRatePercent: 8.65, ppfInterestRatePercent: 8.00, vpfInterestRatePercent: 8.65, nscInterestRatePercent: 8.00 },
  { financialYear: 'FY 2017-18', epfInterestRatePercent: 8.55, ppfInterestRatePercent: 7.80, vpfInterestRatePercent: 8.55, nscInterestRatePercent: 7.80 },
  { financialYear: 'FY 2016-17', epfInterestRatePercent: 8.65, ppfInterestRatePercent: 8.10, vpfInterestRatePercent: 8.65, nscInterestRatePercent: 8.10 },
  { financialYear: 'FY 2015-16', epfInterestRatePercent: 8.80, ppfInterestRatePercent: 8.70, vpfInterestRatePercent: 8.80, nscInterestRatePercent: 8.50 },
];
