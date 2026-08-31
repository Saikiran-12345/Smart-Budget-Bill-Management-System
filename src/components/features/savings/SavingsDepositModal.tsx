import React, { useState } from 'react';
import { Modal } from '../../ui/Modal';
import { Input } from '../../ui/Input';
import { Select } from '../../ui/Select';
import { Button } from '../../ui/Button';
import { SavingsGoal } from '../../../types/savings';
import { formatCurrency } from '../../../math/formatters';

export interface SavingsDepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  goal: SavingsGoal | null;
  onDeposit: (goalId: string, amount: number, type: 'DEPOSIT' | 'WITHDRAWAL', note?: string) => void;
}

export const SavingsDepositModal: React.FC<SavingsDepositModalProps> = ({
  isOpen,
  onClose,
  goal,
  onDeposit,
}) => {
  if (!goal) return null;

  const [amount, setAmount] = useState(goal.monthlyTargetContribution.toString() || '5000');
  const [type, setType] = useState<'DEPOSIT' | 'WITHDRAWAL'>('DEPOSIT');
  const [note, setNote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;

    onDeposit(goal.id, parseFloat(amount), type, note || undefined);
    onClose();
  };

  const typeOptions = [
    { label: 'Deposit (+) Add Funds', value: 'DEPOSIT' },
    { label: 'Withdrawal (-) Release Funds', value: 'WITHDRAWAL' },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Contribute to Goal: ${goal.goalName}`} size="md">
      <div className="mb-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 p-3 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300">
        <div className="flex justify-between font-semibold">
          <span>Target: {formatCurrency(goal.targetAmount)}</span>
          <span>Saved: {formatCurrency(goal.currentAmount)}</span>
        </div>
        <div className="mt-1">
          Remaining Needed: <span className="font-bold">{formatCurrency(Math.max(0, goal.targetAmount - goal.currentAmount))}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Select
          label="Transaction Type"
          value={type}
          options={typeOptions}
          onChange={(e) => setType(e.target.value as 'DEPOSIT' | 'WITHDRAWAL')}
        />

        <Input
          label="Amount (₹) *"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          min="1"
          step="any"
        />

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Note / Source of Funds
          </label>
          <input
            type="text"
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 p-2 focus:ring-2 focus:ring-brand-500"
            placeholder="e.g. Added from August bonus"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant={type === 'DEPOSIT' ? 'success' : 'danger'} type="submit">
            {type === 'DEPOSIT' ? 'Add Deposit' : 'Confirm Withdrawal'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
