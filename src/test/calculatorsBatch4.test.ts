import { describe, it, expect } from 'vitest';
import { CorporateFDYieldEngine } from '../math/calculators/corporateFDYieldEngine';
import { TBillDiscountYieldEngine } from '../math/calculators/tBillDiscountYieldEngine';
import { REITDistributionYieldEngine } from '../math/calculators/reitDistributionYieldEngine';
import { SWPRetirementIncomeEngine } from '../math/calculators/swpRetirementIncomeEngine';
import { CapitalGainsSTCG_LTCG_Engine } from '../math/calculators/capitalGainsSTCG_LTCG_Engine';
import { HUFTaxSavingsEngine } from '../math/calculators/hufTaxSavingsEngine';
import { NPSCorporateModelEngine } from '../math/calculators/npsCorporateModelEngine';
import { Section54ECCapitalGainsBondsEngine } from '../math/calculators/section54ECCapitalGainsBondsEngine';

describe('FinTech Calculation Engines Test Suite (Batch 4)', () => {
  it('CorporateFDYieldEngine should calculate corporate FD yield & TDS', () => {
    const res = CorporateFDYieldEngine.calculateCorporateFD('Bajaj Finance', 100000, 36, 8.10, false);
    expect(res.maturityValueINR).toBeGreaterThan(100000);
    expect(res.tdsDeductionEstimateINR).toBeGreaterThan(0);
  });

  it('TBillDiscountYieldEngine should calculate 91-day T-Bill yield', () => {
    const res = TBillDiscountYieldEngine.calculateTBillYield('91D_TBILL', 98.32, 100, 91);
    expect(res.annualizedDiscountYieldPercent).toBeGreaterThan(6.0);
  });

  it('REITDistributionYieldEngine should calculate REIT dividend yield', () => {
    const res = REITDistributionYieldEngine.calculateREITYield('EMBASSY_REIT', 1000, 375.40, 21.45, 35);
    expect(res.distributionYieldPercent).toBeGreaterThan(5.0);
  });

  it('SWPRetirementIncomeEngine should generate 20-year monthly SWP schedule', () => {
    const res = SWPRetirementIncomeEngine.generateSWPSchedule(10000000, 50000, 9.0, 20);
    expect(res.monthByMonthSchedule.length).toBe(240);
    expect(res.finalRemainingCorpus).toBeGreaterThan(0);
  });

  it('CapitalGainsSTCG_LTCG_Engine should calculate 12.5% LTCG with ₹1.25L exemption', () => {
    const res = CapitalGainsSTCG_LTCG_Engine.calculateCapitalGains('EQUITY_OR_EQUITY_MF', 200000, 450000, 400);
    expect(res.isLongTerm).toBe(true);
    expect(res.ltcgExemptionLimitINR).toBe(125000);
    expect(res.estimatedTaxPayableINR).toBe(15625);
  });

  it('HUFTaxSavingsEngine should calculate tax saved via HUF entity formation', () => {
    const res = HUFTaxSavingsEngine.calculateHUFTaxSavings(500000, 30);
    expect(res.taxSavedViaHUFFormationINR).toBeGreaterThan(0);
  });

  it('NPSCorporateModelEngine should calculate 10% employer contribution tax savings under Sec 80CCD(2)', () => {
    const res = NPSCorporateModelEngine.calculateCorporateNPS(1200000, 10, 30);
    expect(res.employerNPSContributionINR).toBe(120000);
    expect(res.directTaxSavedINR).toBe(36000);
  });

  it('Section54ECCapitalGainsBondsEngine should calculate capital gains exemption on 5-year 5.25% bonds', () => {
    const res = Section54ECCapitalGainsBondsEngine.calculate54EBonds(4000000, 4000000);
    expect(res.bondInvestmentAmountINR).toBe(4000000);
    expect(res.totalAnnualCouponIncomeINR).toBe(210000);
  });
});
