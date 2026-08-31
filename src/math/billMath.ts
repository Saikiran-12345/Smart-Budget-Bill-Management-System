import { BillItem, BillStatus } from '../types/bill';
import { BillPayment } from '../types/payment';
import { getDaysDifference, isDateInPast } from './dateUtils';

export const calculateTotalBillsAmount = (bills: BillItem[]): number => {
  return bills.reduce((sum, b) => sum + (b.amount || 0), 0);
};

export const filterBillsByStatus = (bills: BillItem[], status: BillStatus): BillItem[] => {
  return bills.filter((b) => b.status === status);
};

export const getUpcomingBillsWithinDays = (bills: BillItem[], days: number): BillItem[] => {
  const todayStr = new Date().toISOString().split('T')[0];
  return bills.filter((b) => {
    if (b.status === 'PAID' || b.status === 'CANCELLED') return false;
    const diff = getDaysDifference(todayStr, b.dueDate);
    return diff >= 0 && diff <= days;
  });
};

export const getOverdueBills = (bills: BillItem[]): BillItem[] => {
  return bills.filter((b) => {
    if (b.status === 'PAID' || b.status === 'CANCELLED') return false;
    return isDateInPast(b.dueDate) || b.status === 'OVERDUE';
  });
};

export const calculateOverdueLatePenalties = (bills: BillItem[]): number => {
  const overdue = getOverdueBills(bills);
  return overdue.reduce((total, b) => {
    const lateFeePct = b.lateFeePercentage || 0;
    const penalty = (b.amount * lateFeePct) / 100;
    return total + penalty;
  }, 0);
};

export const calculateBillPaymentCompletionRate = (bills: BillItem[]): {
  totalCount: number;
  paidCount: number;
  pendingCount: number;
  overdueCount: number;
  completionPercentage: number;
} => {
  const totalCount = bills.length;
  if (totalCount === 0) {
    return { totalCount: 0, paidCount: 0, pendingCount: 0, overdueCount: 0, completionPercentage: 0 };
  }

  const paidCount = bills.filter((b) => b.status === 'PAID').length;
  const overdueCount = getOverdueBills(bills).length;
  const pendingCount = totalCount - paidCount - overdueCount;

  return {
    totalCount,
    paidCount,
    pendingCount,
    overdueCount,
    completionPercentage: (paidCount / totalCount) * 100,
  };
};

export const calculateTotalPaymentsMade = (payments: BillPayment[]): number => {
  return payments
    .filter((p) => p.status === 'SUCCESSFUL')
    .reduce((sum, p) => sum + p.amountPaid, 0);
};
