import React from 'react';
import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { FIRERetirementService } from '../../../services/fireRetirementService';
import { formatCurrency } from '../../../math/formatters';

export const FIREStrategyWidget: React.FC = () => {
  const fire = FIRERetirementService.getFIREAnalysis();

  return (
    <Card title="FIRE Early Retirement Target Corpus (4% Rule)" subtitle="Lean FIRE, Regular FIRE, and Fat FIRE milestone tracking">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          {/* Lean FIRE */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-800 dark:text-slate-200">Lean FIRE</span>
              <Badge variant={fire.leanFIRE.isFIREAchieved ? 'success' : 'info'}>
                {fire.leanFIRE.isFIREAchieved ? 'Achieved' : `${fire.leanFIRE.yearsToFIRE} Yrs`}
              </Badge>
            </div>
            <span className="text-xl font-extrabold text-slate-900 dark:text-slate-100 block">{formatCurrency(fire.leanFIRE.requiredTargetCorpus)}</span>
            <span className="text-slate-400">75% Expenses Buffer</span>
          </div>

          {/* Regular FIRE */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-800 dark:text-slate-200">Regular FIRE</span>
              <Badge variant={fire.regularFIRE.isFIREAchieved ? 'success' : 'info'}>
                {fire.regularFIRE.isFIREAchieved ? 'Achieved' : `${fire.regularFIRE.yearsToFIRE} Yrs`}
              </Badge>
            </div>
            <span className="text-xl font-extrabold text-brand-600 dark:text-brand-400 block">{formatCurrency(fire.regularFIRE.requiredTargetCorpus)}</span>
            <span className="text-slate-400">100% Expenses Buffer</span>
          </div>

          {/* Fat FIRE */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-800 dark:text-slate-200">Fat FIRE</span>
              <Badge variant={fire.fatFIRE.isFIREAchieved ? 'success' : 'warning'}>
                {fire.fatFIRE.isFIREAchieved ? 'Achieved' : `${fire.fatFIRE.yearsToFIRE} Yrs`}
              </Badge>
            </div>
            <span className="text-xl font-extrabold text-purple-700 dark:text-purple-300 block">{formatCurrency(fire.fatFIRE.requiredTargetCorpus)}</span>
            <span className="text-slate-400">150% Expenses Buffer</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
