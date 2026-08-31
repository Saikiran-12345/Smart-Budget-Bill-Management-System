import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { VacationFundPlannerEngine } from '../math/calculators/vacationFundPlannerEngine';
import { formatCurrency } from '../math/formatters';
import { Plane, Calendar } from 'lucide-react';

export const VacationPlannerPage: React.FC = () => {
  const [destination, setDestination] = useState('Bali, Indonesia');
  const [flights, setFlights] = useState('45000');
  const [hotel, setHotel] = useState('35000');
  const [dining, setDining] = useState('20000');

  const res = VacationFundPlannerEngine.planVacation(
    destination,
    parseFloat(flights) || 0,
    parseFloat(hotel) || 0,
    parseFloat(dining) || 0
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Vacation Travel Trip Fund Planner</h1>
        <p className="text-xs text-slate-500">Calculate total trip estimate and required monthly deposit goal</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1" title="Trip Budget Parameters">
          <div className="space-y-4">
            <Input label="Destination Name" value={destination} onChange={(e) => setDestination(e.target.value)} />
            <Input label="Flight Tickets (₹)" type="number" value={flights} onChange={(e) => setFlights(e.target.value)} />
            <Input label="Hotel Accommodation (₹)" type="number" value={hotel} onChange={(e) => setHotel(e.target.value)} />
            <Input label="Dining & Activities (₹)" type="number" value={dining} onChange={(e) => setDining(e.target.value)} />
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-xs">
              <span className="text-slate-400 font-semibold uppercase block">Target Destination</span>
              <span className="text-xl font-extrabold text-slate-900 dark:text-slate-100">{res.destinationName}</span>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-xs">
              <span className="text-slate-400 font-semibold uppercase block">Total Trip Cost</span>
              <span className="text-xl font-extrabold text-brand-600 dark:text-brand-400">{formatCurrency(res.totalTripEstimate)}</span>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-xs">
              <span className="text-slate-400 font-semibold uppercase block">Required Monthly Savings</span>
              <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">{formatCurrency(res.requiredMonthlySavings)}/mo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
