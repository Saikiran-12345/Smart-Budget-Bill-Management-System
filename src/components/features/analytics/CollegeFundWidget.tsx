import React from 'react';
import { Card } from '../../ui/Card';
import { EducationInflationService } from '../../../services/educationInflationService';
import { formatCurrency } from '../../../math/formatters';
import { GraduationCap } from 'lucide-react';

export const CollegeFundWidget: React.FC = () => {
  const plan = EducationInflationService.getCollegeFundPlan();

  return (
    <Card title="Higher Education Inflation & Child College Fund" subtitle="10% annual tuition inflation & required monthly SIP">
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 text-xs">
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Cost Today (Course Fee)</span>
            <span className="text-xl font-extrabold text-slate-800 dark:text-slate-200">{formatCurrency(plan.currentCourseCostToday)}</span>
          </div>
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Future Inflation Adjusted ({plan.yearsToCollege} Yrs)</span>
            <span className="text-xl font-extrabold text-purple-700 dark:text-purple-300">{formatCurrency(plan.futureInflationAdjustedCost)}</span>
          </div>
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Required Monthly SIP</span>
            <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">{formatCurrency(plan.requiredMonthlySIP)}/mo</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
