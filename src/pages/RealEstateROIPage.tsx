import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { RealEstateCapRateEngine } from '../math/calculators/realEstateCapRateEngine';
import { formatCurrency } from '../math/formatters';
import { Building, TrendingUp, ShieldCheck } from 'lucide-react';

export const RealEstateROIPage: React.FC = () => {
  const [price, setPrice] = useState('8000000');
  const [rent, setRent] = useState('35000');
  const [tax, setTax] = useState('15000');
  const [maint, setMaint] = useState('25000');

  const res = RealEstateCapRateEngine.calculateCapRate(
    parseFloat(price) || 0,
    parseFloat(rent) || 0,
    parseFloat(tax) || 0,
    parseFloat(maint) || 0
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Real Estate Property Cap Rate & Rental Yield</h1>
        <p className="text-xs text-slate-500">Calculate Net Operating Income (NOI), Cap Rate %, and gross rental yield</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1" title="Property Inputs">
          <div className="space-y-4">
            <Input label="Purchase Price (₹)" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
            <Input label="Monthly Rent Received (₹)" type="number" value={rent} onChange={(e) => setRent(e.target.value)} />
            <Input label="Annual Property Tax (₹)" type="number" value={tax} onChange={(e) => setTax(e.target.value)} />
            <Input label="Annual Maintenance & Ins (₹)" type="number" value={maint} onChange={(e) => setMaint(e.target.value)} />
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-xs">
              <span className="text-slate-400 font-semibold uppercase block">Net Operating Income</span>
              <span className="text-xl font-extrabold text-slate-900 dark:text-slate-100">{formatCurrency(res.netOperatingIncomeNOI)}</span>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-xs">
              <span className="text-slate-400 font-semibold uppercase block">Cap Rate %</span>
              <span className="text-xl font-extrabold text-brand-600 dark:text-brand-400">{res.capRatePercent}%</span>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-xs">
              <span className="text-slate-400 font-semibold uppercase block">Gross Rental Yield</span>
              <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">{res.grossRentalYieldPercent}%</span>
            </div>
          </div>

          <Card title="Investment Assessment">
            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-xs space-y-2">
              <div className="flex justify-between items-center font-bold text-blue-900 dark:text-blue-200">
                <span>Investment Evaluation:</span>
                <span>{res.isAttractiveInvestment ? 'Attractive Cap Rate (>=4.5%)' : 'Low Rental Yield (<4.5%)'}</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                Your annual gross rental income is {formatCurrency(res.grossAnnualRentalIncome)}. After operating expenses, your net operating income is {formatCurrency(res.netOperatingIncomeNOI)}.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
