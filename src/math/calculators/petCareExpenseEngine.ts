export interface PetExpenseSummary {
  petName: string;
  monthlyFoodExpense: number;
  annualVetExpense: number;
  annualGroomingExpense: number;
  totalAnnualCost: number;
  monthlyAverageCost: number;
}

export class PetCareExpenseEngine {
  public static calculatePetExpenses(
    petName: string,
    monthlyFoodExpense = 2500,
    annualVetExpense = 7500,
    annualGroomingExpense = 5000
  ): PetExpenseSummary {
    const totalAnnualCost = monthlyFoodExpense * 12 + annualVetExpense + annualGroomingExpense;
    const monthlyAverageCost = totalAnnualCost / 12;

    return {
      petName,
      monthlyFoodExpense,
      annualVetExpense,
      annualGroomingExpense,
      totalAnnualCost: Math.round(totalAnnualCost),
      monthlyAverageCost: Math.round(monthlyAverageCost),
    };
  }
}
