export interface BalanceTransferAnalysis {
  transferBalance: number;
  currentAPRPercent: number;
  promoAPRPercent: number; // e.g. 0%
  promoPeriodMonths: number;
  transferFeePercent: number; // e.g. 3%
  upfrontTransferFeeAmount: number;
  currentInterestCostPromoPeriod: number;
  promoInterestCost: number;
  grossInterestSavings: number;
  netSavingsAfterFee: number;
  isTransferRecommended: boolean;
}

export class CreditCardBalanceTransferEngine {
  public static calculateBalanceTransfer(
    transferBalance: number,
    currentAPRPercent = 36,
    promoAPRPercent = 0,
    promoPeriodMonths = 12,
    transferFeePercent = 3.0
  ): BalanceTransferAnalysis {
    const currentMonthlyRate = currentAPRPercent / 100 / 12;
    const promoMonthlyRate = promoAPRPercent / 100 / 12;

    const upfrontTransferFeeAmount = Math.round((transferBalance * transferFeePercent) / 100);

    const currentInterestCostPromoPeriod = Math.round(transferBalance * currentMonthlyRate * promoPeriodMonths);
    const promoInterestCost = Math.round(transferBalance * promoMonthlyRate * promoPeriodMonths);

    const grossInterestSavings = Math.max(0, currentInterestCostPromoPeriod - promoInterestCost);
    const netSavingsAfterFee = Math.max(0, grossInterestSavings - upfrontTransferFeeAmount);

    const isTransferRecommended = netSavingsAfterFee > 3000;

    return {
      transferBalance,
      currentAPRPercent,
      promoAPRPercent,
      promoPeriodMonths,
      transferFeePercent,
      upfrontTransferFeeAmount,
      currentInterestCostPromoPeriod,
      promoInterestCost,
      grossInterestSavings,
      netSavingsAfterFee,
      isTransferRecommended,
    };
  }
}
