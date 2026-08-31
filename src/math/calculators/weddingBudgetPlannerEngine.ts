export interface WeddingCategoryBreakdown {
  categoryName: string;
  allocatedAmount: number;
  percentageOfTotal: number;
}

export class WeddingBudgetPlannerEngine {
  public static calculateWeddingAllocations(
    totalWeddingBudget: number,
    guestCount: number
  ): {
    totalWeddingBudget: number;
    guestCount: number;
    costPerGuest: number;
    categories: WeddingCategoryBreakdown[];
  } {
    const allocations = [
      { name: 'Venue & Decoration', percent: 35 },
      { name: 'Catering & Food Services', percent: 30 },
      { name: 'Attire, Makeup & Jewelry', percent: 15 },
      { name: 'Photography & Videography', percent: 10 },
      { name: 'Music, Entertainment & Misc', percent: 10 },
    ];

    const categories: WeddingCategoryBreakdown[] = allocations.map((a) => ({
      categoryName: a.name,
      allocatedAmount: Math.round((totalWeddingBudget * a.percent) / 100),
      percentageOfTotal: a.percent,
    }));

    const costPerGuest = guestCount > 0 ? totalWeddingBudget / guestCount : 0;

    return {
      totalWeddingBudget,
      guestCount,
      costPerGuest: parseFloat(costPerGuest.toFixed(2)),
      categories,
    };
  }
}
