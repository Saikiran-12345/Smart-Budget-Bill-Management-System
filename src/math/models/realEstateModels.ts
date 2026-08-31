export interface PropertyTypeValuationBenchmark {
  propertyType: 'RESIDENTIAL_APARTMENT' | 'INDEPENDENT_VILLA' | 'COMMERCIAL_OFFICE' | 'RETAIL_SHOP' | 'PLOTTED_LAND';
  averageGrossRentalYieldPercent: number;
  averageAnnualCapitalAppreciationPercent: number;
  typicalMaintenanceCostPercentOfRent: number;
  typicalPropertyTaxPercentOfPrice: number;
  liquidityRating: 'HIGH' | 'MODERATE' | 'LOW';
}

export const REAL_ESTATE_VALUATION_BENCHMARKS: PropertyTypeValuationBenchmark[] = [
  {
    propertyType: 'RESIDENTIAL_APARTMENT',
    averageGrossRentalYieldPercent: 3.5,
    averageAnnualCapitalAppreciationPercent: 7.5,
    typicalMaintenanceCostPercentOfRent: 12.0,
    typicalPropertyTaxPercentOfPrice: 0.25,
    liquidityRating: 'HIGH',
  },
  {
    propertyType: 'INDEPENDENT_VILLA',
    averageGrossRentalYieldPercent: 2.2,
    averageAnnualCapitalAppreciationPercent: 9.0,
    typicalMaintenanceCostPercentOfRent: 18.0,
    typicalPropertyTaxPercentOfPrice: 0.30,
    liquidityRating: 'MODERATE',
  },
  {
    propertyType: 'COMMERCIAL_OFFICE',
    averageGrossRentalYieldPercent: 7.5,
    averageAnnualCapitalAppreciationPercent: 5.5,
    typicalMaintenanceCostPercentOfRent: 8.0,
    typicalPropertyTaxPercentOfPrice: 0.50,
    liquidityRating: 'MODERATE',
  },
  {
    propertyType: 'RETAIL_SHOP',
    averageGrossRentalYieldPercent: 8.2,
    averageAnnualCapitalAppreciationPercent: 6.0,
    typicalMaintenanceCostPercentOfRent: 10.0,
    typicalPropertyTaxPercentOfPrice: 0.60,
    liquidityRating: 'LOW',
  },
  {
    propertyType: 'PLOTTED_LAND',
    averageGrossRentalYieldPercent: 0.0, // No rental income
    averageAnnualCapitalAppreciationPercent: 12.5,
    typicalMaintenanceCostPercentOfRent: 0.0,
    typicalPropertyTaxPercentOfPrice: 0.10,
    liquidityRating: 'MODERATE',
  },
];
