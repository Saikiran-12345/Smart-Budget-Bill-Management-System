export type LoanType = 'HOME_LOAN' | 'CAR_LOAN' | 'PERSONAL_LOAN' | 'EDUCATION_LOAN' | 'CREDIT_CARD_DEBT' | 'OTHER';

export interface LoanRecord {
  id: string;
  loanName: string;
  lenderName: string;
  loanType: LoanType;
  principalAmount: number;
  outstandingBalance: number;
  annualInterestRate: number; // e.g. 8.5%
  tenureMonths: number;
  monthlyEMI: number;
  startDate: string;
  endDate: string;
  accountNumber?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoanPaymentLog {
  id: string;
  loanId: string;
  amountPaid: number;
  paymentDate: string;
  principalComponent: number;
  interestComponent: number;
  paymentMethod: string;
  transactionReference: string;
}
