import { IncomeItem } from '../../types/income';
import { ExpenseItem } from '../../types/expense';

export interface FiscalYearTaxLedgerSummary {
  fiscalYearLabel: string;
  totalGrossIncome: number;
  totalTaxableIncome: number;
  totalTaxDeductionsClaimed: number;
  estimatedTaxLiability: number;
  quarterlySummary: {
    quarterLabel: string;
    incomeAmount: number;
    expenseAmount: number;
    netSavingsAmount: number;
  }[];
}

export class FiscalYearTaxLedgerEngine {
  public static generateLedger(
    incomes: IncomeItem[],
    expenses: ExpenseItem[],
    fiscalStartYear = 2025
  ): FiscalYearTaxLedgerSummary {
    const fyLabel = `FY ${fiscalStartYear}-${(fiscalStartYear + 1).toString().slice(-2)}`;

    const quarters = [
      { label: 'Q1 (Apr-Jun)', start: `${fiscalStartYear}-04-01`, end: `${fiscalStartYear}-06-30` },
      { label: 'Q2 (Jul-Sep)', start: `${fiscalStartYear}-07-01`, end: `${fiscalStartYear}-09-30` },
      { label: 'Q3 (Oct-Dec)', start: `${fiscalStartYear}-10-01`, end: `${fiscalStartYear}-12-31` },
      { label: 'Q4 (Jan-Mar)', start: `${fiscalStartYear + 1}-01-01`, end: `${fiscalStartYear + 1}-03-31` },
    ];

    let totalGrossIncome = 0;

    const quarterlySummary = quarters.map((q) => {
      const qInc = incomes.filter((i) => i.date >= q.start && i.date <= q.end).reduce((s, i) => s + i.amount, 0);
      const qExp = expenses.filter((e) => e.date >= q.start && e.date <= q.end).reduce((s, e) => s + e.amount, 0);

      totalGrossIncome += qInc;

      return {
        quarterLabel: q.label,
        incomeAmount: Math.round(qInc),
        expenseAmount: Math.round(qExp),
        netSavingsAmount: Math.round(qInc - qExp),
      };
    });

    const deductibleExpenses = expenses.filter((e) => e.taxDeductible).reduce((s, e) => s + e.amount, 0);
    const totalTaxDeductionsClaimed = Math.min(225000, deductibleExpenses + 75000);
    const totalTaxableIncome = Math.max(0, totalGrossIncome - totalTaxDeductionsClaimed);

    let estimatedTaxLiability = 0;
    if (totalTaxableIncome > 1200000) estimatedTaxLiability = (totalTaxableIncome - 1200000) * 0.20 + 90000;
    else if (totalTaxableIncome > 700000) estimatedTaxLiability = (totalTaxableIncome - 700000) * 0.10 + 30000;

    return {
      fiscalYearLabel: fyLabel,
      totalGrossIncome: Math.round(totalGrossIncome),
      totalTaxableIncome: Math.round(totalTaxableIncome),
      totalTaxDeductionsClaimed: Math.round(totalTaxDeductionsClaimed),
      estimatedTaxLiability: Math.round(estimatedTaxLiability * 1.04),
      quarterlySummary,
    };
  }
}
