import { IncomeItem } from '../../types/income';
import { ExpenseItem } from '../../types/expense';

export interface FiscalYearTaxStatement {
  fiscalYear: string; // e.g. FY 2025-26
  grossTaxableIncome: number;
  totalTaxDeductionsClaimed: number;
  netTaxableIncome: number;
  estimatedTaxPayable: number;
  quarterlyBreakdown: {
    q1Income: number;
    q2Income: number;
    q3Income: number;
    q4Income: number;
    q1Expense: number;
    q2Expense: number;
    q3Expense: number;
    q4Expense: number;
  };
}

export class FiscalYearLedgerExporterEngine {
  public static generateStatement(
    incomes: IncomeItem[],
    expenses: ExpenseItem[],
    fiscalStartYear = 2025
  ): FiscalYearTaxStatement {
    const fyLabel = `FY ${fiscalStartYear}-${(fiscalStartYear + 1).toString().slice(-2)}`;
    const q1Start = `${fiscalStartYear}-04-01`;
    const q1End = `${fiscalStartYear}-06-30`;
    const q2Start = `${fiscalStartYear}-07-01`;
    const q2End = `${fiscalStartYear}-09-30`;
    const q3Start = `${fiscalStartYear}-10-01`;
    const q3End = `${fiscalStartYear}-12-31`;
    const q4Start = `${fiscalStartYear + 1}-01-01`;
    const q4End = `${fiscalStartYear + 1}-03-31`;

    const getIncomeSum = (start: string, end: string) =>
      incomes.filter((i) => i.date >= start && i.date <= end).reduce((s, i) => s + i.amount, 0);

    const getExpenseSum = (start: string, end: string) =>
      expenses.filter((e) => e.date >= start && e.date <= end).reduce((s, e) => s + e.amount, 0);

    const q1Inc = getIncomeSum(q1Start, q1End);
    const q2Inc = getIncomeSum(q2Start, q2End);
    const q3Inc = getIncomeSum(q3Start, q3End);
    const q4Inc = getIncomeSum(q4Start, q4End);

    const q1Exp = getExpenseSum(q1Start, q1End);
    const q2Exp = getExpenseSum(q2Start, q2End);
    const q3Exp = getExpenseSum(q3Start, q3End);
    const q4Exp = getExpenseSum(q4Start, q4End);

    const grossTaxableIncome = q1Inc + q2Inc + q3Inc + q4Inc;
    const deductibleExpenses = expenses
      .filter((e) => e.date >= q1Start && e.date <= q4End && e.taxDeductible)
      .reduce((s, e) => s + e.amount, 0);

    const totalTaxDeductionsClaimed = Math.min(225000, deductibleExpenses + 75000);
    const netTaxableIncome = Math.max(0, grossTaxableIncome - totalTaxDeductionsClaimed);

    let estimatedTaxPayable = 0;
    if (netTaxableIncome > 1200000) estimatedTaxPayable = (netTaxableIncome - 1200000) * 0.20 + 90000;
    else if (netTaxableIncome > 700000) estimatedTaxPayable = (netTaxableIncome - 700000) * 0.10 + 30000;

    return {
      fiscalYear: fyLabel,
      grossTaxableIncome: Math.round(grossTaxableIncome),
      totalTaxDeductionsClaimed: Math.round(totalTaxDeductionsClaimed),
      netTaxableIncome: Math.round(netTaxableIncome),
      estimatedTaxPayable: Math.round(estimatedTaxPayable),
      quarterlyBreakdown: {
        q1Income: Math.round(q1Inc),
        q2Income: Math.round(q2Inc),
        q3Income: Math.round(q3Inc),
        q4Income: Math.round(q4Inc),
        q1Expense: Math.round(q1Exp),
        q2Expense: Math.round(q2Exp),
        q3Expense: Math.round(q3Exp),
        q4Expense: Math.round(q4Exp),
      },
    };
  }
}
