import { describe, it, expect } from 'vitest';
import { MultiCurrencyEngine } from '../math/multiCurrencyEngine';

describe('MultiCurrencyEngine Conversion', () => {
  it('should convert USD to INR correctly', () => {
    const converted = MultiCurrencyEngine.convertCurrency(100, 'USD', 'INR');
    expect(converted).toBe(8450);
  });

  it('should convert EUR to USD correctly', () => {
    const converted = MultiCurrencyEngine.convertCurrency(100, 'EUR', 'USD');
    expect(converted).toBeCloseTo(107.93, 1);
  });
});
