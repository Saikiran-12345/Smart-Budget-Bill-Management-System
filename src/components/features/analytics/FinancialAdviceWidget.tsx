import React from 'react';
import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { FinancialAdviceService, AutomatedFinancialAdvice } from '../../../services/financialAdviceService';
import { Lightbulb, ArrowRight } from 'lucide-react';

export const FinancialAdviceWidget: React.FC = () => {
  const adviceList = FinancialAdviceService.generateAdvice();

  return (
    <Card title="Automated Financial Advisory" subtitle="AI rule-based smart recommendations">
      <div className="space-y-3">
        {adviceList.length === 0 ? (
          <p className="text-xs text-slate-500 py-4 text-center">Your financial indicators are balanced. No warnings detected.</p>
        ) : (
          adviceList.map((item) => (
            <div key={item.id} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <div className="flex justify-between items-start mb-1">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-amber-500" />
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{item.title}</span>
                </div>
                <Badge variant={item.priority === 'HIGH' ? 'danger' : 'warning'}>{item.priority}</Badge>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 pl-6">{item.recommendation}</p>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};
