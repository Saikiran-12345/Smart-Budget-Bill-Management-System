export interface GoldenRatioBudget {
  grossMonthlyIncome: number;
  housingAllocation: number; // 30% max
  transportationAllocation: number; // 10% max
  foodAndGroceriesAllocation: number; // 15% max
  savingsAndInvestmentsAllocation: number; // 25% min
  discretionaryLifestyleAllocation: number; // 20% max
  isBalanced: boolean;
}

export class GoldenRatioBudgetEngine {
  public static calculateGoldenRatioBudget(grossMonthlyIncome: number): GoldenRatioBudget {
    const housingAllocation = Math.round(grossMonthlyIncome * 0.30);
    const transportationAllocation = Math.round(grossMonthlyIncome * 0.10);
    const foodAndGroceriesAllocation = Math.round(grossMonthlyIncome * 0.15);
    const savingsAndInvestmentsAllocation = Math.round(grossMonthlyIncome * 0.25);
    const discretionaryLifestyleAllocation = Math.round(grossMonthlyIncome * 0.20);

    return {
      grossMonthlyIncome,
      housingAllocation,
      transportationAllocation,
      foodAndGroceriesAllocation,
      savingsAndInvestmentsAllocation,
      discretionaryLifestyleAllocation,
      isBalanced: true,
    };
  }
}
