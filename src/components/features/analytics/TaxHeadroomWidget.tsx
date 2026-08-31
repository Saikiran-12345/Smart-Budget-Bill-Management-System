import React from 'react';
import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { TaxHeadroomService } from '../../../services/taxHeadroomService';
import { formatCurrency } from '../../../math/formatters';

export const TaxHeadroomWidget: React.FC = () => {
  const headrooms = TaxHeadroomService.getSectionHeadroom();

  return (
    <Card title="Tax Exemption Headroom Tracker (Sec 80C, 80D, 80CCD)" subtitle="Remaining deduction headroom before fiscal year end">
      <div className="space-y-3">
        {headrooms.map((hr, idx) => (
          <div key={idx} className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs space-y-1">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-800 dark:text-slate-200">{hr.sectionCode} ({hr.descriptionLabel})</span>
              <Badge variant={hr.remainingHeadroom === 0 ? 'success' : 'warning'}>
                {hr.remainingHeadroom === 0 ? 'Fully Claimed' : `₹${formatCurrency(hr.remainingHeadroom)} Left`}
              </Badge>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-brand-600 h-full rounded-full transition-all" style={{ width: `${hr.claimedPercentage}%` }} />
            </div>
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>Claimed: {formatCurrency(hr.currentClaimedAmount)}</span>
              <span>Max Limit: {formatCurrency(hr.maxExemptionLimit)}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
