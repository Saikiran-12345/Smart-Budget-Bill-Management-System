import React, { useState } from 'react';
import { Card } from '../../ui/Card';
import { Input } from '../../ui/Input';
import { SIPTopupCalculator } from '../../../math/calculators/sipTopupCalculator';
import { formatCurrency } from '../../../math/formatters';
import { TrendingUp, Award } from 'lucide-react';

export const SIPTopupCalculatorWidget: React.FC = () => {
  const [initialSIP, setInitialSIP] = useState('10000');
  const [stepUpPercent, setStepUpPercent] = useState('10');
  const [expectedReturn, setExpectedReturn] = useState('12');
  const [years, setYears] = useState('10');

  const result = SIPTopupCalculator.calculateStepUpSIP(
    parseFloat(initialSIP) || 10000,
    parseFloat(stepUpPercent) || 10,
    parseFloat(expectedReturn) || 12,
    parseInt(years, 10) || 10
  );

  return (
    <Card title="Step-Up SIP Topup Wealth Calculator" subtitle="Annual percentage step-up compounding model">
      <div className="space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <Input label="Initial Monthly SIP (₹)" type="number" value={initialSIP} onChange={(e) => setInitialSIP(e.target.value)} />
          <Input label="Annual Step-Up (%)" type="number" value={stepUpPercent} onChange={(e) => setStepUpPercent(e.target.value)} />
          <Input label="Expected Return (% p.a.)" type="number" value={expectedReturn} onChange={(e) => setExpectedReturn(e.target.value)} />
          <Input label="Period (Years)" type="number" value={years} onChange={(e) => setYears(e.target.value)} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 text-xs">
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Total Principal Invested</span>
            <span className="text-xl font-extrabold text-slate-800 dark:text-slate-200">{formatCurrency(result.totalInvested)}</span>
          </div>
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Estimated Wealth Gain</span>
            <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">{formatCurrency(result.totalGain)}</span>
          </div>
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Final Maturity Corpus</span>
            <span className="text-xl font-extrabold text-purple-700 dark:text-purple-300">{formatCurrency(result.finalCorpus)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
