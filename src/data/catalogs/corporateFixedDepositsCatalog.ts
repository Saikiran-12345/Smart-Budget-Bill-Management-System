export interface CorporateFDOffering {
  companyCode: string;
  companyName: string;
  creditRatingAgency: 'CRISIL' | 'ICRA' | 'CARE' | 'IND_RA';
  creditRating: 'AAA' | 'AA+' | 'AA' | 'A+';
  tenureMonths: number;
  regularInterestRatePercent: number;
  seniorCitizenInterestRatePercent: number;
  minimumDepositINR: number;
  compoundingFrequency: 'MONTHLY' | 'QUARTERLY' | 'CUMULATIVE_AT_MATURITY';
  prematureWithdrawalPenaltyPercent: number;
}

export const CORPORATE_FIXED_DEPOSITS_CATALOG: CorporateFDOffering[] = [
  {
    companyCode: 'BAJAJ_FINANCE_FD',
    companyName: 'Bajaj Finance Limited',
    creditRatingAgency: 'CRISIL',
    creditRating: 'AAA',
    tenureMonths: 36,
    regularInterestRatePercent: 8.10,
    seniorCitizenInterestRatePercent: 8.35,
    minimumDepositINR: 15000,
    compoundingFrequency: 'CUMULATIVE_AT_MATURITY',
    prematureWithdrawalPenaltyPercent: 1.0,
  },
  {
    companyCode: 'SHRIRAM_FINANCE_FD',
    companyName: 'Shriram Finance Limited',
    creditRatingAgency: 'ICRA',
    creditRating: 'AA+',
    tenureMonths: 50,
    regularInterestRatePercent: 8.50,
    seniorCitizenInterestRatePercent: 9.00,
    minimumDepositINR: 5000,
    compoundingFrequency: 'CUMULATIVE_AT_MATURITY',
    prematureWithdrawalPenaltyPercent: 1.0,
  },
  {
    companyCode: 'MAHINDRA_FINANCE_FD',
    companyName: 'Mahindra & Mahindra Financial Services',
    creditRatingAgency: 'CRISIL',
    creditRating: 'AAA',
    tenureMonths: 48,
    regularInterestRatePercent: 8.05,
    seniorCitizenInterestRatePercent: 8.30,
    minimumDepositINR: 10000,
    compoundingFrequency: 'CUMULATIVE_AT_MATURITY',
    prematureWithdrawalPenaltyPercent: 1.0,
  },
  {
    companyCode: 'ICICI_HOME_FINANCE_FD',
    companyName: 'ICICI Home Finance Company',
    creditRatingAgency: 'CARE',
    creditRating: 'AAA',
    tenureMonths: 36,
    regularInterestRatePercent: 7.65,
    seniorCitizenInterestRatePercent: 7.90,
    minimumDepositINR: 10000,
    compoundingFrequency: 'CUMULATIVE_AT_MATURITY',
    prematureWithdrawalPenaltyPercent: 1.0,
  },
  {
    companyCode: 'PNB_HOUSING_FD',
    companyName: 'PNB Housing Finance Limited',
    creditRatingAgency: 'ICRA',
    creditRating: 'AA+',
    tenureMonths: 36,
    regularInterestRatePercent: 7.85,
    seniorCitizenInterestRatePercent: 8.10,
    minimumDepositINR: 10000,
    compoundingFrequency: 'CUMULATIVE_AT_MATURITY',
    prematureWithdrawalPenaltyPercent: 1.0,
  },
];
