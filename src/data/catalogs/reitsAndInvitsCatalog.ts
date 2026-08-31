export interface REITAndInvITEntry {
  symbolCode: string;
  entityName: string;
  assetCategory: 'REAL_ESTATE_REIT' | 'INFRASTRUCTURE_INVIT';
  marketPriceINR: number;
  distributionYieldPercent: number; // Dividend/Distribution yield
  navPriceINR: number;
  portfolioOccupancyPercent: number;
  totalLeasableAreaSqFt: number;
  keyPropertiesCount: number;
  quarterlyDistributionHistoryINR: number[];
}

export const REITS_AND_INVITS_CATALOG: REITAndInvITEntry[] = [
  {
    symbolCode: 'EMBASSY_REIT',
    entityName: 'Embassy Office Parks REIT',
    assetCategory: 'REAL_ESTATE_REIT',
    marketPriceINR: 375.40,
    distributionYieldPercent: 6.8,
    navPriceINR: 392.10,
    portfolioOccupancyPercent: 88.5,
    totalLeasableAreaSqFt: 45000000,
    keyPropertiesCount: 14,
    quarterlyDistributionHistoryINR: [5.20, 5.35, 5.40, 5.50],
  },
  {
    symbolCode: 'MINDSPACE_REIT',
    entityName: 'Mindspace Business Parks REIT',
    assetCategory: 'REAL_ESTATE_REIT',
    marketPriceINR: 345.80,
    distributionYieldPercent: 6.5,
    navPriceINR: 368.50,
    portfolioOccupancyPercent: 90.2,
    totalLeasableAreaSqFt: 33000000,
    keyPropertiesCount: 10,
    quarterlyDistributionHistoryINR: [4.80, 4.90, 5.00, 5.10],
  },
  {
    symbolCode: 'BROOKFIELD_REIT',
    entityName: 'Brookfield India Real Estate Trust REIT',
    assetCategory: 'REAL_ESTATE_REIT',
    marketPriceINR: 260.10,
    distributionYieldPercent: 7.4,
    navPriceINR: 285.00,
    portfolioOccupancyPercent: 86.4,
    totalLeasableAreaSqFt: 25000000,
    keyPropertiesCount: 8,
    quarterlyDistributionHistoryINR: [4.60, 4.75, 4.80, 4.90],
  },
  {
    symbolCode: 'POWERGRID_INVIT',
    entityName: 'POWERGRID Infrastructure Investment Trust (InvIT)',
    assetCategory: 'INFRASTRUCTURE_INVIT',
    marketPriceINR: 98.50,
    distributionYieldPercent: 11.2,
    navPriceINR: 102.40,
    portfolioOccupancyPercent: 99.8,
    totalLeasableAreaSqFt: 0,
    keyPropertiesCount: 5, // Power transmission lines
    quarterlyDistributionHistoryINR: [3.00, 3.00, 3.00, 3.00],
  },
  {
    symbolCode: 'INDIAGRID_INVIT',
    entityName: 'India Grid Trust (IndiGrid InvIT)',
    assetCategory: 'INFRASTRUCTURE_INVIT',
    marketPriceINR: 132.80,
    distributionYieldPercent: 10.8,
    navPriceINR: 138.20,
    portfolioOccupancyPercent: 99.5,
    totalLeasableAreaSqFt: 0,
    keyPropertiesCount: 18,
    quarterlyDistributionHistoryINR: [3.55, 3.55, 3.55, 3.55],
  },
];
