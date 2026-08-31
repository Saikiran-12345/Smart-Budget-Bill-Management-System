import React, { useState, useEffect } from 'react';
import { Modal } from '../../ui/Modal';
import { Input } from '../../ui/Input';
import { Select } from '../../ui/Select';
import { Button } from '../../ui/Button';
import { BudgetItem, BudgetPeriod } from '../../../types/budget';
import { CategoryService } from '../../../services/categoryService';

export interface BudgetFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (budget: Omit<BudgetItem, 'id' | 'spentAmount' | 'createdAt' | 'updatedAt'>) => void;
  initialData?: BudgetItem | null;
}

export const BudgetFormModal: React.FC<BudgetFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [budgetName, setBudgetName] = useState('');
  const [category, setCategory] = useState('Food');
  const [allocatedAmount, setAllocatedAmount] = useState('');
  const [period, setPeriod] = useState<BudgetPeriod>('MONTHLY');
  const [alertThresholdPercent, setAlertThresholdPercent] = useState('80');
  const [notes, setNotes] = useState('');

  const categories = CategoryService.getActive();

  useEffect(() => {
    if (initialData) {
      setBudgetName(initialData.budgetName);
      setCategory(initialData.category);
      setAllocatedAmount(initialData.allocatedAmount.toString());
      setPeriod(initialData.period);
      setAlertThresholdPercent(initialData.alertThresholdPercent.toString());
      setNotes(initialData.notes || '');
    } else {
      setBudgetName('');
      setCategory('Food');
      setAllocatedAmount('');
      setPeriod('MONTHLY');
      setAlertThresholdPercent('80');
      setNotes('');
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!budgetName || !allocatedAmount) return;

    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    const monthStr = String(month).padStart(2, '0');
    const startDate = `${year}-${monthStr}-01`;
    const endDate = `${year}-${monthStr}-31`;

    onSubmit({
      budgetName,
      category,
      allocatedAmount: parseFloat(allocatedAmount),
      period,
      month,
      year,
      startDate,
      endDate,
      rolloverUnused: false,
      alertThresholdPercent: parseInt(alertThresholdPercent, 10),
      notes: notes || undefined,
    });
    onClose();
  };

  const categoryOptions = categories.map((c) => ({
    label: c.name,
    value: c.name,
  }));

  const periodOptions = [
    { label: 'Monthly Budget', value: 'MONTHLY' },
    { label: 'Quarterly Budget', value: 'QUARTERLY' },
    { label: 'Yearly Budget', value: 'YEARLY' },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Budget Limit' : 'Create Budget Allocation'}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Budget Name *"
          placeholder="e.g. August Groceries Budget, Housing Cap"
          value={budgetName}
          onChange={(e) => setBudgetName(e.target.value)}
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Category"
            value={category}
            options={categoryOptions}
            onChange={(e) => setCategory(e.target.value)}
          />
          <Input
            label="Allocated Budget (₹) *"
            type="number"
            placeholder="0.00"
            value={allocatedAmount}
            onChange={(e) => setAllocatedAmount(e.target.value)}
            required
            min="1"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Period"
            value={period}
            options={periodOptions}
            onChange={(e) => setPeriod(e.target.value as BudgetPeriod)}
          />
          <Input
            label="Alert Warning Threshold (%)"
            type="number"
            value={alertThresholdPercent}
            onChange={(e) => setAlertThresholdPercent(e.target.value)}
            min="10"
            max="100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Budget Notes
          </label>
          <textarea
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 p-2 focus:ring-2 focus:ring-brand-500"
            rows={2}
            placeholder="Budgeting objective..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {initialData ? 'Save Budget' : 'Set Budget'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
