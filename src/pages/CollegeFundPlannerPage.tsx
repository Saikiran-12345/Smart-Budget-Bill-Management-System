import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { EducationInflationPlannerEngine } from '../math/calculators/educationInflationPlannerEngine';
import { formatCurrency } from '../math/formatters';
import { GraduationCap, TrendingUp } from 'lucide-react';

export const CollegeFundPlannerPage: React.FC = () => {
  const [currentAge, setCurrentAge] = useState('5');
  const [collegeAge, setCollegeAge] = useState('18');
  const [costToday, setCostToday] = useState('1500000');
  const [inflation, setInflation] = useState('10');
  const [returns, setReturns] = useState('12');

  const res = EducationInflationPlannerEngine.calculateCollegeFund(
    parseFloat(currentAge) || 5,
    parseFloat(collegeAge) || 18,
    parseFloat(costToday) || 1500000,
    parseFloat(inflation) || 10,
    parseFloat(returns) || 12
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Child College Fund & Education Inflation Planner</h1>
        <p className="text-xs text-slate-500">Calculate future inflation-adjusted tuition cost and required monthly SIP</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1" title="Child & Education Parameters">
          <div className="space-y-4">
            <Input label="Child Current Age" type="number" value={currentAge} onChange={(e) => setCurrentAge(e.target.value)} />
            <Input label="College Start Age" type="number" value={collegeAge} onChange={(e) => setCollegeAge(e.target.value)} />
            <Input label="Course Fee Today (₹)" type="number" value={costToday} onChange={(e) => setCostToday(e.target.value)} />
            <Input label="Education Inflation (%)" type="number" value={inflation} onChange={(e) => setInflation(e.target.value)} />
            <Input label="Expected SIP Return (%)" type="number" value={returns} onChange={(e) => setReturns(e.target.value)} />
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-xs">
              <span className="text-slate-400 font-semibold uppercase block">Horizon Remaining</span>
              <span className="text-xl font-extrabold text-slate-900 dark:text-slate-100">{res.yearsToCollege} Years</span>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-xs">
              <span className="text-slate-400 font-semibold uppercase block">Future Inflation Cost</span>
              <span className="text-xl font-extrabold text-purple-700 dark:text-purple-300">{formatCurrency(res.futureInflationAdjustedCost)}</span>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-xs">
              <span className="text-slate-400 font-semibold uppercase block">Required Monthly SIP</span>
              <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">{formatCurrency(res.requiredMonthlySIP)}/mo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
