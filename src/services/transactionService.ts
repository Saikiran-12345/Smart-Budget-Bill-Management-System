import { UnifiedTransaction, TransactionFilterOptions } from '../types/transaction';
import { IncomeService } from './incomeService';
import { ExpenseService } from './expenseService';
import { PaymentService } from './paymentService';
import { SavingsService } from './savingsService';

export class TransactionService {
  public static getUnifiedTransactions(): UnifiedTransaction[] {
    const incomes = IncomeService.getAll();
    const expenses = ExpenseService.getAll();
    const payments = PaymentService.getAll();
    const savingsTxns = SavingsService.getAllTransactions();

    const incomeTxns: UnifiedTransaction[] = incomes.map((inc) => ({
      id: `txn_inc_${inc.id}`,
      sourceId: inc.id,
      type: 'INCOME',
      title: inc.source,
      amount: inc.amount,
      date: inc.date,
      category: inc.category,
      paymentMethod: 'Bank Transfer',
      status: inc.status,
      description: inc.description,
      referenceNumber: inc.referenceNumber,
      createdAt: inc.createdAt,
    }));

    const expenseTxns: UnifiedTransaction[] = expenses.map((exp) => ({
      id: `txn_exp_${exp.id}`,
      sourceId: exp.id,
      type: 'EXPENSE',
      title: exp.title,
      amount: exp.amount,
      date: exp.date,
      category: exp.category,
      paymentMethod: exp.paymentMethod,
      status: exp.status,
      description: exp.description,
      merchantOrBiller: exp.merchant,
      createdAt: exp.createdAt,
    }));

    const paymentTxns: UnifiedTransaction[] = payments.map((pay) => ({
      id: `txn_pay_${pay.id}`,
      sourceId: pay.id,
      type: 'BILL_PAYMENT',
      title: `Bill Payment: ${pay.billName}`,
      amount: pay.amountPaid,
      date: pay.paymentDate,
      category: 'Bill Payment',
      paymentMethod: pay.paymentMethod,
      status: pay.status,
      description: `Payment for bill ${pay.billName}`,
      referenceNumber: pay.transactionReference,
      createdAt: pay.createdAt,
    }));

    const savingsTxnsUnified: UnifiedTransaction[] = savingsTxns.map((s) => ({
      id: `txn_sav_${s.id}`,
      sourceId: s.id,
      type: s.type === 'DEPOSIT' ? 'SAVINGS_DEPOSIT' : 'SAVINGS_WITHDRAWAL',
      title: `${s.type === 'DEPOSIT' ? 'Savings Deposit' : 'Savings Withdrawal'}: ${s.goalName}`,
      amount: s.amount,
      date: s.date,
      category: 'Savings Goal',
      paymentMethod: 'Internal Transfer',
      status: 'COMPLETED',
      description: s.note || `Savings transaction for goal ${s.goalName}`,
      createdAt: s.createdAt,
    }));

    const combined = [...incomeTxns, ...expenseTxns, ...paymentTxns, ...savingsTxnsUnified];

    // Sort descending by date
    combined.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return combined;
  }

  public static filterTransactions(
    transactions: UnifiedTransaction[],
    options: TransactionFilterOptions
  ): UnifiedTransaction[] {
    let result = [...transactions];

    if (options.searchQuery && options.searchQuery.trim() !== '') {
      const q = options.searchQuery.toLowerCase().trim();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          (t.merchantOrBiller && t.merchantOrBiller.toLowerCase().includes(q)) ||
          (t.referenceNumber && t.referenceNumber.toLowerCase().includes(q))
      );
    }

    if (options.type && options.type !== 'ALL') {
      result = result.filter((t) => t.type === options.type);
    }

    if (options.category && options.category !== 'ALL') {
      result = result.filter((t) => t.category.toLowerCase() === options.category!.toLowerCase());
    }

    if (options.startDate) {
      result = result.filter((t) => t.date >= options.startDate!);
    }

    if (options.endDate) {
      result = result.filter((t) => t.date <= options.endDate!);
    }

    if (options.minAmount !== undefined) {
      result = result.filter((t) => t.amount >= options.minAmount!);
    }

    if (options.maxAmount !== undefined) {
      result = result.filter((t) => t.amount <= options.maxAmount!);
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
