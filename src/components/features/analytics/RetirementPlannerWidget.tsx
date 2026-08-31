import React, { useState } from 'react';
import { Card } from '../../ui/Card';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { RetirementPlanner } from '../../../math/retirementPlanner';
import { formatCurrency } from '../../../math/formatters';
import { Flame, CheckCircle2, AlertTriangle } from 'lucide-react';

export const RetirementPlannerWidget: React.FC = () => {
  const [currentAge, setCurrentAge] = useState('30');
  const [targetAge, setTargetAge] = useState('55');
  const [annualExpense, setAnnualExpense] = useState('600000');
  const [currentSavings, setCurrentSavings] = useState('500000');

  const plan = RetirementPlanner.calculateFIREPlan(
    parseInt(currentAge, 10) || 30,
    parseInt(targetAge, 10) || 55,
    parseFloat(annualExpense) || 600000,
    parseFloat(currentSavings) || 500000
  );

  return (
    <Card title="FIRE Retirement Planner (Financial Independence)" subtitle="4% Safe Withdrawal Rule & Target Corpus Calculator">
      <div className="space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <Input label="Current Age" type="number" value={currentAge} onChange={(e) => setCurrentAge(e.target.value)} />
          <Input label="Target FIRE Age" type="number" value={targetAge} onChange={(e) => setTargetAge(e.target.value)} />
          <Input label="Annual Living Cost (₹)" type="number" value={annualExpense} onChange={(e) => setAnnualExpense(e.target.value)} />
          <Input label="Current Retirement Fund (₹)" type="number" value={currentSavings} onChange={(e) => setCurrentSavings(e.target.value)} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 text-xs">
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Required FIRE Corpus</span>
            <span className="text-xl font-extrabold text-purple-700 dark:text-purple-300">{formatCurrency(plan.fireNumberTarget)}</span>
          </div>
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Monthly Deposit Needed</span>
            <span className="text-xl font-extrabold text-brand-600 dark:text-brand-400">{formatCurrency(plan.monthlySavingsRequired)}</span>
          </div>
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Projected Corpus at {targetAge}</span>
            <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">{formatCurrency(plan.projectedCorpusAtRetirement)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
