import React, { useState, useEffect } from 'react';
import { Modal } from '../../ui/Modal';
import { Input } from '../../ui/Input';
import { Select } from '../../ui/Select';
import { Button } from '../../ui/Button';
import { ExpenseItem, ExpenseCategoryType, PaymentMethod, ExpenseStatus } from '../../../types/expense';
import { CategoryService } from '../../../services/categoryService';

export interface ExpenseFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (expense: Omit<ExpenseItem, 'id' | 'createdAt' | 'updatedAt'>) => void;
  initialData?: ExpenseItem | null;
}

export const ExpenseFormModal: React.FC<ExpenseFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState<ExpenseCategoryType>('Food');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Credit Card');
  const [description, setDescription] = useState('');
  const [merchant, setMerchant] = useState('');
  const [status, setStatus] = useState<ExpenseStatus>('COMPLETED');
  const [taxDeductible, setTaxDeductible] = useState(false);

  const activeCategories = CategoryService.getActive();

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setAmount(initialData.amount.toString());
      setDate(initialData.date);
      setCategory(initialData.category);
      setPaymentMethod(initialData.paymentMethod);
      setDescription(initialData.description || '');
      setMerchant(initialData.merchant || '');
      setStatus(initialData.status);
      setTaxDeductible(!!initialData.taxDeductible);
    } else {
      setTitle('');
      setAmount('');
      setDate(new Date().toISOString().split('T')[0]);
      setCategory('Food');
      setPaymentMethod('Credit Card');
      setDescription('');
      setMerchant('');
      setStatus('COMPLETED');
      setTaxDeductible(false);
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount) return;

    onSubmit({
      title,
      amount: parseFloat(amount),
      date,
      category,
      paymentMethod,
      description,
      merchant: merchant || undefined,
      status,
      taxDeductible,
    });
    onClose();
  };

  const categoryOptions = activeCategories.map((c) => ({
    label: c.name,
    value: c.name,
  }));

  const paymentOptions = [
    { label: 'Credit Card', value: 'Credit Card' },
    { label: 'UPI / GPay / PhonePe', value: 'UPI' },
    { label: 'Debit Card', value: 'Debit Card' },
    { label: 'Cash', value: 'Cash' },
    { label: 'Net Banking', value: 'Net Banking' },
    { label: 'Bank Transfer', value: 'Bank Transfer' },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Expense Record' : 'Record New Expense'}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Expense Title *"
          placeholder="e.g. Groceries at Supermart, Petrol Fill-up"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Amount (₹) *"
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min="0"
            step="any"
          />
          <Input
            label="Date *"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Category"
            value={category}
            options={categoryOptions}
            onChange={(e) => setCategory(e.target.value as ExpenseCategoryType)}
          />
          <Select
            label="Payment Method"
            value={paymentMethod}
            options={paymentOptions}
            onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
          />
        </div>

        <Input
          label="Merchant / Store Name"
          placeholder="e.g. FreshMart, Shell, Amazon"
          value={merchant}
          onChange={(e) => setMerchant(e.target.value)}
        />

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Description / Items List
          </label>
          <textarea
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 p-2.5 focus:ring-2 focus:ring-brand-500"
            rows={2}
            placeholder="Detailed notes..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 pt-1">
          <input
            type="checkbox"
            id="taxDeductible"
            checked={taxDeductible}
            onChange={(e) => setTaxDeductible(e.target.checked)}
            className="rounded border-slate-300 text-brand-600 focus:ring-brand-500"
          />
          <label htmlFor="taxDeductible" className="text-xs text-slate-700 dark:text-slate-300">
            Tax Deductible Expense (Business / Work related)
          </label>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {initialData ? 'Save Changes' : 'Record Expense'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
