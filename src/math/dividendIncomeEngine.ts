export interface DividendRecord {
  id: string;
  stockName: string;
  tickerSymbol: string;
  sharesOwned: number;
  dividendPerShare: number;
  payoutDate: string;
  frequency: 'QUARTERLY' | 'SEMI_ANNUALLY' | 'ANNUALLY';
}

export interface DividendIncomeSummary {
  totalAnnualDividendIncome: number;
  monthlyAverageDividendIncome: number;
  topDividendStock: string;
  overallYieldPercentage: number;
  schedule: { monthName: string; projectedAmount: number }[];
}

export class DividendIncomeEngine {
  public static calculateDividendYield(
    records: DividendRecord[],
    portfolioValue: number
  ): DividendIncomeSummary {
    let totalAnnual = 0;
    let topStock = 'None';
    let maxDividend = 0;

    const monthTotals: Record<number, number> = {
      1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0,
      7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0
    };

    records.forEach((rec) => {
      const annualPayout = rec.sharesOwned * rec.dividendPerShare;
      totalAnnual += annualPayout;

      if (annualPayout > maxDividend) {
        maxDividend = annualPayout;
        topStock = rec.stockName;
      }

      const pDate = new Date(rec.payoutDate);
      if (!isNaN(pDate.getTime())) {
        const m = pDate.getMonth() + 1;
        monthTotals[m] = (monthTotals[m] || 0) + annualPayout;
      }
    });

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const schedule = monthNames.map((monthName, idx) => ({
      monthName,
      projectedAmount: Math.round(monthTotals[idx + 1] || totalAnnual / 12),
    }));

    const yieldPct = portfolioValue > 0 ? (totalAnnual / portfolioValue) * 100 : 0;

    return {
      totalAnnualDividendIncome: Math.round(totalAnnual),
      monthlyAverageDividendIncome: Math.round(totalAnnual / 12),
      topDividendStock: topStock,
      overallYieldPercentage: parseFloat(yieldPct.toFixed(2)),
      schedule,
    };
  }
}
