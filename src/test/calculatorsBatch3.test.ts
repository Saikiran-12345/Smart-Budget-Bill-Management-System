import { describe, it, expect } from 'vitest';
import { CryptoStakingYieldEngine } from '../math/calculators/cryptoStakingYieldEngine';
import { RenovationBudgetPlanEngine } from '../math/calculators/renovationBudgetPlanEngine';
import { SolarSuryaGharEngine } from '../math/calculators/solarSuryaGharEngine';
import { VehicleTCOEngine } from '../math/calculators/vehicleTCOEngine';
import { BondYTMYieldEngine } from '../math/calculators/bondYTMYieldEngine';
import { ESOPPerquisiteTaxEngine } from '../math/calculators/esopPerquisiteTaxEngine';
import { DebtConsolidationEMIEngine } from '../math/calculators/debtConsolidationEMIEngine';
import { NPSPensionCorpusEngine } from '../math/calculators/npsPensionCorpusEngine';
import { ELSSTaxSavingLockinEngine } from '../math/calculators/elssTaxSavingLockinEngine';
import { GoldenRatioBudgetPlannerEngine } from '../math/calculators/goldenRatioBudgetPlannerEngine';
import { CashBurnRunwayMetricEngine } from '../math/calculators/cashBurnRunwayMetricEngine';

describe('FinTech Calculation Engines Test Suite (Batch 3)', () => {
  it('CryptoStakingYieldEngine should calculate correct APY rewards', () => {
    const res = CryptoStakingYieldEngine.calculateYield('ETH', 'Ethereum', 3.0, 260000, 5.5);
    expect(res.stakedQuantity).toBe(3.0);
    expect(res.monthlyRewardINR).toBeGreaterThan(0);
  });

  it('RenovationBudgetPlanEngine should allocate budget with 15% buffer', () => {
    const res = RenovationBudgetPlanEngine.calculatePlan(500000, 15);
    expect(res.bufferAmount).toBe(75000);
    expect(res.totalBudgetWithBuffer).toBe(575000);
    expect(res.allocations.length).toBe(4);
  });

  it('SolarSuryaGharEngine should calculate PM Surya Ghar subsidy correctly', () => {
    const res = SolarSuryaGharEngine.calculateSubsidy(3, 8.5);
    expect(res.subsidyAmount).toBe(78000);
    expect(res.paybackYears).toBeGreaterThan(0);
  });

  it('VehicleTCOEngine should calculate 5-year running cost per km', () => {
    const res = VehicleTCOEngine.calculateTCO('Tata Nexon', 1200000, 15000, 16, 102);
    expect(res.total5YearTCO).toBeGreaterThan(1200000);
    expect(res.costPerKm).toBeGreaterThan(0);
  });

  it('BondYTMYieldEngine should calculate YTM accurately', () => {
    const res = BondYTMYieldEngine.calculateYield('7.18% GS 2033', 1000, 985, 7.18, 7);
    expect(res.currentYieldPercent).toBeGreaterThan(7.0);
    expect(res.ytmPercent).toBeGreaterThan(res.currentYieldPercent);
  });

  it('ESOPPerquisiteTaxEngine should calculate perquisite & LTCG taxes', () => {
    const res = ESOPPerquisiteTaxEngine.calculateESOP(2000, 100, 400, 750);
    expect(res.perquisiteTaxableValue).toBe(600000);
    expect(res.perquisiteTaxPaid30Percent).toBe(180000);
    expect(res.netInHandProfit).toBeGreaterThan(0);
  });

  it('DebtConsolidationEMIEngine should calculate refinanced EMI and savings', () => {
    const debts = [
      { debtId: '1', name: 'Credit Card', balance: 60000, aprPercent: 36, monthlyEMI: 5000 },
      { debtId: '2', name: 'Personal Loan', balance: 140000, aprPercent: 16, monthlyEMI: 5500 },
    ];
    const res = DebtConsolidationEMIEngine.calculateConsolidation(debts, 11.5, 36);
    expect(res.totalBalance).toBe(200000);
    expect(res.newRefinancedEMI).toBeLessThan(res.currentCombinedEMI);
  });

  it('NPSPensionCorpusEngine should calculate 60% lump sum and monthly pension', () => {
    const res = NPSPensionCorpusEngine.calculateNPSCorpus(5000, 30, 10, 6.5);
    expect(res.accumulatedCorpusAt60).toBeGreaterThan(1000000);
    expect(res.taxFreeLumpSum60Percent + res.annuityCorpus40Percent).toBe(res.accumulatedCorpusAt60);
  });

  it('ELSSTaxSavingLockinEngine should calculate 80C tax saving & 3-year corpus', () => {
    const res = ELSSTaxSavingLockinEngine.calculateELSS(150000, 12, 30);
    expect(res.directTaxSaved).toBe(45000);
    expect(res.projectedCorpusAfter3Years).toBeGreaterThan(150000);
  });

  it('GoldenRatioBudgetPlannerEngine should allocate salary into 30/10/15/25/20', () => {
    const res = GoldenRatioBudgetPlannerEngine.calculateGoldenRatio(120000);
    expect(res.categories.length).toBe(5);
    expect(res.totalAllocatedAmount).toBe(120000);
  });

  it('CashBurnRunwayMetricEngine should calculate liquid emergency runway months', () => {
    const res = CashBurnRunwayMetricEngine.calculateRunway(300000, 45000, 20000);
    expect(res.totalMonthlyBurnRate).toBe(65000);
    expect(res.runwayMonthsCount).toBeCloseTo(4.6, 1);
    expect(res.runwayRating).toBe('WARNING');
  });
});
