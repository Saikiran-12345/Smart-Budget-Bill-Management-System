import { describe, it, expect } from 'vitest';
import { PetInsuranceCalculatorEngine } from '../math/calculators/petInsuranceCalculatorEngine';

describe('PetInsuranceCalculatorEngine Math', () => {
  it('should calculate annual pet care budget and monthly cost', () => {
    const res = PetInsuranceCalculatorEngine.calculatePetBudget('DOG', 3000, 8000, 6000, 50000);
    expect(res.totalAnnualPetCareCost).toBe(50000);
    expect(res.monthlyAveragePetCareCost).toBeCloseTo(4166.67, -1);
  });
});
