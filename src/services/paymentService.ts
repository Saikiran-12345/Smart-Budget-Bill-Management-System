import { BillPayment, PaymentFilterOptions } from '../types/payment';
import { INITIAL_DEMO_PAYMENTS } from '../constants/initialDemoData';
import { StorageService } from './storageService';
import { BillService } from './billService';
import { ExpenseService } from './expenseService';

const STORAGE_KEY = 'bill_payments_list';

export class PaymentService {
  public static getAll(): BillPayment[] {
    return StorageService.getItem<BillPayment[]>(STORAGE_KEY, INITIAL_DEMO_PAYMENTS);
  }

  public static recordPayment(
    paymentData: Omit<BillPayment, 'id' | 'createdAt'>
  ): { payment: BillPayment; updatedBill: any } {
    const payments = this.getAll();
    const now = new Date().toISOString();
    const newPayment: BillPayment = {
      ...paymentData,
      id: `pay_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      createdAt: now,
    };

    // 1. Save payment record
    const updatedPayments = [newPayment, ...payments];
    StorageService.setItem(STORAGE_KEY, updatedPayments);

    // 2. Mark bill as PAID and record last paid date
    const updatedBill = BillService.update(paymentData.billId, {
      status: 'PAID',
      lastPaidDate: paymentData.paymentDate,
    });

    // 3. Automatically mirror bill payment as an expense in Expense Ledger
    if (updatedBill) {
      ExpenseService.add({
        title: `Bill Payment: ${updatedBill.billName}`,
        amount: paymentData.amountPaid,
        date: paymentData.paymentDate,
        category: (updatedBill.category as any) || 'Utilities',
        paymentMethod: paymentData.paymentMethod,
        description: `Automated bill payment for ${updatedBill.billerName}. Ref: ${paymentData.transactionReference}`,
        merchant: updatedBill.billerName,
        status: 'COMPLETED',
        tags: ['bill-payment', updatedBill.category.toLowerCase()],
      });
    }

    return { payment: newPayment, updatedBill };
  }

  public static deletePayment(paymentId: string): boolean {
    const payments = this.getAll();
    const target = payments.find((p) => p.id === paymentId);
    if (!target) return false;

    const filtered = payments.filter((p) => p.id !== paymentId);
    StorageService.setItem(STORAGE_KEY, filtered);

    // Revert bill status to PENDING or UPCOMING
    BillService.update(target.billId, { status: 'PENDING' });
    return true;
  }

  public static filterPayments(payments: BillPayment[], options: PaymentFilterOptions): BillPayment[] {
    let result = [...payments];

    if (options.searchQuery && options.searchQuery.trim() !== '') {
      const q = options.searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.billName.toLowerCase().includes(q) ||
          p.transactionReference.toLowerCase().includes(q) ||
          (p.notes && p.notes.toLowerCase().includes(q))
      );
    }

    if (options.billId) {
      result = result.filter((p) => p.billId === options.billId);
    }

    if (options.paymentMethod && options.paymentMethod !== 'ALL') {
      result = result.filter((p) => p.paymentMethod === options.paymentMethod);
    }

    if (options.status && options.status !== 'ALL') {
      result = result.filter((p) => p.status === options.status);
    }

    if (options.startDate) {
      result = result.filter((p) => p.paymentDate >= options.startDate!);
    }

    if (options.endDate) {
      result = result.filter((p) => p.paymentDate <= options.endDate!);
    }

    if (options.sortBy) {
      const field = options.sortBy;
      const isDesc = options.sortOrder === 'desc';
      result.sort((a, b) => {
        let valA = a[field] ?? '';
        let valB = b[field] ?? '';
        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();

        if (valA < valB) return isDesc ? 1 : -1;
        if (valA > valB) return isDesc ? -1 : 1;
        return 0;
      });
    }

    return result;
  }
}
