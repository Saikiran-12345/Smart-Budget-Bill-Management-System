import React from 'react';
import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { RentVsBuyService } from '../../../services/rentVsBuyService';
import { formatCurrency } from '../../../math/formatters';

export const RentVsBuyWidget: React.FC = () => {
  const rvb = RentVsBuyService.getRentVsBuyComparison();

  return (
    <Card title="Rent vs Buy Property Financial Simulator (20-Year Horizon)" subtitle="Home loan EMI vs rental difference SIP wealth compounding">
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 text-xs">
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Monthly Home Loan EMI</span>
            <span className="text-xl font-extrabold text-slate-800 dark:text-slate-200">{formatCurrency(rvb.homeLoanEMIINR)}</span>
          </div>
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Renter SIP Wealth (20 Yrs)</span>
            <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">{formatCurrency(rvb.investedDifferenceCorpusINR)}</span>
          </div>
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Recommendation</span>
            <Badge variant="success">{rvb.financialRecommendation}</Badge>
          </div>
        </div>
      </div>
    </Card>
  );
};
