import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { RentVsBuyService } from '../services/rentVsBuyService';
import { formatCurrency } from '../math/formatters';

export const RentVsBuyPage: React.FC = () => {
  const [price, setPrice] = useState('8000000');
  const [rent, setRent] = useState('25000');
  const [rate, setRate] = useState('8.5');

  const res = RentVsBuyService.getRentVsBuyComparison(
    parseFloat(price) || 0,
    parseFloat(rent) || 0,
    parseFloat(rate) || 0
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Rent vs Buy Property Financial Calculator</h1>
        <p className="text-xs text-slate-500">20-year wealth accumulator comparison between buying home vs renting and investing difference</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1" title="Property Parameters">
          <div className="space-y-4">
            <Input label="Property Price (₹)" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
            <Input label="Monthly Rent (₹)" type="number" value={rent} onChange={(e) => setRent(e.target.value)} />
            <Input label="Home Loan Rate (%)" type="number" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} />
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-xs">
              <span className="text-slate-400 font-semibold uppercase block">Monthly Home Loan EMI</span>
              <span className="text-xl font-extrabold text-slate-900 dark:text-slate-100">{formatCurrency(res.homeLoanEMIINR)}</span>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-xs">
              <span className="text-slate-400 font-semibold uppercase block">Down Payment (20%)</span>
              <span className="text-xl font-extrabold text-brand-600 dark:text-brand-400">{formatCurrency(res.downPaymentINR)}</span>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-xs">
              <span className="text-slate-400 font-semibold uppercase block">Renter Wealth (20 Yrs)</span>
              <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">{formatCurrency(res.investedDifferenceCorpusINR)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
