import React, { useState, useEffect } from 'react';
import { Modal } from '../../ui/Modal';
import { Input } from '../../ui/Input';
import { Select } from '../../ui/Select';
import { Button } from '../../ui/Button';
import { BillItem, BillFrequency, BillStatus } from '../../../types/bill';

export interface BillFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (bill: Omit<BillItem, 'id' | 'createdAt' | 'updatedAt'>) => void;
  initialData?: BillItem | null;
}

export const BillFormModal: React.FC<BillFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [billName, setBillName] = useState('');
  const [billerName, setBillerName] = useState('');
  const [category, setCategory] = useState('Utilities');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [frequency, setFrequency] = useState<BillFrequency>('MONTHLY');
  const [status, setStatus] = useState<BillStatus>('UPCOMING');
  const [autoPay, setAutoPay] = useState(false);
  const [accountNumber, setAccountNumber] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (initialData) {
      setBillName(initialData.billName);
      setBillerName(initialData.billerName);
      setCategory(initialData.category);
      setAmount(initialData.amount.toString());
      setDueDate(initialData.dueDate);
      setFrequency(initialData.frequency);
      setStatus(initialData.status);
      setAutoPay(initialData.autoPay);
      setAccountNumber(initialData.accountNumber || '');
      setNotes(initialData.notes || '');
    } else {
      setBillName('');
      setBillerName('');
      setCategory('Utilities');
      setAmount('');
      setDueDate(new Date().toISOString().split('T')[0]);
      setFrequency('MONTHLY');
      setStatus('UPCOMING');
      setAutoPay(false);
      setAccountNumber('');
      setNotes('');
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!billName || !amount || !dueDate) return;

    onSubmit({
      billName,
      billerName: billerName || billName,
      category,
      amount: parseFloat(amount),
      dueDate,
      frequency,
      status,
      autoPay,
      accountNumber: accountNumber || undefined,
      reminderDaysBefore: 5,
      notes: notes || undefined,
    });
    onClose();
  };

  const frequencyOptions = [
    { label: 'Monthly', value: 'MONTHLY' },
    { label: 'One Time', value: 'ONE_TIME' },
    { label: 'Quarterly', value: 'QUARTERLY' },
    { label: 'Yearly', value: 'YEARLY' },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Bill Reminder' : 'Add New Bill'}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Bill Name *"
          placeholder="e.g. Broadband Wifi, Rent, Electricity"
          value={billName}
          onChange={(e) => setBillName(e.target.value)}
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Biller / Vendor"
            placeholder="e.g. Airtel, State Power"
            value={billerName}
            onChange={(e) => setBillerName(e.target.value)}
          />
          <Input
            label="Account / Consumer ID"
            placeholder="e.g. ACC-99120"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Bill Amount (₹) *"
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min="0"
            step="any"
          />
          <Input
            label="Due Date *"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Frequency"
            value={frequency}
            options={frequencyOptions}
            onChange={(e) => setFrequency(e.target.value as BillFrequency)}
          />
          <Input
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Utilities, Rent..."
          />
        </div>

        <div className="flex items-center gap-2 pt-1">
          <input
            type="checkbox"
            id="autoPay"
            checked={autoPay}
            onChange={(e) => setAutoPay(e.target.checked)}
            className="rounded border-slate-300 text-brand-600 focus:ring-brand-500"
          />
          <label htmlFor="autoPay" className="text-xs text-slate-700 dark:text-slate-300">
            Auto-Pay Enabled (Automatic bank debit)
          </label>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {initialData ? 'Save Changes' : 'Schedule Bill'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
