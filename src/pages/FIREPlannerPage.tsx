import React, { useState } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Slider } from '../components/ui/Slider';
import { FIRERetirementEngine } from '../math/calculators/fireRetirementEngine';
import { formatCurrency } from '../math/formatters';
import { Flame, CheckCircle2, AlertTriangle, TrendingUp, DollarSign } from 'lucide-react';

export const FIREPlannerPage: React.FC = () => {
  const [currentAge, setCurrentAge] = useState(32);
  const [targetAge, setTargetAge] = useState(55);
  const [annualExpenses, setAnnualExpenses] = useState(720000);
  const [currentSavings, setCurrentSavings] = useState(1200000);
  const [expectedReturn, setExpectedReturn] = useState(11);
  const [inflationRate, setInflationRate] = useState(6);

  const fire = FIRERetirementEngine.calculateFIRE(
    currentAge,
    targetAge,
    annualExpenses,
    currentSavings,
    expectedReturn,
    inflationRate,
    4
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="FIRE Retirement Planner"
        description="Financial Independence, Retire Early (FIRE) calculator powered by 4% Safe Withdrawal Rule."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Retirement Parameters" subtitle="Adjust your personal horizon">
          <div className="space-y-4">
            <Slider
              label="Current Age"
              min={18}
              max={65}
              value={currentAge}
              onChange={setCurrentAge}
              formatValue={(v) => `${v} Yrs`}
            />
            <Slider
              label="Target Retirement Age"
              min={currentAge + 1}
              max={75}
              value={targetAge}
              onChange={setTargetAge}
              formatValue={(v) => `${v} Yrs`}
            />
            <Input
              label="Annual Living Expenses (₹)"
              type="number"
              value={annualExpenses}
              onChange={(e) => setAnnualExpenses(Number(e.target.value))}
            />
            <Input
              label="Current Retirement Corpus (₹)"
              type="number"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(Number(e.target.value))}
            />
            <Slider
              label="Expected Return Rate"
              min={6}
              max={15}
              step={0.5}
              value={expectedReturn}
              onChange={setExpectedReturn}
              formatValue={(v) => `${v}% p.a.`}
            />
            <Slider
              label="Annual Inflation Rate"
              min={3}
              max={10}
              step={0.5}
              value={inflationRate}
              onChange={setInflationRate}
              formatValue={(v) => `${v}% p.a.`}
            />
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span className="text-xs font-semibold text-slate-400 block uppercase">Lean FIRE Target</span>
              <span className="text-xl font-bold text-slate-700 dark:text-slate-300">{formatCurrency(fire.leanFIRETargetCorpus)}</span>
              <span className="text-[10px] text-slate-400 block">75% Essential Expenses</span>
            </div>

            <div className="p-4 rounded-xl border-2 border-brand-500 bg-brand-50/50 dark:bg-brand-950/20">
              <span className="text-xs font-semibold text-brand-600 dark:text-brand-400 block uppercase">Regular FIRE Target</span>
              <span className="text-2xl font-extrabold text-brand-700 dark:text-brand-300">{formatCurrency(fire.regularFIRETargetCorpus)}</span>
              <span className="text-[10px] text-brand-600 dark:text-brand-400 block font-semibold">100% Standard Expenses</span>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span className="text-xs font-semibold text-slate-400 block uppercase">Fat FIRE Target</span>
              <span className="text-xl font-bold text-purple-700 dark:text-purple-300">{formatCurrency(fire.fatFIRETargetCorpus)}</span>
              <span className="text-[10px] text-slate-400 block">150% Luxury Expenses</span>
            </div>
          </div>

          <Card title="FIRE Projections & Action Plan" subtitle="Monthly contribution requirement">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs">
                <div>
                  <span className="text-slate-400 block">Required Monthly Investment</span>
                  <span className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                    {formatCurrency(fire.monthlySavingsNeeded)}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Projected Corpus at Age {targetAge}</span>
                  <span className="text-lg font-bold text-slate-800 dark:text-slate-200">
                    {formatCurrency(fire.projectedCorpusAtRetirementAge)}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                <h4 className="font-bold text-slate-800 dark:text-slate-200">FIRE Key Takeaways:</h4>
                <div className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>
                    You have <span className="font-bold text-slate-900 dark:text-slate-100">{fire.yearsToFIRE} years</span> remaining until your target age of {targetAge}.
                  </span>
                </div>
                <div className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>
                    Assuming a 4% safe withdrawal rate, your annual inflation-adjusted retirement corpus will sustain your living costs indefinitely.
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
