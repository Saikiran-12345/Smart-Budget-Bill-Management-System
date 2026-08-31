import { describe, it, expect } from 'vitest';
import { CreditCardMinimumTrapEngine } from '../math/calculators/creditCardMinimumTrapEngine';

describe('CreditCardMinimumTrapEngine Math', () => {
  it('should calculate interest savings of fixed payoff vs minimum payment trap', () => {
    const res = CreditCardMinimumTrapEngine.calculateTrap(60000, 36, 3500);
    expect(res.monthsToPayoffMinimum).toBeGreaterThan(res.fixedMonthlyPayoffPlan.monthsToPayoff);
    expect(res.interestSavingsAmount).toBeGreaterThan(10000);
  });
});
