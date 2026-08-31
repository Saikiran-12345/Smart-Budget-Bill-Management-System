import { SWPRetirementIncomeEngine, SWPMonthlyPoint } from '../math/calculators/swpRetirementIncomeEngine';

export class SWPService {
  public static getSWPSchedule(
    initialCorpus = 10000000,
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
    return SWPRetirementIncomeEngine.generateSWPSchedule(
      initialCorpus,
      monthlyWithdrawalAmount,
      expectedAnnualReturnPercent,
      durationYears
    );
  }
}
