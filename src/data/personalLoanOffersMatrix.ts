export interface PersonalLoanLenderOffer {
  lenderCode: string;
  lenderName: string;
  lenderType: 'BANK' | 'NBFC' | 'FINTECH_APP';
  minLoanAmountINR: number;
  maxLoanAmountINR: number;
  minAPRPercent: number;
  maxAPRPercent: number;
  processingFeePercent: number;
  minTenureMonths: number;
  maxTenureMonths: number;
  minCibilScoreRequired: number;
  disbursalTimeHours: number;
  foreclosureChargesPercent: number;
}

export const PERSONAL_LOAN_OFFERS_MATRIX: PersonalLoanLenderOffer[] = [
  {
    lenderCode: 'HDFC_PL',
    lenderName: 'HDFC Bank Personal Loan',
    lenderType: 'BANK',
    minLoanAmountINR: 50000,
    maxLoanAmountINR: 4000000,
    minAPRPercent: 10.50,
    maxAPRPercent: 16.00,
    processingFeePercent: 1.5,
    minTenureMonths: 12,
    maxTenureMonths: 72,
    minCibilScoreRequired: 720,
    disbursalTimeHours: 4,
    foreclosureChargesPercent: 2.0,
  },
  {
    lenderCode: 'ICICI_PL',
    lenderName: 'ICICI Bank Personal Loan',
    lenderType: 'BANK',
    minLoanAmountINR: 50000,
    maxLoanAmountINR: 5000000,
    minAPRPercent: 10.80,
    maxAPRPercent: 16.25,
    processingFeePercent: 1.25,
    minTenureMonths: 12,
    maxTenureMonths: 72,
    minCibilScoreRequired: 730,
    disbursalTimeHours: 2,
    foreclosureChargesPercent: 3.0,
  },
  {
    lenderCode: 'SBI_PL',
    lenderName: 'SBI Xpress Credit Personal Loan',
    lenderType: 'BANK',
    minLoanAmountINR: 25000,
    maxLoanAmountINR: 2000000,
    minAPRPercent: 11.15,
    maxAPRPercent: 15.30,
    processingFeePercent: 1.0,
    minTenureMonths: 6,
    maxTenureMonths: 72,
    minCibilScoreRequired: 700,
    disbursalTimeHours: 24,
    foreclosureChargesPercent: 0.0, // 0 for SBI salaried
  },
  {
    lenderCode: 'AXIS_PL',
    lenderName: 'Axis Bank Personal Loan',
    lenderType: 'BANK',
    minLoanAmountINR: 50000,
    maxLoanAmountINR: 4000000,
    minAPRPercent: 11.25,
    maxAPRPercent: 17.00,
    processingFeePercent: 1.75,
    minTenureMonths: 12,
    maxTenureMonths: 60,
    minCibilScoreRequired: 720,
    disbursalTimeHours: 6,
    foreclosureChargesPercent: 2.5,
  },
  {
    lenderCode: 'BAJAJ_FINSERV_PL',
    lenderName: 'Bajaj Finserv Flexi Personal Loan',
    lenderType: 'NBFC',
    minLoanAmountINR: 100000,
    maxLoanAmountINR: 3500000,
    minAPRPercent: 13.00,
    maxAPRPercent: 22.00,
    processingFeePercent: 2.0,
    minTenureMonths: 12,
    maxTenureMonths: 84,
    minCibilScoreRequired: 680,
    disbursalTimeHours: 1,
    foreclosureChargesPercent: 4.0,
  },
  {
    lenderCode: 'TATA_CAPITAL_PL',
    lenderName: 'Tata Capital Personal Loan',
    lenderType: 'NBFC',
    minLoanAmountINR: 75000,
    maxLoanAmountINR: 3500000,
    minAPRPercent: 11.99,
    maxAPRPercent: 18.50,
    processingFeePercent: 1.5,
    minTenureMonths: 12,
    maxTenureMonths: 72,
    minCibilScoreRequired: 710,
    disbursalTimeHours: 12,
    foreclosureChargesPercent: 3.0,
  },
  {
    lenderCode: 'KREDITBEE_PL',
    lenderName: 'KreditBee Instant Salary Loan',
    lenderType: 'FINTECH_APP',
    minLoanAmountINR: 10000,
    maxLoanAmountINR: 500000,
    minAPRPercent: 16.00,
    maxAPRPercent: 28.00,
    processingFeePercent: 3.0,
    minTenureMonths: 3,
    maxTenureMonths: 24,
    minCibilScoreRequired: 650,
    disbursalTimeHours: 0.5,
    foreclosureChargesPercent: 0.0,
  },
];
