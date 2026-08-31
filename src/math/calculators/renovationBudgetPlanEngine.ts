export interface RenovationCategoryAllocationDetail {
  categoryTitle: string;
  budgetAllocated: number;
  percentageShare: number;
}

export class RenovationBudgetPlanEngine {
  public static calculatePlan(
    baseEstimate = 500000,
    bufferPercent = 15
  ): {
    baseEstimate: number;
    bufferAmount: number;
    totalBudgetWithBuffer: number;
    allocations: RenovationCategoryAllocationDetail[];
  } {
    const bufferAmount = Math.round((baseEstimate * bufferPercent) / 100);
    const totalBudgetWithBuffer = baseEstimate + bufferAmount;

    const items = [
      { title: 'Civil Works & Flooring', pct: 30 },
      { title: 'Carpentry & Modular Units', pct: 35 },
      { title: 'Electrical & Lighting Fixtures', pct: 15 },
      { title: 'Painting & Wall Decor', pct: 20 },
    ];

    const allocations: RenovationCategoryAllocationDetail[] = items.map((i) => ({
      categoryTitle: i.title,
      budgetAllocated: Math.round((baseEstimate * i.pct) / 100),
      percentageShare: i.pct,
    }));

    return {
      baseEstimate,
      bufferAmount,
      totalBudgetWithBuffer,
      allocations,
    };
  }
}
