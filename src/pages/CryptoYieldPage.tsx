import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { CryptoStakingYieldEngine } from '../math/calculators/cryptoStakingYieldEngine';
import { formatCurrency } from '../math/formatters';
import { Coins, ShieldAlert } from 'lucide-react';

export const CryptoYieldPage: React.FC = () => {
  const [tokenName, setTokenName] = useState('Ethereum (ETH)');
  const [stakedQty, setStakedQty] = useState('3.0');
  const [priceINR, setPriceINR] = useState('260000');
  const [apy, setApy] = useState('5.5');

  const res = CryptoStakingYieldEngine.calculateYield(
    'ETH',
    tokenName,
    parseFloat(stakedQty) || 0,
    parseFloat(priceINR) || 0,
    parseFloat(apy) || 0
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Crypto APY Staking Yield & Valuation Calculator</h1>
        <p className="text-xs text-slate-500">Calculate monthly staking yield in INR and token rewards</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1" title="Staking Inputs">
          <div className="space-y-4">
            <Input label="Token Name" value={tokenName} onChange={(e) => setTokenName(e.target.value)} />
            <Input label="Staked Tokens Quantity" type="number" step="0.1" value={stakedQty} onChange={(e) => setStakedQty(e.target.value)} />
            <Input label="Token Unit Price (₹)" type="number" value={priceINR} onChange={(e) => setPriceINR(e.target.value)} />
            <Input label="Annual Staking APY (%)" type="number" step="0.1" value={apy} onChange={(e) => setApy(e.target.value)} />
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-xs">
              <span className="text-slate-400 font-semibold uppercase block">Total Staked Valuation</span>
              <span className="text-xl font-extrabold text-slate-900 dark:text-slate-100">{formatCurrency(res.stakedQuantity * res.priceINR)}</span>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-xs">
              <span className="text-slate-400 font-semibold uppercase block">Monthly Reward (₹)</span>
              <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">+{formatCurrency(res.monthlyRewardINR)}/mo</span>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-xs">
              <span className="text-slate-400 font-semibold uppercase block">Annualized APY Return</span>
              <span className="text-xl font-extrabold text-purple-700 dark:text-purple-300">{formatCurrency(res.annualRewardINR)}/yr</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
