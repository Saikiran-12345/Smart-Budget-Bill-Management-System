import React from 'react';
import { Card } from '../../ui/Card';
import { WeddingService } from '../../../services/weddingService';
import { formatCurrency } from '../../../math/formatters';
import { Heart, Users } from 'lucide-react';

export const WeddingPlannerWidget: React.FC = () => {
  const wedding = WeddingService.getWeddingAllocation();

  return (
    <Card title="Wedding Ceremony Event Budget Allocator" subtitle="Category breakdown & per-guest cost allocation">
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-pink-50 dark:bg-pink-950/30 border border-pink-200 dark:border-pink-800 text-xs">
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Total Event Budget</span>
            <span className="text-xl font-extrabold text-pink-700 dark:text-pink-300">{formatCurrency(wedding.totalWeddingBudget)}</span>
          </div>
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Guest Count</span>
            <span className="text-xl font-extrabold text-slate-800 dark:text-slate-200">{wedding.guestCount} Guests</span>
          </div>
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Cost Per Guest</span>
            <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">{formatCurrency(wedding.costPerGuest)}/guest</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
