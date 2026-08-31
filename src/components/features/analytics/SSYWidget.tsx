import React from 'react';
import { Card } from '../../ui/Card';
import { SSYService } from '../../../services/ssyService';
import { formatCurrency } from '../../../math/formatters';

export const SSYWidget: React.FC = () => {
  const ssy = SSYService.getSSYMaturity();

  return (
    <Card title="Sukanya Samriddhi Yojana (SSY 8.2%)" subtitle="21-year tax-free girl child education corpus">
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-pink-50 dark:bg-pink-950/30 border border-pink-200 dark:border-pink-800 text-xs">
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Total Principal Deposited</span>
            <span className="text-xl font-extrabold text-slate-800 dark:text-slate-200">{formatCurrency(ssy.totalInvestedPrincipal)}</span>
          </div>
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Tax-Free Interest Earned</span>
            <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">+{formatCurrency(ssy.totalTaxFreeInterestEarned)}</span>
          </div>
          <div>
            <span className="text-slate-500 font-semibold uppercase block">21-Year Maturity Corpus</span>
            <span className="text-xl font-extrabold text-pink-700 dark:text-pink-300">{formatCurrency(ssy.maturityCorpusAt21Years)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
