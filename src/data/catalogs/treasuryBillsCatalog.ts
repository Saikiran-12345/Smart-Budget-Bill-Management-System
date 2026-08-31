export interface TreasuryBillOffering {
  tBillCode: string;
  tenureDays: 91 | 182 | 364;
  issuingAuthority: string; // RBI on behalf of Govt of India
  discountPriceINR: number;
  faceValueMaturityINR: number; // ₹100 or multiples
  annualizedYieldPercent: number;
  auctionDateStr: string;
  settlementDateStr: string;
  maturityDateStr: string;
  isTaxExemptAtSource: boolean; // STCG taxed at slab rate
}

export const TREASURY_BILLS_CATALOG: TreasuryBillOffering[] = [
  {
    tBillCode: '91D_TBILL_2026_Q1',
    tenureDays: 91,
    issuingAuthority: 'Reserve Bank of India (RBI)',
    discountPriceINR: 98.32,
    faceValueMaturityINR: 100.00,
    annualizedYieldPercent: 6.84,
    auctionDateStr: '2026-03-04',
    settlementDateStr: '2026-03-05',
    maturityDateStr: '2026-06-04',
    isTaxExemptAtSource: false,
  },
  {
    tBillCode: '182D_TBILL_2026_Q1',
    tenureDays: 182,
    issuingAuthority: 'Reserve Bank of India (RBI)',
    discountPriceINR: 96.65,
    faceValueMaturityINR: 100.00,
    annualizedYieldPercent: 6.92,
    auctionDateStr: '2026-03-04',
    settlementDateStr: '2026-03-05',
    maturityDateStr: '2026-09-03',
    isTaxExemptAtSource: false,
  },
  {
    tBillCode: '364D_TBILL_2026_Q1',
    tenureDays: 364,
    issuingAuthority: 'Reserve Bank of India (RBI)',
    discountPriceINR: 93.48,
    faceValueMaturityINR: 100.00,
    annualizedYieldPercent: 6.97,
    auctionDateStr: '2026-03-04',
    settlementDateStr: '2026-03-05',
    maturityDateStr: '2027-03-04',
    isTaxExemptAtSource: false,
  },
];
