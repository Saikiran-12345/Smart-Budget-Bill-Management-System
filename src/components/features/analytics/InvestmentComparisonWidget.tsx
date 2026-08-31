import React from 'react';
import { Card } from '../../ui/Card';
import { InvestmentReturnComparisonEngine } from '../../../math/calculators/investmentReturnComparisonEngine';
import { formatCurrency } from '../../../math/formatters';

export const InvestmentComparisonWidget: React.FC = () => {
  const assets = InvestmentReturnComparisonEngine.compareAssetClasses(500000, 10);

  return (
    <Card title="10-Year Multi-Asset Return Comparison" subtitle="Equity vs Real Estate vs FD vs Sovereign Gold">
      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {assets.map((ast, idx) => (
          <div key={idx} className="py-2.5 flex justify-between items-center text-xs">
            <div>
              <h4 className="font-bold text-slate-800 dark:text-slate-200">{ast.assetClassName}</h4>
              <span className="text-slate-400">CAGR: {ast.cagrPercent}% • Risk: {ast.volatilityRisk}</span>
            </div>
            <div className="text-right">
              <span className="font-extrabold text-emerald-600 dark:text-emerald-400 block">{formatCurrency(ast.finalCorpus)}</span>
              <span className="text-[10px] text-slate-400 font-semibold">Gain: +{formatCurrency(ast.totalGain)}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
