export interface RenovationCategoryAllocation {
  categoryName: string;
  allocatedAmount: number;
  percentageOfBudget: number;
}

export class RenovationBudgetEngine {
  public static calculateRenovationBudget(
    baseEstimateAmount = 500000,
    contingencyBufferPercent = 15
  ): {
    baseEstimateAmount: number;
    contingencyBufferAmount: number;
    totalProjectBudgetWithBuffer: number;
    categories: RenovationCategoryAllocation[];
  } {
    const contingencyBufferAmount = Math.round((baseEstimateAmount * contingencyBufferPercent) / 100);
    const totalProjectBudgetWithBuffer = baseEstimateAmount + contingencyBufferAmount;

    const allocations = [
      { name: 'Civil & Flooring Works', percent: 35 },
      { name: 'Custom Carpentry & Modular Kitchen', percent: 35 },
      { name: 'Electrical & Plumbing Fixtures', percent: 15 },
      { name: 'Wall Painting & Wallpaper', percent: 15 },
    ];

    const categories: RenovationCategoryAllocation[] = allocations.map((a) => ({
      categoryName: a.name,
      allocatedAmount: Math.round((baseEstimateAmount * a.percent) / 100),
      percentageOfBudget: a.percent,
    }));

    return {
      baseEstimateAmount,
      contingencyBufferAmount,
      totalProjectBudgetWithBuffer,
      categories,
    };
  }
}
