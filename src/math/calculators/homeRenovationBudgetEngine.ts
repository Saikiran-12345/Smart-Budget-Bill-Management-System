export interface RenovationCategoryItem {
  categoryName: string;
  allocatedAmount: number;
  percentageOfBase: number;
  descriptionText: string;
}

export class HomeRenovationBudgetEngine {
  public static calculateRenovationPlan(
    baseEstimateAmount = 600000,
    contingencyBufferPercent = 15
  ): {
    baseEstimateAmount: number;
    contingencyBufferAmount: number;
    totalProjectBudgetWithBuffer: number;
    categories: RenovationCategoryItem[];
  } {
    const contingencyBufferAmount = Math.round((baseEstimateAmount * contingencyBufferPercent) / 100);
    const totalProjectBudgetWithBuffer = baseEstimateAmount + contingencyBufferAmount;

    const allocations = [
      { name: 'Civil, Demolition & Flooring', percent: 30, desc: 'Italian marble, vitrified tiles, waterproofing' },
      { name: 'Modular Kitchen & Woodwork', percent: 35, desc: 'Plywood, acrylic shutters, hardware fittings' },
      { name: 'Electrical Wiring & Lighting', percent: 12, desc: 'Copper wiring, LED profiles, chandeliers' },
      { name: 'Plumbing & Sanitaryware', percent: 13, desc: 'CP fittings, shower panels, vanity units' },
      { name: 'Wall Painting & Polishing', percent: 10, desc: 'Royale emulsion, PU polish, accent wallpapers' },
    ];

    const categories: RenovationCategoryItem[] = allocations.map((a) => ({
      categoryName: a.name,
      allocatedAmount: Math.round((baseEstimateAmount * a.percent) / 100),
      percentageOfBase: a.percent,
      descriptionText: a.desc,
    }));

    return {
      baseEstimateAmount,
      contingencyBufferAmount,
      totalProjectBudgetWithBuffer,
      categories,
    };
  }
}
