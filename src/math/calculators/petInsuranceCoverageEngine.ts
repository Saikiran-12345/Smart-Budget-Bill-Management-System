export interface PetInsuranceDetail {
  petName: string;
  monthlyFoodCost: number;
  annualVetMedicalCost: number;
  annualGroomingCost: number;
  totalAnnualExpense: number;
  monthlyAverageCost: number;
}

export class PetInsuranceCoverageEngine {
  public static calculatePetCost(
    petName = 'Golden Retriever',
    monthlyFoodCost = 3000,
    annualVetMedicalCost = 8000,
    annualGroomingCost = 6000
  ): PetInsuranceDetail {
    const totalAnnualExpense = monthlyFoodCost * 12 + annualVetMedicalCost + annualGroomingCost;
    const monthlyAverageCost = totalAnnualExpense / 12;

    return {
      petName,
      monthlyFoodCost,
      annualVetMedicalCost,
      annualGroomingCost,
      totalAnnualExpense: Math.round(totalAnnualExpense),
      monthlyAverageCost: Math.round(monthlyAverageCost),
    };
  }
}
