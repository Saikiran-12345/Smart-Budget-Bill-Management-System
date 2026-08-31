export interface GoldenRatioCategoryAllocation {
  categoryName: string;
  targetPercentage: number;
  allocatedMonthlyAmount: number;
  descriptionText: string;
}

export class GoldenRatioBudgetAllocationEngine {
  public static calculateGoldenRatioAllocation(
    grossMonthlyIncome: number
  ): {
    grossMonthlyIncome: number;
    totalAllocated: number;
    categories: GoldenRatioCategoryAllocation[];
  } {
    const allocations = [
      { name: 'Housing & Rent', percent: 30, desc: 'Mortgage, rent, property tax, maintenance' },
      { name: 'Transportation & Fuel', percent: 10, desc: 'Car EMI, fuel, transit, servicing' },
      { name: 'Food & Household Groceries', percent: 15, desc: 'Groceries, essential dining, water/electricity' },
      { name: 'Savings & SIP Investments', percent: 25, desc: 'Mutual funds, emergency fund, retirement, stocks' },
      { name: 'Discretionary Lifestyle & Fun', percent: 20, desc: 'Shopping, vacations, entertainment, hobbies' },
    ];

    let totalAllocated = 0;

    const categories: GoldenRatioCategoryAllocation[] = allocations.map((a) => {
      const amt = Math.round((grossMonthlyIncome * a.percent) / 100);
      totalAllocated += amt;

      return {
        categoryName: a.name,
        targetPercentage: a.percent,
        allocatedMonthlyAmount: amt,
        descriptionText: a.desc,
      };
    });

    return {
      grossMonthlyIncome,
      totalAllocated: Math.round(totalAllocated),
      categories,
    };
  }
}
