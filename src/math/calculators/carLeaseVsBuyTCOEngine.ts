export interface CarLeaseVsBuyAnalysis {
  carModelName: string;
  leaseOption: {
    monthlyLeasePayment: number;
    leaseTermMonths: number;
    upfrontLeaseDeposit: number;
    dispositionFee: number;
    totalLeaseOutflow: number;
  };
  buyOption: {
    vehiclePurchasePrice: number;
    downPaymentAmount: number;
    monthlyLoanEMI: number;
    loanTermMonths: number;
    estimatedResaleValueAtEnd: number;
    netBuyCost: number;
  };
  cheaperOption: 'LEASE' | 'BUY';
  totalNetSavings: number;
}

export class CarLeaseVsBuyTCOEngine {
  public static calculateTCO(
    carModelName = 'Hyundai Creta SX',
    vehiclePurchasePrice = 1600000,
    downPaymentAmount = 300000,
    loanInterestRatePercent = 8.8,
    leaseMonthlyPayment = 32000,
    termMonths = 48,
    estimatedResalePercentAtEnd = 45
  ): CarLeaseVsBuyAnalysis {
    // 1. Lease Option calculation
    const upfrontLeaseDeposit = 50000;
    const dispositionFee = 10000;
    const totalLeaseOutflow = leaseMonthlyPayment * termMonths + upfrontLeaseDeposit + dispositionFee;

    // 2. Buy Option calculation
    const principal = vehiclePurchasePrice - downPaymentAmount;
    const monthlyRate = loanInterestRatePercent / 100 / 12;
    const monthlyLoanEMI = Math.round(
      (principal * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / (Math.pow(1 + monthlyRate, termMonths) - 1)
    );

    const totalLoanPayments = monthlyLoanEMI * termMonths;
    const estimatedResaleValueAtEnd = Math.round((vehiclePurchasePrice * estimatedResalePercentAtEnd) / 100);
    const netBuyCost = Math.round(downPaymentAmount + totalLoanPayments - estimatedResaleValueAtEnd);

    const cheaperOption = totalLeaseOutflow <= netBuyCost ? 'LEASE' : 'BUY';
    const totalNetSavings = Math.abs(totalLeaseOutflow - netBuyCost);

    return {
      carModelName,
      leaseOption: {
        monthlyLeasePayment: leaseMonthlyPayment,
        leaseTermMonths: termMonths,
        upfrontLeaseDeposit,
        dispositionFee,
        totalLeaseOutflow: Math.round(totalLeaseOutflow),
      },
      buyOption: {
        vehiclePurchasePrice,
        downPaymentAmount,
        monthlyLoanEMI,
        loanTermMonths: termMonths,
        estimatedResaleValueAtEnd,
        netBuyCost,
      },
      cheaperOption,
      totalNetSavings,
    };
  }
}
