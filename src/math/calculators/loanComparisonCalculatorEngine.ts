export interface LoanOptionDetail {
  lenderName: string;
  principalAmount: number;
  annualInterestRatePercent: number;
  tenureMonths: number;
  processingFeeAmount: number;
  monthlyEMI: number;
  totalInterestPaid: number;
  totalOutflow: number;
}

export class LoanComparisonCalculatorEngine {
  public static compareLoans(
    loan1: { lenderName: string; principal: number; rate: number; tenureMonths: number; fee: number },
    loan2: { lenderName: string; principal: number; rate: number; tenureMonths: number; fee: number }
  ): {
    option1: LoanOptionDetail;
    option2: LoanOptionDetail;
    cheaperOption: string;
    totalSavings: number;
  } {
    const calc = (opt: typeof loan1): LoanOptionDetail => {
      const r = opt.rate / 100 / 12;
      const emiNum = opt.principal * r * Math.pow(1 + r, opt.tenureMonths);
      const emiDen = Math.pow(1 + r, opt.tenureMonths) - 1;
      const emi = Math.round(emiNum / emiDen);

      const totalInterest = emi * opt.tenureMonths - opt.principal;
      const totalOutflow = emi * opt.tenureMonths + opt.fee;

      return {
        lenderName: opt.lenderName,
        principalAmount: opt.principal,
        annualInterestRatePercent: opt.rate,
        tenureMonths: opt.tenureMonths,
        processingFeeAmount: opt.fee,
        monthlyEMI: emi,
        totalInterestPaid: Math.round(totalInterest),
        totalOutflow: Math.round(totalOutflow),
      };
    };

    const o1 = calc(loan1);
    const o2 = calc(loan2);

    const cheaperOption = o1.totalOutflow <= o2.totalOutflow ? o1.lenderName : o2.lenderName;
    const totalSavings = Math.abs(o1.totalOutflow - o2.totalOutflow);

    return {
      option1: o1,
      option2: o2,
      cheaperOption,
      totalSavings,
    };
  }
}
