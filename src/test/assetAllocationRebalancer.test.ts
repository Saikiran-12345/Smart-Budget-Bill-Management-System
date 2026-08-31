import { describe, it, expect } from 'vitest';
import { AssetAllocationRebalancer } from '../math/assetAllocationRebalancer';

describe('AssetAllocationRebalancer Math', () => {
  it('should calculate rebalancing trade instructions', () => {
    const res = AssetAllocationRebalancer.calculateRebalancePlan([
      { id: '1', name: 'Equity Fund', category: 'EQUITY', currentValue: 700000 },
      { id: '2', name: 'Debt Fund', category: 'DEBT', currentValue: 100000 },
    ]);

    expect(res.totalValue).toBe(800000);
    expect(res.isRebalanceNeeded).toBe(true);
    expect(res.instructions.length).toBeGreaterThan(0);
  });
});
