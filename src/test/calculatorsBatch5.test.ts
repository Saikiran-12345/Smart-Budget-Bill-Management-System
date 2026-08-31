import { describe, it, expect } from 'vitest';
import { PresumptiveTax44ADAEngine } from '../math/calculators/presumptiveTax44ADAEngine';
import { RentVsBuyPropertyEngine } from '../math/calculators/rentVsBuyPropertyEngine';
import { LeaveEncashmentTaxExemptionEngine } from '../math/calculators/leaveEncashmentTaxExemptionEngine';
import { ElectricVehicleTaxDeduction80EEBEngine } from '../math/calculators/electricVehicleTaxDeduction80EEBEngine';
import { PostOfficeMonthlyIncomeSchemeEngine } from '../math/calculators/postOfficeMonthlyIncomeSchemeEngine';

describe('FinTech Calculation Engines Test Suite (Batch 5)', () => {
  it('PresumptiveTax44ADAEngine should calculate 50% flat tax profit under Sec 44ADA', () => {
    const res = PresumptiveTax44ADAEngine.calculate44ADA(4500000, 1200000, 30);
    expect(res.presumptiveIncome50PercentINR).toBe(2250000);
    expect(res.isEligibleSection44ADA).toBe(true);
  });

  it('RentVsBuyPropertyEngine should compare 20-year wealth between buying vs renting', () => {
    const res = RentVsBuyPropertyEngine.compareRentVsBuy(8000000, 25000, 8.5);
    expect(res.homeLoanEMIINR).toBeGreaterThan(50000);
    expect(res.downPaymentINR).toBe(1600000);
  });

  it('LeaveEncashmentTaxExemptionEngine should calculate Sec 10(10AA) ₹25 Lakh exemption', () => {
    const res = LeaveEncashmentTaxExemptionEngine.calculateLeaveEncashment(600000, 120, 75000, false);
    expect(res.taxFreeExemptAmount).toBeGreaterThan(0);
    expect(res.maxStatutoryExemptionLimitINR).toBe(2500000);
  });

  it('ElectricVehicleTaxDeduction80EEBEngine should calculate Sec 80EEB EV loan interest deduction', () => {
    const res = ElectricVehicleTaxDeduction80EEBEngine.calculateEVTaxDeduction(120000, 30);
    expect(res.claimedExemptionAmount).toBe(120000);
    expect(res.directTaxSavedAmount).toBe(36000);
  });

  it('PostOfficeMonthlyIncomeSchemeEngine should calculate 7.4% monthly interest payout', () => {
    const res = PostOfficeMonthlyIncomeSchemeEngine.calculatePOMIS(900000, false, 7.4);
    expect(res.monthlyInterestPayoutINR).toBe(5550);
    expect(res.total5YearInterestEarnedINR).toBe(333000);
  });
});
