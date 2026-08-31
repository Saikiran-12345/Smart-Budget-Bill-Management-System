import { describe, it, expect } from 'vitest';
import { MORTGAGE_BANK_RATES_MATRIX } from '../data/mortgageBankRatesMatrix';
import { CREDIT_CARD_REWARDS_MATRIX } from '../data/creditCardRewardsMatrix';
import { STOCKS_FUNDAMENTAL_MATRIX } from '../data/stocksFundamentalMatrix';
import { SOVEREIGN_GOLD_BONDS_CATALOG } from '../data/sovereignGoldBondsCatalog';
import { HISTORICAL_PF_INTEREST_RATES } from '../data/providentFundInterestRates';
import { HEALTH_INSURANCE_POLICY_CATALOG_MATRIX } from '../data/insurancePolicyCatalogMatrix';
import { PERSONAL_LOAN_OFFERS_MATRIX } from '../data/personalLoanOffersMatrix';
import { CIBIL_CREDIT_SCORE_BANDS } from '../math/models/creditScoreModels';
import { REAL_ESTATE_VALUATION_BENCHMARKS } from '../math/models/realEstateModels';

describe('FinTech Extended Domain Data Catalogs & Models Suite', () => {
  it('should list mortgage rates for major Indian lenders', () => {
    expect(MORTGAGE_BANK_RATES_MATRIX.length).toBeGreaterThanOrEqual(8);
    const sbi = MORTGAGE_BANK_RATES_MATRIX.find((m) => m.lenderId === 'SBI_HOME_LOAN');
    expect(sbi).toBeDefined();
    expect(sbi?.maxTenureYears).toBe(30);
  });

  it('should list credit card reward offerings and lounge benefits', () => {
    expect(CREDIT_CARD_REWARDS_MATRIX.length).toBeGreaterThanOrEqual(6);
    const infinia = CREDIT_CARD_REWARDS_MATRIX.find((c) => c.cardId === 'HDFC_INFINTIA');
    expect(infinia).toBeDefined();
    expect(infinia?.rewardRateBasePercent).toBe(3.3);
  });

  it('should list Indian stock fundamentals for Nifty bluechips', () => {
    expect(STOCKS_FUNDAMENTAL_MATRIX.length).toBeGreaterThanOrEqual(8);
    const tcs = STOCKS_FUNDAMENTAL_MATRIX.find((s) => s.nseSymbol === 'TCS');
    expect(tcs).toBeDefined();
    expect(tcs?.rocePercent).toBeGreaterThan(40);
  });

  it('should list Sovereign Gold Bond tranches with issue prices', () => {
    expect(SOVEREIGN_GOLD_BONDS_CATALOG.length).toBeGreaterThanOrEqual(5);
    const sgb = SOVEREIGN_GOLD_BONDS_CATALOG[0];
    expect(sgb.fixedCouponInterestRatePercent).toBe(2.50);
  });

  it('should contain historical EPF/PPF/VPF interest rates', () => {
    expect(HISTORICAL_PF_INTEREST_RATES.length).toBeGreaterThanOrEqual(10);
    const fy24 = HISTORICAL_PF_INTEREST_RATES[0];
    expect(fy24.epfInterestRatePercent).toBe(8.25);
  });

  it('should contain health insurance policies with claim settlement ratios', () => {
    expect(HEALTH_INSURANCE_POLICY_CATALOG_MATRIX.length).toBeGreaterThanOrEqual(5);
    const hdfc = HEALTH_INSURANCE_POLICY_CATALOG_MATRIX.find((p) => p.policyId === 'HDFC_ERGO_OPTIMA_SECURE');
    expect(hdfc).toBeDefined();
    expect(hdfc?.claimSettlementRatioPercent).toBeGreaterThan(95);
  });

  it('should contain personal loan lender offers with CIBIL requirements', () => {
    expect(PERSONAL_LOAN_OFFERS_MATRIX.length).toBeGreaterThanOrEqual(6);
    const hdfc = PERSONAL_LOAN_OFFERS_MATRIX.find((p) => p.lenderCode === 'HDFC_PL');
    expect(hdfc).toBeDefined();
    expect(hdfc?.minCibilScoreRequired).toBe(720);
  });

  it('should contain CIBIL credit score bands', () => {
    expect(CIBIL_CREDIT_SCORE_BANDS.length).toBe(5);
    const excellent = CIBIL_CREDIT_SCORE_BANDS[0];
    expect(excellent.bandLabel).toBe('EXCELLENT');
  });

  it('should contain real estate valuation benchmarks', () => {
    expect(REAL_ESTATE_VALUATION_BENCHMARKS.length).toBe(5);
    const apt = REAL_ESTATE_VALUATION_BENCHMARKS[0];
    expect(apt.propertyType).toBe('RESIDENTIAL_APARTMENT');
  });
});
