import { describe, it, expect } from 'vitest';
import { HISTORICAL_TAX_SLAB_DATABASE, TaxSlabLookupService } from '../data/taxSlabDatabase';
import { BANK_INTEREST_RATE_CATALOG } from '../data/bankInterestRateCatalog';
import { MUTUAL_FUND_CATALOG } from '../data/mutualFundCatalog';
import { CITY_LIVING_COST_CATALOG } from '../data/cityLivingCostCatalog';
import { FINANCIAL_GLOSSARY_CATALOG } from '../data/financialGlossaryCatalog';

describe('FinTech Enterprise Data Catalogs Integrity Suite', () => {
  it('should have historical tax slabs for FY 2026-27, FY 2025-26 and FY 2024-25', () => {
    expect(HISTORICAL_TAX_SLAB_DATABASE.length).toBeGreaterThanOrEqual(5);
    const fy26 = TaxSlabLookupService.getSlabForYear('FY 2026-27', 'NEW_REGIME');
    expect(fy26).toBeDefined();
    expect(fy26?.standardDeductionAmount).toBe(75000);
  });

  it('should list major Indian banks with valid interest rates', () => {
    expect(BANK_INTEREST_RATE_CATALOG.length).toBeGreaterThanOrEqual(10);
    const sbi = BANK_INTEREST_RATE_CATALOG.find((b) => b.bankCode === 'SBI');
    expect(sbi).toBeDefined();
    expect(sbi?.homeLoanInterestRateMin).toBeLessThan(10);
  });

  it('should contain mutual fund schemes across categories', () => {
    expect(MUTUAL_FUND_CATALOG.length).toBeGreaterThanOrEqual(8);
    const smallCap = MUTUAL_FUND_CATALOG.find((m) => m.category === 'EQUITY_SMALL_CAP');
    expect(smallCap).toBeDefined();
    expect(smallCap?.returns3YearCAGR).toBeGreaterThan(20);
  });

  it('should contain living cost metrics for major Tier 1 and Tier 2 cities', () => {
    expect(CITY_LIVING_COST_CATALOG.length).toBeGreaterThanOrEqual(10);
    const blr = CITY_LIVING_COST_CATALOG.find((c) => c.cityCode === 'BLR');
    expect(blr).toBeDefined();
    expect(blr?.compositeCostOfLivingIndex).toBe(100);
  });

  it('should contain financial glossary entries with valid formulas', () => {
    expect(FINANCIAL_GLOSSARY_CATALOG.length).toBeGreaterThanOrEqual(8);
    const cagr = FINANCIAL_GLOSSARY_CATALOG.find((g) => g.termId === 'CAGR');
    expect(cagr).toBeDefined();
    expect(cagr?.formulaText).toContain('CAGR');
  });
});
