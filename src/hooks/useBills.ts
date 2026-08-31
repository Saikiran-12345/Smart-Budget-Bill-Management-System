import { useApp } from '../context/AppContext';
import { BillService } from '../services/billService';
import { PaymentService } from '../services/paymentService';
import { ActivityLogService } from '../services/activityLogService';
import { BillItem } from '../types/bill';
import { PaymentMethod } from '../types/expense';
import {
  calculateTotalBillsAmount,
  getUpcomingBillsWithinDays,
  getOverdueBills,
  calculateOverdueLatePenalties,
  calculateBillPaymentCompletionRate,
} from '../math/billMath';

export function useBills() {
  const { bills, payments, refreshAllData } = useApp();

  const addBill = (billData: Omit<BillItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    const created = BillService.add(billData);
    ActivityLogService.logAction('CREATE_BILL', 'Bill Management', `Added bill "${created.billName}" (₹${created.amount}).`);
    refreshAllData();
    return created;
  };

  const updateBill = (id: string, updates: Partial<BillItem>) => {
    const updated = BillService.update(id, updates);
    if (updated) {
      ActivityLogService.logAction('UPDATE_BILL', 'Bill Management', `Updated bill "${updated.billName}".`);
      refreshAllData();
    }
    return updated;
  };

  const deleteBill = (id: string) => {
    const success = BillService.delete(id);
    if (success) {
      ActivityLogService.logAction('DELETE_BILL', 'Bill Management', `Deleted bill record.`);
      refreshAllData();
    }
    return success;
  };

  const payBill = (
    billId: string,
    amountPaid: number,
    paymentMethod: PaymentMethod,
    transactionReference: string,
    notes?: string
  ) => {
    const bill = BillService.getById(billId);
    if (!bill) throw new Error('Bill not found');

    const result = PaymentService.recordPayment({
      billId,
      billName: bill.billName,
      amountPaid,
      paymentDate: new Date().toISOString().split('T')[0],
      dueDate: bill.dueDate,
      paymentMethod,
      transactionReference,
      status: 'SUCCESSFUL',
      notes,
    });

    ActivityLogService.logAction('PAY_BILL', 'Bill Payments', `Paid bill "${bill.billName}" (₹${amountPaid}).`);
    refreshAllData();
    return result;
  };

  const totalBillsAmount = calculateTotalBillsAmount(bills);
  const upcomingBills = getUpcomingBillsWithinDays(bills, 7);
  const overdueBills = getOverdueBills(bills);
  const overduePenalties = calculateOverdueLatePenalties(bills);
  const completionRate = calculateBillPaymentCompletionRate(bills);

  return {
    bills,
    payments,
    totalBillsAmount,
    upcomingBills,
    overdueBills,
    overduePenalties,
    completionRate,
    addBill,
    updateBill,
    deleteBill,
    payBill,
    refreshBills: refreshAllData,
  };
}
