export interface CarLeaseVsBuyResult {
  vehiclePrice: number;
  ownershipTermMonths: number;
  buyingOption: {
    downPayment: number;
    monthlyEMI: number;
    totalInterestPaid: number;
    resaleValueAtEnd: number;
    netTotalCostToOwn: number;
  };
  leasingOption: {
    monthlyLeasePayment: number;
    upfrontFees: number;
    dispositionFee: number;
    netTotalCostToLease: number;
  };
  recommendedChoice: 'BUY' | 'LEASE';
  savingsAmount: number;
}

export class CarLeaseVsBuyEngine {
  public static compareLeaseVsBuy(
    vehiclePrice: number,
    ownershipTermMonths = 48,
    annualInterestRatePercent = 8.5,
    downPaymentAmount = vehiclePrice * 0.20,
    monthlyLeasePayment = vehiclePrice * 0.02,
    expectedDepreciationPercent = 40
  ): CarLeaseVsBuyResult {
    // 1. Buying Option
    const loanAmount = vehiclePrice - downPaymentAmount;
    const monthlyRate = annualInterestRatePercent / 100 / 12;

    const emiNumerator = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, ownershipTermMonths);
    const emiDenominator = Math.pow(1 + monthlyRate, ownershipTermMonths) - 1;
    const monthlyEMI = Math.round(emiNumerator / emiDenominator);

    const totalInterestPaid = monthlyEMI * ownershipTermMonths - loanAmount;
    const resaleValueAtEnd = Math.round(vehiclePrice * (1 - expectedDepreciationPercent / 100));

    const netTotalCostToOwn = Math.round(downPaymentAmount + loanAmount + totalInterestPaid - resaleValueAtEnd);

    // 2. Leasing Option
    const upfrontFees = 15000;
    const dispositionFee = 10000;
    const netTotalCostToLease = Math.round(upfrontFees + monthlyLeasePayment * ownershipTermMonths + dispositionFee);

    const recommendedChoice = netTotalCostToOwn <= netTotalCostToLease ? 'BUY' : 'LEASE';
    const savingsAmount = Math.abs(netTotalCostToOwn - netTotalCostToLease);

    return {
      vehiclePrice,
      ownershipTermMonths,
      buyingOption: {
        downPayment: downPaymentAmount,
        monthlyEMI,
        totalInterestPaid: Math.round(totalInterestPaid),
        resaleValueAtEnd,
        netTotalCostToOwn,
      },
      leasingOption: {
        monthlyLeasePayment,
        upfrontFees,
        dispositionFee,
        netTotalCostToLease,
      },
      recommendedChoice,
      savingsAmount,
    };
  }
}
