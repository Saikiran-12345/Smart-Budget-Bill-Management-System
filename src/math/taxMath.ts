import { IncomeItem } from '../types/income';
import { ExpenseItem } from '../types/expense';
import { calculateTotalIncome } from './incomeMath';
import { calculateTaxDeductibleExpensesTotal } from './expenseMath';

export interface TaxEstimateResult {
  grossIncome: number;
  taxDeductibleExpenses: number;
  standardDeduction: number;
  taxableIncome: number;
  estimatedTaxLiability: number;
  effectiveTaxRate: number;
  netTakeHome: number;
  taxBracketBreakdown: { slab: string; rate: number; taxAmount: number }[];
}

export const calculateEstimatedTaxLiability = (
  incomes: IncomeItem[],
  expenses: ExpenseItem[],
  standardDeduction = 75000 // New Regime Standard Deduction in India (₹75k)
): TaxEstimateResult => {
  const grossIncome = calculateTotalIncome(incomes);
  const taxDeductibleExpenses = calculateTaxDeductibleExpensesTotal(expenses);

  const totalDeductions = taxDeductibleExpenses + standardDeduction;
  const taxableIncome = Math.max(0, grossIncome - totalDeductions);

  // Progressive Tax Slabs (Simplified Indian New Tax Regime Simulation)
  // Up to 3L: 0%
  // 3L to 7L: 5%
  // 7L to 10L: 10%
  // 10L to 12L: 15%
  // 12L to 15L: 20%
  // Above 15L: 30%

  const taxBracketBreakdown: { slab: string; rate: number; taxAmount: number }[] = [];
  let tax = 0;

  if (taxableIncome > 1500000) {
    const amountInSlab = taxableIncome - 1500000;
    const slabTax = amountInSlab * 0.30;
    tax += slabTax;
    taxBracketBreakdown.push({ slab: 'Above ₹15,00,000', rate: 30, taxAmount: slabTax });
  }
  if (taxableIncome > 1200000) {
    const amountInSlab = Math.min(300000, taxableIncome - 1200000);
    const slabTax = amountInSlab * 0.20;
    tax += slabTax;
    taxBracketBreakdown.push({ slab: '₹12,00,001 - ₹15,00,000', rate: 20, taxAmount: slabTax });
  }
  if (taxableIncome > 1000000) {
    const amountInSlab = Math.min(200000, taxableIncome - 1000000);
    const slabTax = amountInSlab * 0.15;
    tax += slabTax;
    taxBracketBreakdown.push({ slab: '₹10,00,001 - ₹12,00,000', rate: 15, taxAmount: slabTax });
  }
  if (taxableIncome > 700000) {
    const amountInSlab = Math.min(300000, taxableIncome - 700000);
    const slabTax = amountInSlab * 0.10;
    tax += slabTax;
    taxBracketBreakdown.push({ slab: '₹7,00,001 - ₹10,00,000', rate: 10, taxAmount: slabTax });
  }
  if (taxableIncome > 300000) {
    const amountInSlab = Math.min(400000, taxableIncome - 300000);
    const slabTax = amountInSlab * 0.05;
    tax += slabTax;
    taxBracketBreakdown.push({ slab: '₹3,00,001 - ₹7,00,000', rate: 5, taxAmount: slabTax });
  }

  // 4% Health & Education Cess
  const cess = tax * 0.04;
  const totalTaxLiability = Math.round(tax + cess);
  const effectiveTaxRate = grossIncome > 0 ? (totalTaxLiability / grossIncome) * 100 : 0;
  const netTakeHome = grossIncome - totalTaxLiability;

  return {
    grossIncome,
    taxDeductibleExpenses,
    standardDeduction,
    taxableIncome,
    estimatedTaxLiability: totalTaxLiability,
    effectiveTaxRate,
    netTakeHome,
    taxBracketBreakdown,
  };
};
