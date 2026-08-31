export interface WeddingBudgetSummary {
  guestCount: number;
  costPerGuest: number;
  totalVenueCost: number;
  totalCateringCost: number;
  totalPhotographyCost: number;
  totalAttireAndJewelryCost: number;
  totalMiscellaneousCost: number;
  grandTotalWeddingBudget: number;
}

export class WeddingBudgetEngine {
  public static calculateWeddingBudget(
    guestCount: number,
    venueCost: number,
    cateringCostPerGuest: number,
    photographyCost: number,
    attireJewelryCost: number,
    miscellaneousBufferPercent = 10
  ): WeddingBudgetSummary {
    const totalCateringCost = guestCount * cateringCostPerGuest;
    const baseTotal = venueCost + totalCateringCost + photographyCost + attireJewelryCost;
    const miscBuffer = (baseTotal * miscellaneousBufferPercent) / 100;
    const grandTotal = baseTotal + miscBuffer;
    const costPerGuest = guestCount > 0 ? grandTotal / guestCount : 0;

    return {
      guestCount,
      costPerGuest: parseFloat(costPerGuest.toFixed(2)),
      totalVenueCost: venueCost,
      totalCateringCost,
      totalPhotographyCost: photographyCost,
      totalAttireAndJewelryCost: attireJewelryCost,
      totalMiscellaneousCost: Math.round(miscBuffer),
      grandTotalWeddingBudget: Math.round(grandTotal),
    };
  }
}
