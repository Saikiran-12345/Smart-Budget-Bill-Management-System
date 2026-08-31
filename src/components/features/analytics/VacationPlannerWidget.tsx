import React from 'react';
import { Card } from '../../ui/Card';
import { VacationService } from '../../../services/vacationService';
import { formatCurrency } from '../../../math/formatters';
import { Plane, Calendar } from 'lucide-react';

export const VacationPlannerWidget: React.FC = () => {
  const vac = VacationService.getVacationPlan();

  return (
    <Card title="Vacation Travel Trip Cost & Monthly Savings Goal" subtitle="Flights, hotel accommodation & monthly deposit target">
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-xs">
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Trip Destination</span>
            <span className="text-base font-extrabold text-blue-900 dark:text-blue-200">{vac.destinationTitle}</span>
          </div>
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Total Trip Estimate</span>
            <span className="text-xl font-extrabold text-slate-800 dark:text-slate-200">{formatCurrency(vac.totalTripEstimate)}</span>
          </div>
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Required Monthly Savings</span>
            <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">{formatCurrency(vac.requiredMonthlySavings)}/mo</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
