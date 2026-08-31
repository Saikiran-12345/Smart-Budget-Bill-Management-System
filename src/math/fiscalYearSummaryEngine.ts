import { IncomeItem } from '../types/income';
import { ExpenseItem } from '../types/expense';

export interface FiscalYearSummaryResult {
  fiscalYearLabel: string; // e.g. FY 2025-26
  startDate: string;
  endDate: string;
  totalFiscalIncome: number;
  totalFiscalExpenses: number;
  netFiscalSavings: number;
  taxableIncomeEstimate: number;
}

export class FiscalYearSummaryEngine {
  public static calculateFiscalYearSummary(
    incomes: IncomeItem[],
    expenses: ExpenseItem[],
    fiscalYearStartYear = 2025,
    startMonth = 4 // April
  ): FiscalYearSummaryResult {
    const startDate = `${fiscalYearStartYear}-04-01`;
    const endDate = `${fiscalYearStartYear + 1}-03-31`;
    const fiscalYearLabel = `FY ${fiscalYearStartYear}-${(fiscalYearStartYear + 1).toString().slice(-2)}`;

    const fyIncomes = incomes.filter((i) => i.date >= startDate && i.date <= endDate);
    const fyExpenses = expenses.filter((e) => e.date >= startDate && e.date <= endDate);

    const totalFiscalIncome = fyIncomes.reduce((s, i) => s + i.amount, 0);
    const totalFiscalExpenses = fyExpenses.reduce((s, e) => s + e.amount, 0);
    const netFiscalSavings = totalFiscalIncome - totalFiscalExpenses;

    const taxDeductibleExpenses = fyExpenses.filter((e) => e.taxDeductible).reduce((s, e) => s + e.amount, 0);
    const taxableIncomeEstimate = Math.max(0, totalFiscalIncome - (taxDeductibleExpenses + 75000));

    return {
      fiscalYearLabel,
      startDate,
      endDate,
      totalFiscalIncome,
      totalFiscalExpenses,
      netFiscalSavings,
      taxableIncomeEstimate,
    };
  }
}
