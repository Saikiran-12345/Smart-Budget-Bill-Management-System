import { describe, it, expect } from 'vitest';
import { SubscriptionAuditRuleEngine } from '../math/calculators/subscriptionAuditRuleEngine';

describe('SubscriptionAuditRuleEngine Math', () => {
  it('should detect duplicate subscription categories and calculate savings', () => {
    const res = SubscriptionAuditRuleEngine.auditSubscriptions([
      { id: '1', title: 'Netflix', amount: 649, date: '2026-08-01', category: 'Entertainment', paymentMethod: 'Card', description: '', status: 'COMPLETED', createdAt: '', updatedAt: '' },
      { id: '2', title: 'Amazon Prime', amount: 299, date: '2026-08-01', category: 'Entertainment', paymentMethod: 'Card', description: '', status: 'COMPLETED', createdAt: '', updatedAt: '' },
    ]);

    expect(res.totalSubscriptionsCount).toBe(2);
    expect(res.flaggedSubscriptions[1].isDuplicateCategoryService).toBe(true);
    expect(res.totalPotentialAnnualSavings).toBeGreaterThan(0);
  });
});
