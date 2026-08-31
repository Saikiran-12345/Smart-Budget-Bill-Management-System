import React from 'react';
import { Card } from '../../ui/Card';
import { HealthInsuranceService } from '../../../services/healthInsuranceService';
import { formatCurrency } from '../../../math/formatters';
import { ShieldCheck, HeartPulse } from 'lucide-react';

export const HealthInsuranceWidget: React.FC = () => {
  const claim = HealthInsuranceService.getClaimCoverage();

  return (
    <Card title="Health Insurance Claim Copay & Deductible Simulator" subtitle="Out-of-pocket maximum limit & insurer payout coverage">
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 text-xs">
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Insurer Covered Payout</span>
            <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">{formatCurrency(claim.insuranceCoveredAmount)}</span>
          </div>
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Patient Out-of-Pocket</span>
            <span className="text-xl font-extrabold text-red-600 dark:text-red-400">{formatCurrency(claim.patientOutOfPocketPayable)}</span>
          </div>
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Policy Deductible</span>
            <span className="text-xl font-extrabold text-slate-800 dark:text-slate-200">{formatCurrency(claim.policyDeductibleAmount)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
