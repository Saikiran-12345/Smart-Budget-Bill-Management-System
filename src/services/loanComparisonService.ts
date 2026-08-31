import { LoanComparisonCalculatorEngine, LoanOptionDetail } from '../math/calculators/loanComparisonCalculatorEngine';

export class LoanComparisonService {
  public static compareBankOffers(
    lender1: { lenderName: string; principal: number; rate: number; tenureMonths: number; fee: number },
    lender2: { lenderName: string; principal: number; rate: number; tenureMonths: number; fee: number }
  ): {
    option1: LoanOptionDetail;
    option2: LoanOptionDetail;
    cheaperOption: string;
    totalSavings: number;
  } {
    return LoanComparisonCalculatorEngine.compareLoans(lender1, lender2);
  }
}
