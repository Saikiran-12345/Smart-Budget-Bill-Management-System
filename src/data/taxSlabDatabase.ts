export interface HistoricalTaxSlab {
  financialYear: string; // e.g. FY 2024-25
  assessmentYear: string; // e.g. AY 2025-26
  regimeType: 'OLD_REGIME' | 'NEW_REGIME';
  standardDeductionAmount: number;
  slabs: {
    minIncome: number;
    maxIncome: number;
    taxRatePercent: number;
    description: string;
  }[];
  section80CLimit: number;
  section80DLimitSelf: number;
  section80DLimitParents: number;
  section80CCD1BLimit: number;
  section24BHomeLoanLimit: number;
  rebate87ALimitIncome: number;
  rebate87AMaxTaxRebate: number;
  surchargeBrackets: {
    minIncome: number;
    maxIncome: number;
    surchargeRatePercent: number;
  }[];
  healthEducationCessPercent: number;
}

export const HISTORICAL_TAX_SLAB_DATABASE: HistoricalTaxSlab[] = [
  // FY 2026-27 (New Regime - Union Budget 2025/2026 Proposed)
  {
    financialYear: 'FY 2026-27',
    assessmentYear: 'AY 2027-28',
    regimeType: 'NEW_REGIME',
    standardDeductionAmount: 75000,
    slabs: [
      { minIncome: 0, maxIncome: 400000, taxRatePercent: 0, description: 'Nil tax bracket' },
      { minIncome: 400000, maxIncome: 800000, taxRatePercent: 5, description: '5% slab' },
      { minIncome: 800000, maxIncome: 1200000, taxRatePercent: 10, description: '10% slab' },
      { minIncome: 1200000, maxIncome: 1600000, taxRatePercent: 15, description: '15% slab' },
      { minIncome: 1600000, maxIncome: 2000000, taxRatePercent: 20, description: '20% slab' },
      { minIncome: 2000000, maxIncome: 2400000, taxRatePercent: 25, description: '25% slab' },
      { minIncome: 2400000, maxIncome: Infinity, taxRatePercent: 30, description: '30% maximum slab' },
    ],
    section80CLimit: 0,
    section80DLimitSelf: 0,
    section80DLimitParents: 0,
    section80CCD1BLimit: 50000,
    section24BHomeLoanLimit: 0,
    rebate87ALimitIncome: 1200000,
    rebate87AMaxTaxRebate: 60000,
    surchargeBrackets: [
      { minIncome: 5000000, maxIncome: 10000000, surchargeRatePercent: 10 },
      { minIncome: 10000000, maxIncome: 20000000, surchargeRatePercent: 15 },
      { minIncome: 20000000, maxIncome: Infinity, surchargeRatePercent: 25 },
    ],
    healthEducationCessPercent: 4,
  },
  // FY 2025-26 (New Regime)
  {
    financialYear: 'FY 2025-26',
    assessmentYear: 'AY 2026-27',
    regimeType: 'NEW_REGIME',
    standardDeductionAmount: 75000,
    slabs: [
      { minIncome: 0, maxIncome: 300000, taxRatePercent: 0, description: 'Nil tax bracket' },
      { minIncome: 300000, maxIncome: 700000, taxRatePercent: 5, description: '5% slab' },
      { minIncome: 700000, maxIncome: 1000000, taxRatePercent: 10, description: '10% slab' },
      { minIncome: 1000000, maxIncome: 1200000, taxRatePercent: 15, description: '15% slab' },
      { minIncome: 1200000, maxIncome: 1500000, taxRatePercent: 20, description: '20% slab' },
      { minIncome: 1500000, maxIncome: Infinity, taxRatePercent: 30, description: '30% maximum slab' },
    ],
    section80CLimit: 0,
    section80DLimitSelf: 0,
    section80DLimitParents: 0,
    section80CCD1BLimit: 50000,
    section24BHomeLoanLimit: 0,
    rebate87ALimitIncome: 700000,
    rebate87AMaxTaxRebate: 25000,
    surchargeBrackets: [
      { minIncome: 5000000, maxIncome: 10000000, surchargeRatePercent: 10 },
      { minIncome: 10000000, maxIncome: 20000000, surchargeRatePercent: 15 },
      { minIncome: 20000000, maxIncome: Infinity, surchargeRatePercent: 25 },
    ],
    healthEducationCessPercent: 4,
  },
  // FY 2025-26 (Old Regime)
  {
    financialYear: 'FY 2025-26',
    assessmentYear: 'AY 2026-27',
    regimeType: 'OLD_REGIME',
    standardDeductionAmount: 50000,
    slabs: [
      { minIncome: 0, maxIncome: 250000, taxRatePercent: 0, description: 'Nil tax bracket' },
      { minIncome: 250000, maxIncome: 500000, taxRatePercent: 5, description: '5% slab' },
      { minIncome: 500000, maxIncome: 1000000, taxRatePercent: 20, description: '20% slab' },
      { minIncome: 1000000, maxIncome: Infinity, taxRatePercent: 30, description: '30% maximum slab' },
    ],
    section80CLimit: 150000,
    section80DLimitSelf: 25000,
    section80DLimitParents: 50000,
    section80CCD1BLimit: 50000,
    section24BHomeLoanLimit: 200000,
    rebate87ALimitIncome: 500000,
    rebate87AMaxTaxRebate: 12500,
    surchargeBrackets: [
      { minIncome: 5000000, maxIncome: 10000000, surchargeRatePercent: 10 },
      { minIncome: 10000000, maxIncome: 20000000, surchargeRatePercent: 15 },
      { minIncome: 20000000, maxIncome: 50000000, surchargeRatePercent: 25 },
      { minIncome: 50000000, maxIncome: Infinity, surchargeRatePercent: 37 },
    ],
    healthEducationCessPercent: 4,
  },
  // FY 2024-25 (New Regime)
  {
    financialYear: 'FY 2024-25',
    assessmentYear: 'AY 2025-26',
    regimeType: 'NEW_REGIME',
    standardDeductionAmount: 75000,
    slabs: [
      { minIncome: 0, maxIncome: 300000, taxRatePercent: 0, description: 'Nil tax' },
      { minIncome: 300000, maxIncome: 700000, taxRatePercent: 5, description: '5% slab' },
      { minIncome: 700000, maxIncome: 1000000, taxRatePercent: 10, description: '10% slab' },
      { minIncome: 1000000, maxIncome: 1200000, taxRatePercent: 15, description: '15% slab' },
      { minIncome: 1200000, maxIncome: 1500000, taxRatePercent: 20, description: '20% slab' },
      { minIncome: 1500000, maxIncome: Infinity, taxRatePercent: 30, description: '30% slab' },
    ],
    section80CLimit: 0,
    section80DLimitSelf: 0,
    section80DLimitParents: 0,
    section80CCD1BLimit: 50000,
    section24BHomeLoanLimit: 0,
    rebate87ALimitIncome: 700000,
    rebate87AMaxTaxRebate: 25000,
    surchargeBrackets: [
      { minIncome: 5000000, maxIncome: 10000000, surchargeRatePercent: 10 },
      { minIncome: 10000000, maxIncome: 20000000, surchargeRatePercent: 15 },
      { minIncome: 20000000, maxIncome: Infinity, surchargeRatePercent: 25 },
    ],
    healthEducationCessPercent: 4,
  },
  // FY 2024-25 (Old Regime)
  {
    financialYear: 'FY 2024-25',
    assessmentYear: 'AY 2025-26',
    regimeType: 'OLD_REGIME',
    standardDeductionAmount: 50000,
    slabs: [
      { minIncome: 0, maxIncome: 250000, taxRatePercent: 0, description: 'Nil tax' },
      { minIncome: 250000, maxIncome: 500000, taxRatePercent: 5, description: '5% slab' },
      { minIncome: 500000, maxIncome: 1000000, taxRatePercent: 20, description: '20% slab' },
      { minIncome: 1000000, maxIncome: Infinity, taxRatePercent: 30, description: '30% slab' },
    ],
    section80CLimit: 150000,
    section80DLimitSelf: 25000,
    section80DLimitParents: 50000,
    section80CCD1BLimit: 50000,
    section24BHomeLoanLimit: 200000,
    rebate87ALimitIncome: 500000,
    rebate87AMaxTaxRebate: 12500,
    surchargeBrackets: [
      { minIncome: 5000000, maxIncome: 10000000, surchargeRatePercent: 10 },
      { minIncome: 10000000, maxIncome: 20000000, surchargeRatePercent: 15 },
      { minIncome: 20000000, maxIncome: 50000000, surchargeRatePercent: 25 },
      { minIncome: 50000000, maxIncome: Infinity, surchargeRatePercent: 37 },
    ],
    healthEducationCessPercent: 4,
  },
  // FY 2023-24 (New Regime)
  {
    financialYear: 'FY 2023-24',
    assessmentYear: 'AY 2024-25',
    regimeType: 'NEW_REGIME',
    standardDeductionAmount: 50000,
    slabs: [
      { minIncome: 0, maxIncome: 300000, taxRatePercent: 0, description: 'Nil' },
      { minIncome: 300000, maxIncome: 600000, taxRatePercent: 5, description: '5%' },
      { minIncome: 600000, maxIncome: 900000, taxRatePercent: 10, description: '10%' },
      { minIncome: 900000, maxIncome: 1200000, taxRatePercent: 15, description: '15%' },
      { minIncome: 1200000, maxIncome: 1500000, taxRatePercent: 20, description: '20%' },
      { minIncome: 1500000, maxIncome: Infinity, taxRatePercent: 30, description: '30%' },
    ],
    section80CLimit: 0,
    section80DLimitSelf: 0,
    section80DLimitParents: 0,
    section80CCD1BLimit: 50000,
    section24BHomeLoanLimit: 0,
    rebate87ALimitIncome: 700000,
    rebate87AMaxTaxRebate: 25000,
    surchargeBrackets: [
      { minIncome: 5000000, maxIncome: 10000000, surchargeRatePercent: 10 },
      { minIncome: 10000000, maxIncome: 20000000, surchargeRatePercent: 15 },
      { minIncome: 20000000, maxIncome: Infinity, surchargeRatePercent: 25 },
    ],
    healthEducationCessPercent: 4,
  },
];

export class TaxSlabLookupService {
  public static getSlabForYear(financialYear: string, regime: 'OLD_REGIME' | 'NEW_REGIME'): HistoricalTaxSlab | undefined {
    return HISTORICAL_TAX_SLAB_DATABASE.find(
      (s) => s.financialYear === financialYear && s.regimeType === regime
    );
  }
}
