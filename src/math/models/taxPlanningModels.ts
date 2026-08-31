export interface TaxSlabBracketModel {
  bracketIndex: number;
  minIncomeINR: number;
  maxIncomeINR: number;
  taxRatePercent: number;
  slabTaxableAmountINR: number;
  slabTaxCalculatedINR: number;
}

export interface TaxDeductionCategoryModel {
  categoryCode: string;
  categoryTitle: string;
  sectionReference: string;
  maxExemptionLimitINR: number;
  eligibleInvestments: string[];
  isAvailableInNewRegime: boolean;
}

export const INDIAN_TAX_DEDUCTION_CATEGORIES_CATALOG: TaxDeductionCategoryModel[] = [
  {
    categoryCode: 'SEC_80C',
    categoryTitle: 'Investments & Savings (EPF, PPF, ELSS, Life Insurance, Tuition Fees, Principal Repayment)',
    sectionReference: 'Section 80C',
    maxExemptionLimitINR: 150000,
    eligibleInvestments: ['EPF', 'PPF', 'ELSS Mutual Funds', 'NCS', 'SSY', 'Tax Saver FDs', 'Home Loan Principal'],
    isAvailableInNewRegime: false,
  },
  {
    categoryCode: 'SEC_80D_SELF',
    categoryTitle: 'Health Insurance Premiums (Self, Spouse & Dependent Children)',
    sectionReference: 'Section 80D',
    maxExemptionLimitINR: 25000,
    eligibleInvestments: ['Health Insurance Premium', 'Preventive Health Checkup (Max ₹5,000)'],
    isAvailableInNewRegime: false,
  },
  {
    categoryCode: 'SEC_80D_PARENTS',
    categoryTitle: 'Health Insurance Premiums (Senior Citizen Parents Age >= 60)',
    sectionReference: 'Section 80D',
    maxExemptionLimitINR: 50000,
    eligibleInvestments: ['Senior Citizen Parents Health Insurance', 'Medical Expenses for Senior Parents'],
    isAvailableInNewRegime: false,
  },
  {
    categoryCode: 'SEC_80CCD_1B',
    categoryTitle: 'National Pension Scheme (NPS) Voluntary Contribution',
    sectionReference: 'Section 80CCD(1B)',
    maxExemptionLimitINR: 50000,
    eligibleInvestments: ['NPS Tier-1 Account Contribution'],
    isAvailableInNewRegime: true,
  },
  {
    categoryCode: 'SEC_24B',
    categoryTitle: 'Interest on Self-Occupied Home Property Loan',
    sectionReference: 'Section 24(b)',
    maxExemptionLimitINR: 200000,
    eligibleInvestments: ['Housing Loan Interest Paid'],
    isAvailableInNewRegime: false,
  },
  {
    categoryCode: 'SEC_80E',
    categoryTitle: 'Interest Paid on Higher Education Loan',
    sectionReference: 'Section 80E',
    maxExemptionLimitINR: Infinity,
    eligibleInvestments: ['Education Loan Interest'],
    isAvailableInNewRegime: false,
  },
  {
    categoryCode: 'SEC_80TTA_TTB',
    categoryTitle: 'Savings Bank Account Interest Exemption',
    sectionReference: 'Section 80TTA / 80TTB',
    maxExemptionLimitINR: 50000,
    eligibleInvestments: ['Savings Bank Interest', 'Post Office Savings Interest'],
    isAvailableInNewRegime: false,
  },
  {
    categoryCode: 'SEC_80G',
    categoryTitle: 'Donations to Eligible Charitable Funds and Relief Trusts',
    sectionReference: 'Section 80G',
    maxExemptionLimitINR: Infinity,
    eligibleInvestments: ['PM Cares Fund', 'National Relief Fund', 'Approved Non-Profits'],
    isAvailableInNewRegime: false,
  },
];
