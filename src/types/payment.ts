import { PaymentMethod } from './expense';

export type PaymentStatus = 'SUCCESSFUL' | 'PENDING' | 'FAILED' | 'REFUNDED';

export interface BillPayment {
  id: string;
  billId: string;
  billName: string;
  amountPaid: number;
  paymentDate: string;
  dueDate: string;
  paymentMethod: PaymentMethod;
  transactionReference: string;
  status: PaymentStatus;
  notes?: string;
  lateFeeApplied?: number;
  discountApplied?: number;
  createdAt: string;
}

export interface PaymentFilterOptions {
  searchQuery?: string;
  billId?: string;
  paymentMethod?: PaymentMethod | 'ALL';
  status?: PaymentStatus | 'ALL';
  startDate?: string;
  endDate?: string;
  sortBy?: 'paymentDate' | 'amountPaid' | 'billName';
  sortOrder?: 'asc' | 'desc';
}
