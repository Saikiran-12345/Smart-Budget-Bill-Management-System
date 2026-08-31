import { GoldLoanVsPersonalLoanEngine, LoanComparisonDetail } from '../math/calculators/goldLoanVsPersonalLoanEngine';

export class LoanComparisonGoldService {
  public static getGoldVsPersonalComparison(
    requiredPrincipal = 300000,
    tenureMonths = 24
  ): {
    goldLoan: LoanComparisonDetail;
    personalLoan: LoanComparisonDetail;
    cheaperOption: 'GOLD_LOAN' | 'PERSONAL_LOAN';
    interestSavingsAmount: number;
  } {
    return GoldLoanVsPersonalLoanEngine.compareOptions(requiredPrincipal, tenureMonths);
  }
}
