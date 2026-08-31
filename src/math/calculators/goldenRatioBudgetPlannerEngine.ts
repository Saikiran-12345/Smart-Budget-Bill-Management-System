export interface GoldenRatioCategoryDetail {
  categoryTitle: string;
  targetPercent: number;
  monthlyAmountAllocated: number;
  guidelineDescription: string;
}

export class GoldenRatioBudgetPlannerEngine {
  public static calculateGoldenRatio(
    grossMonthlySalary = 120000
  ): {
    grossMonthlySalary: number;
    totalAllocatedAmount: number;
    categories: GoldenRatioCategoryDetail[];
  } {
    const allocations = [
      { title: 'Housing & Rent (30%)', pct: 30, desc: 'Mortgage EMI, rent, maintenance, property tax' },
      { title: 'Transportation & Fuel (10%)', pct: 10, desc: 'Car EMI, petrol/diesel, transit, servicing' },
      { title: 'Food & Groceries (15%)', pct: 15, desc: 'Supermarket groceries, water, cooking gas' },
      { title: 'Savings & Mutual Funds (25%)', pct: 25, desc: 'SIPs, stocks, emergency fund, retirement' },
      { title: 'Discretionary Lifestyle (20%)', pct: 20, desc: 'Dining out, vacations, hobbies, entertainment' },
    ];

    let totalAllocatedAmount = 0;

    const categories: GoldenRatioCategoryDetail[] = allocations.map((a) => {
      const monthlyAmountAllocated = Math.round((grossMonthlySalary * a.pct) / 100);
      totalAllocatedAmount += monthlyAmountAllocated;

      return {
        categoryTitle: a.title,
        targetPercent: a.pct,
        monthlyAmountAllocated,
        guidelineDescription: a.desc,
      };
    });

    return {
      grossMonthlySalary,
      totalAllocatedAmount: Math.round(totalAllocatedAmount),
      categories,
    };
  }
}
