export interface PetCareBudgetAnalysis {
  petType: 'DOG' | 'CAT' | 'BIRD' | 'OTHER';
  monthlyFoodCost: number;
  annualRoutineVetCost: number;
  annualGroomingCost: number;
  emergencyVetReserveTarget: number;
  totalAnnualPetCareCost: number;
  monthlyAveragePetCareCost: number;
}

export class PetInsuranceCalculatorEngine {
  public static calculatePetBudget(
    petType: 'DOG' | 'CAT' | 'BIRD' | 'OTHER' = 'DOG',
    monthlyFoodCost = 3000,
    annualRoutineVetCost = 8000,
    annualGroomingCost = 6000,
    emergencyVetReserveTarget = 50000
  ): PetCareBudgetAnalysis {
    const annualFoodCost = monthlyFoodCost * 12;
    const totalAnnualPetCareCost = annualFoodCost + annualRoutineVetCost + annualGroomingCost;
    const monthlyAveragePetCareCost = totalAnnualPetCareCost / 12;

    return {
      petType,
      monthlyFoodCost,
      annualRoutineVetCost,
      annualGroomingCost,
      emergencyVetReserveTarget,
      totalAnnualPetCareCost: Math.round(totalAnnualPetCareCost),
      monthlyAveragePetCareCost: Math.round(monthlyAveragePetCareCost),
    };
  }
}
