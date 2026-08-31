export interface CreditScoreRangeBand {
  minScore: number;
  maxScore: number;
  bandLabel: 'EXCELLENT' | 'VERY_GOOD' | 'GOOD' | 'FAIR' | 'POOR';
  creditApprovalLikelihoodPercent: number;
  indicativeHomeLoanInterestRate: string;
  indicativePersonalLoanInterestRate: string;
  advisoryNote: string;
}

export const CIBIL_CREDIT_SCORE_BANDS: CreditScoreRangeBand[] = [
  {
    minScore: 780,
    maxScore: 900,
    bandLabel: 'EXCELLENT',
    creditApprovalLikelihoodPercent: 98,
    indicativeHomeLoanInterestRate: '8.40% - 8.60%',
    indicativePersonalLoanInterestRate: '10.49% - 11.50%',
    advisoryNote: 'Prime credit profile. Eligible for instant pre-approved loans, lowest APRs, and processing fee waivers.',
  },
  {
    minScore: 730,
    maxScore: 779,
    bandLabel: 'VERY_GOOD',
    creditApprovalLikelihoodPercent: 90,
    indicativeHomeLoanInterestRate: '8.65% - 8.90%',
    indicativePersonalLoanInterestRate: '11.75% - 13.00%',
    advisoryNote: 'Strong credit history. Qualified for competitive prime interest rates across all major banks.',
  },
  {
    minScore: 680,
    maxScore: 729,
    bandLabel: 'GOOD',
    creditApprovalLikelihoodPercent: 75,
    indicativeHomeLoanInterestRate: '9.00% - 9.50%',
    indicativePersonalLoanInterestRate: '13.50% - 15.50%',
    advisoryNote: 'Satisfactory credit rating. Minor interest rate surcharge may apply. Reduce credit card balance to improve score.',
  },
  {
    minScore: 630,
    maxScore: 679,
    bandLabel: 'FAIR',
    creditApprovalLikelihoodPercent: 50,
    indicativeHomeLoanInterestRate: '9.60% - 10.50%',
    indicativePersonalLoanInterestRate: '16.00% - 19.50%',
    advisoryNote: 'Sub-prime tier. Higher interest rates and stricter underwriting collateral requirements.',
  },
  {
    minScore: 300,
    maxScore: 629,
    bandLabel: 'POOR',
    creditApprovalLikelihoodPercent: 15,
    indicativeHomeLoanInterestRate: '11.00% - 14.00%',
    indicativePersonalLoanInterestRate: '20.00% - 28.00%',
    advisoryNote: 'High risk status due to past defaults, late payments, or high utilization. Focus on paying bills on time.',
  },
];
