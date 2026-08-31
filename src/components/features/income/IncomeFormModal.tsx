import React, { useState, useEffect } from 'react';
import { Modal } from '../../ui/Modal';
import { Input } from '../../ui/Input';
import { Select } from '../../ui/Select';
import { Button } from '../../ui/Button';
import { IncomeItem, IncomeCategoryType, IncomeFrequency, IncomeStatus } from '../../../types/income';

export interface IncomeFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (income: Omit<IncomeItem, 'id' | 'createdAt' | 'updatedAt'>) => void;
  initialData?: IncomeItem | null;
}

export const IncomeFormModal: React.FC<IncomeFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [source, setSource] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState<IncomeCategoryType>('Salary');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState<IncomeFrequency>('MONTHLY');
  const [status, setStatus] = useState<IncomeStatus>('RECEIVED');
  const [isRecurring, setIsRecurring] = useState(true);
  const [referenceNumber, setReferenceNumber] = useState('');

  useEffect(() => {
    if (initialData) {
      setSource(initialData.source);
      setAmount(initialData.amount.toString());
      setDate(initialData.date);
      setCategory(initialData.category);
      setDescription(initialData.description || '');
      setFrequency(initialData.frequency);
      setStatus(initialData.status);
      setIsRecurring(initialData.isRecurring);
      setReferenceNumber(initialData.referenceNumber || '');
    } else {
      setSource('');
      setAmount('');
      setDate(new Date().toISOString().split('T')[0]);
      setCategory('Salary');
      setDescription('');
      setFrequency('MONTHLY');
      setStatus('RECEIVED');
      setIsRecurring(true);
      setReferenceNumber('');
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!source || !amount) return;

    onSubmit({
      source,
      amount: parseFloat(amount),
      date,
      category,
      description,
      frequency,
      status,
      isRecurring,
      referenceNumber: referenceNumber || undefined,
    });
    onClose();
  };

  const categoryOptions = [
    { label: 'Salary', value: 'Salary' },
    { label: 'Freelance', value: 'Freelance' },
    { label: 'Business', value: 'Business' },
    { label: 'Bonus', value: 'Bonus' },
    { label: 'Investment', value: 'Investment' },
    { label: 'Gift', value: 'Gift' },
    { label: 'Refund', value: 'Refund' },
    { label: 'Other', value: 'Other' },
  ];

  const frequencyOptions = [
    { label: 'Monthly', value: 'MONTHLY' },
    { label: 'One Time', value: 'ONE_TIME' },
    { label: 'Weekly', value: 'WEEKLY' },
    { label: 'Quarterly', value: 'QUARTERLY' },
    { label: 'Yearly', value: 'YEARLY' },
  ];

  const statusOptions = [
    { label: 'Received', value: 'RECEIVED' },
    { label: 'Pending', value: 'PENDING' },
    { label: 'Scheduled', value: 'SCHEDULED' },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Income Record' : 'Add New Income'}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Income Source *"
          placeholder="e.g. Monthly Salary, Client Project"
          value={source}
          onChange={(e) => setSource(e.target.value)}
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
            label="Credit Date *"
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
            onChange={(e) => setCategory(e.target.value as IncomeCategoryType)}
          />
          <Select
            label="Frequency"
            value={frequency}
            options={frequencyOptions}
            onChange={(e) => setFrequency(e.target.value as IncomeFrequency)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Status"
            value={status}
            options={statusOptions}
            onChange={(e) => setStatus(e.target.value as IncomeStatus)}
          />
          <Input
            label="Ref / Inv #"
            placeholder="e.g. TXN-9981"
            value={referenceNumber}
            onChange={(e) => setReferenceNumber(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Description / Notes
          </label>
          <textarea
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 p-2.5 focus:ring-2 focus:ring-brand-500"
            rows={2}
            placeholder="Additional income notes..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {initialData ? 'Save Changes' : 'Add Income'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
