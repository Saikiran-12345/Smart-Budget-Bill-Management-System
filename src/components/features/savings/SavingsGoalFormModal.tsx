import React, { useState, useEffect } from 'react';
import { Modal } from '../../ui/Modal';
import { Input } from '../../ui/Input';
import { Select } from '../../ui/Select';
import { Button } from '../../ui/Button';
import { SavingsGoal, SavingsPriority } from '../../../types/savings';

export interface SavingsGoalFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (goal: Omit<SavingsGoal, 'id' | 'currentAmount' | 'status' | 'createdAt' | 'updatedAt'>) => void;
  initialData?: SavingsGoal | null;
}

export const SavingsGoalFormModal: React.FC<SavingsGoalFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [goalName, setGoalName] = useState('');
  const [category, setCategory] = useState('General Savings');
  const [targetAmount, setTargetAmount] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [targetDate, setTargetDate] = useState('');
  const [priority, setPriority] = useState<SavingsPriority>('HIGH');
  const [monthlyTargetContribution, setMonthlyTargetContribution] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (initialData) {
      setGoalName(initialData.goalName);
      setCategory(initialData.category);
      setTargetAmount(initialData.targetAmount.toString());
      setStartDate(initialData.startDate);
      setTargetDate(initialData.targetDate);
      setPriority(initialData.priority);
      setMonthlyTargetContribution(initialData.monthlyTargetContribution.toString());
      setNotes(initialData.notes || '');
    } else {
      setGoalName('');
      setCategory('General Savings');
      setTargetAmount('');
      setStartDate(new Date().toISOString().split('T')[0]);

      const futureDate = new Date();
      futureDate.setMonth(futureDate.getMonth() + 12);
      setTargetDate(futureDate.toISOString().split('T')[0]);
      setPriority('HIGH');
      setMonthlyTargetContribution('');
      setNotes('');
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goalName || !targetAmount || !targetDate) return;

    onSubmit({
      goalName,
      category,
      targetAmount: parseFloat(targetAmount),
      startDate,
      targetDate,
      priority,
      monthlyTargetContribution: monthlyTargetContribution ? parseFloat(monthlyTargetContribution) : Math.ceil(parseFloat(targetAmount) / 12),
      notes: notes || undefined,
    });
    onClose();
  };

  const priorityOptions = [
    { label: 'High Priority', value: 'HIGH' },
    { label: 'Medium Priority', value: 'MEDIUM' },
    { label: 'Low Priority', value: 'LOW' },
    { label: 'Urgent', value: 'URGENT' },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Savings Goal' : 'Create New Savings Goal'}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Goal Name *"
          placeholder="e.g. New Laptop, Emergency Fund, House Downpayment"
          value={goalName}
          onChange={(e) => setGoalName(e.target.value)}
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Target Amount (₹) *"
            type="number"
            placeholder="0.00"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            required
            min="1"
          />
          <Input
            label="Target Date *"
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Gadgets, Travel, Investments..."
          />
          <Select
            label="Priority"
            value={priority}
            options={priorityOptions}
            onChange={(e) => setPriority(e.target.value as SavingsPriority)}
          />
        </div>

        <Input
          label="Monthly Target Deposit (₹)"
          type="number"
          placeholder="Auto-calculated"
          value={monthlyTargetContribution}
          onChange={(e) => setMonthlyTargetContribution(e.target.value)}
        />

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Goal Notes & Milestones
          </label>
          <textarea
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 p-2 focus:ring-2 focus:ring-brand-500"
            rows={2}
            placeholder="Notes on how you plan to achieve this goal..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {initialData ? 'Save Goal' : 'Start Goal'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
