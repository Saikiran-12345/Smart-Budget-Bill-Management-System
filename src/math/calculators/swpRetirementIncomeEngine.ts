export interface SWPMonthlyPoint {
  monthNumber: number;
  startingCorpus: number;
  monthlyWithdrawal: number;
  monthlyReturnEarned: number;
  endingCorpus: number;
}

export class SWPRetirementIncomeEngine {
  public static generateSWPSchedule(
    initialCorpus = 10000000, // ₹1 Crore
    monthlyWithdrawalAmount = 50000,
    expectedAnnualReturnPercent = 9.0,
    durationYears = 20
  ): {
    initialCorpus: number;
    totalWithdrawalsAmount: number;
    finalRemainingCorpus: number;
    isCorpusDepleted: boolean;
    monthByMonthSchedule: SWPMonthlyPoint[];
  } {
    let corpus = initialCorpus;
    const monthlyRate = expectedAnnualReturnPercent / 100 / 12;
    const totalMonths = durationYears * 12;

    let totalWithdrawals = 0;
    let isCorpusDepleted = false;

    const schedule: SWPMonthlyPoint[] = [];

    for (let m = 1; m <= totalMonths; m++) {
      if (corpus <= 0) {
        isCorpusDepleted = true;
        break;
      }

      const startingCorpus = corpus;
      const withdrawal = Math.min(corpus, monthlyWithdrawalAmount);
      totalWithdrawals += withdrawal;
      corpus -= withdrawal;

      const returnEarned = corpus * monthlyRate;
      corpus += returnEarned;

      schedule.push({
        monthNumber: m,
        startingCorpus: Math.round(startingCorpus),
        monthlyWithdrawal: Math.round(withdrawal),
        monthlyReturnEarned: Math.round(returnEarned),
        endingCorpus: Math.round(Math.max(0, corpus)),
      });
    }

    return {
      initialCorpus,
      totalWithdrawalsAmount: Math.round(totalWithdrawals),
      finalRemainingCorpus: Math.round(Math.max(0, corpus)),
      isCorpusDepleted,
      monthByMonthSchedule: schedule,
    };
  }
}
