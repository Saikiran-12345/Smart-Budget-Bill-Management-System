import React from 'react';
import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { CryptoYieldService } from '../../../services/cryptoYieldService';
import { formatCurrency } from '../../../math/formatters';
import { Coins } from 'lucide-react';

export const CryptoYieldWidget: React.FC = () => {
  const yieldInfo = CryptoYieldService.getYieldAnalysis();

  return (
    <Card title="Crypto APY Staking Yield & Volatility Index" subtitle="Monthly yield estimation & impermanent loss risk">
      <div className="space-y-4">
        <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
          <div>
            <span className="font-bold text-slate-800 dark:text-slate-200">{yieldInfo.tokenName}</span>
            <span className="text-slate-400 block">{yieldInfo.stakedAmountTokens} Tokens Staked (@ {formatCurrency(yieldInfo.tokenUnitPriceINR)})</span>
          </div>
          <Badge variant={yieldInfo.riskRating === 'HIGH_VOLATILITY' ? 'danger' : 'info'}>
            {yieldInfo.riskRating}
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
            <span className="text-slate-500 font-semibold uppercase block">Monthly Staking Yield</span>
            <div className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">+{formatCurrency(yieldInfo.estimatedMonthlyYieldINR)}</div>
            <span className="text-[10px] text-slate-400">({yieldInfo.estimatedMonthlyYieldTokens} ETH / month)</span>
          </div>

          <div className="p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
            <span className="text-slate-500 font-semibold uppercase block">Annualized APY Yield</span>
            <div className="text-lg font-extrabold text-brand-600 dark:text-brand-400">{yieldInfo.annualStakingAPYPercent}% APY</div>
            <span className="text-[10px] text-slate-400">Annual Return: {formatCurrency(yieldInfo.estimatedAnnualYieldINR)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
