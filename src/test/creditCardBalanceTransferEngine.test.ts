import { describe, it, expect } from 'vitest';
import { CreditCardBalanceTransferEngine } from '../math/calculators/creditCardBalanceTransferEngine';

describe('CreditCardBalanceTransferEngine Math', () => {
  it('should calculate balance transfer 0% APR net interest savings', () => {
    const res = CreditCardBalanceTransferEngine.calculateBalanceTransfer(100000, 36, 0, 12, 3);
    expect(res.upfrontTransferFeeAmount).toBe(3000);
    expect(res.currentInterestCostPromoPeriod).toBe(36000);
    expect(res.netSavingsAfterFee).toBe(33000);
    expect(res.isTransferRecommended).toBe(true);
  });
});
