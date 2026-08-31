import React, { useState } from 'react';
import { Modal } from '../../ui/Modal';
import { Input } from '../../ui/Input';
import { Select } from '../../ui/Select';
import { Button } from '../../ui/Button';
import { BillItem } from '../../../types/bill';
import { PaymentMethod } from '../../../types/expense';
import { formatCurrency } from '../../../math/formatters';

export interface BillPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  bill: BillItem | null;
  onPay: (
    billId: string,
    amountPaid: number,
    paymentMethod: PaymentMethod,
    transactionReference: string,
    notes?: string
  ) => void;
}

export const BillPaymentModal: React.FC<BillPaymentModalProps> = ({
  isOpen,
  onClose,
  bill,
  onPay,
}) => {
  if (!bill) return null;

  const [amountPaid, setAmountPaid] = useState(bill.amount.toString());
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Net Banking');
  const [transactionReference, setTransactionReference] = useState(
    `TXN-${Math.floor(100000 + Math.random() * 900000)}`
  );
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amountPaid || !transactionReference) return;

    onPay(
      bill.id,
      parseFloat(amountPaid),
      paymentMethod,
      transactionReference,
      notes || undefined
    );
    onClose();
  };

  const paymentOptions = [
    { label: 'Net Banking', value: 'Net Banking' },
    { label: 'UPI (GPay / PhonePe / Paytm)', value: 'UPI' },
    { label: 'Credit Card', value: 'Credit Card' },
    { label: 'Debit Card', value: 'Debit Card' },
    { label: 'Cash', value: 'Cash' },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Pay Bill: ${bill.billName}`} size="md">
      <div className="mb-4 rounded-lg bg-amber-50 dark:bg-amber-950/30 p-3 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-300">
        <div className="flex justify-between font-semibold">
          <span>Biller: {bill.billerName}</span>
          <span>Due Date: {bill.dueDate}</span>
        </div>
        <div className="mt-1">
          Total Due: <span className="font-bold text-sm">{formatCurrency(bill.amount)}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Payment Amount (₹) *"
          type="number"
          value={amountPaid}
          onChange={(e) => setAmountPaid(e.target.value)}
          required
          min="1"
          step="any"
        />

        <Select
          label="Payment Method"
          value={paymentMethod}
          options={paymentOptions}
          onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
        />

        <Input
          label="Transaction Ref / UTR #"
          placeholder="e.g. UTR-998120"
          value={transactionReference}
          onChange={(e) => setTransactionReference(e.target.value)}
          required
        />

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Payment Notes
          </label>
          <textarea
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 p-2 focus:ring-2 focus:ring-brand-500"
            rows={2}
            placeholder="Payment confirmation notes..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="success" type="submit">
            Confirm & Record Payment
          </Button>
        </div>
      </form>
    </Modal>
  );
};
