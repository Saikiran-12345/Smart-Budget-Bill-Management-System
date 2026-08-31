export interface WeddingAllocationDetail {
  categoryTitle: string;
  allocatedAmount: number;
  percentageShare: number;
}

export class WeddingExpenseAllocatorEngine {
  public static calculateAllocations(
    totalWeddingBudget = 1500000,
    guestCount = 300
  ): {
    totalWeddingBudget: number;
    guestCount: number;
    costPerGuest: number;
    allocations: WeddingAllocationDetail[];
  } {
    const items = [
      { title: 'Venue Booking & Decoration', pct: 35 },
      { title: 'Catering & Food Catering', pct: 30 },
      { title: 'Bridal Attire, Makeup & Gold', pct: 15 },
      { name: 'Photography & Videography', pct: 10 },
      { name: 'Music DJ & Invitations', pct: 10 },
    ];

    const allocations: WeddingAllocationDetail[] = items.map((i) => ({
      categoryTitle: i.title || (i as any).name,
      allocatedAmount: Math.round((totalWeddingBudget * i.pct) / 100),
      percentageShare: i.pct,
    }));

    const costPerGuest = guestCount > 0 ? totalWeddingBudget / guestCount : 0;

    return {
      totalWeddingBudget,
      guestCount,
      costPerGuest: parseFloat(costPerGuest.toFixed(2)),
      allocations,
    };
  }
}
