import { IncomeItem } from '../../types/income';
import { ExpenseItem } from '../../types/expense';

export interface FiscalQuarterSummary {
  quarterLabel: string; // Q1 (Apr-Jun), Q2 (Jul-Sep), Q3 (Oct-Dec), Q4 (Jan-Mar)
  startDate: string;
  endDate: string;
  totalIncome: number;
  totalExpenses: number;
  netSavings: number;
}

export class FiscalYearLedgerEngine {
  public static calculateQuarterlyBreakdown(
    incomes: IncomeItem[],
    expenses: ExpenseItem[],
    fiscalStartYear = 2025
  ): FiscalQuarterSummary[] {
    const quarters = [
      { label: 'Q1 (Apr-Jun)', start: `${fiscalStartYear}-04-01`, end: `${fiscalStartYear}-06-30` },
      { label: 'Q2 (Jul-Sep)', start: `${fiscalStartYear}-07-01`, end: `${fiscalStartYear}-09-30` },
      { label: 'Q3 (Oct-Dec)', start: `${fiscalStartYear}-10-01`, end: `${fiscalStartYear}-12-31` },
      { label: 'Q4 (Jan-Mar)', start: `${fiscalStartYear + 1}-01-01`, end: `${fiscalStartYear + 1}-03-31` },
    ];

    return quarters.map((q) => {
      const qIncomes = incomes.filter((i) => i.date >= q.start && i.date <= q.end);
      const qExpenses = expenses.filter((e) => e.date >= q.start && e.date <= q.end);

      const totalIncome = qIncomes.reduce((s, i) => s + i.amount, 0);
      const totalExpenses = qExpenses.reduce((s, e) => s + e.amount, 0);

      return {
        quarterLabel: q.label,
        startDate: q.start,
        endDate: q.end,
        totalIncome: Math.round(totalIncome),
        totalExpenses: Math.round(totalExpenses),
        netSavings: Math.round(totalIncome - totalExpenses),
      };
    });
  }
}
