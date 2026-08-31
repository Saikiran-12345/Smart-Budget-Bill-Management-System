import { ExpenseItem } from '../../types/expense';

export interface SubscriptionItemDetail {
  merchantName: string;
  category: string;
  monthlyCost: number;
  annualizedCost: number;
  detectedFrequency: 'MONTHLY' | 'ANNUAL';
  renewalStatus: 'ACTIVE' | 'UNUSED' | 'CANCEL_RECOMMENDED';
}

export class RecurringSubscriptionTrackerEngine {
  public static trackSubscriptions(expenses: ExpenseItem[]): {
    totalSubscriptionsCount: number;
    totalMonthlySpend: number;
    totalAnnualSpend: number;
    subscriptions: SubscriptionItemDetail[];
  } {
    const subs = expenses.filter(
      (e) =>
        e.category === 'Subscriptions' ||
        e.title.toLowerCase().includes('netflix') ||
        e.title.toLowerCase().includes('spotify') ||
        e.title.toLowerCase().includes('prime') ||
        e.title.toLowerCase().includes('disney') ||
        e.title.toLowerCase().includes('youtube')
    );

    let totalMonthlySpend = 0;

    const subscriptions: SubscriptionItemDetail[] = subs.map((s) => {
      totalMonthlySpend += s.amount;

      let renewalStatus: 'ACTIVE' | 'UNUSED' | 'CANCEL_RECOMMENDED' = 'ACTIVE';
      if (s.title.toLowerCase().includes('unused')) renewalStatus = 'CANCEL_RECOMMENDED';

      return {
        merchantName: s.title,
        category: s.category,
        monthlyCost: Math.round(s.amount),
        annualizedCost: Math.round(s.amount * 12),
        detectedFrequency: 'MONTHLY',
        renewalStatus,
      };
    });

    return {
      totalSubscriptionsCount: subs.length,
      totalMonthlySpend: Math.round(totalMonthlySpend),
      totalAnnualSpend: Math.round(totalMonthlySpend * 12),
      subscriptions,
    };
  }
}
