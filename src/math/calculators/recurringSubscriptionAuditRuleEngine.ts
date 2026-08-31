import { ExpenseItem } from '../../types/expense';

export interface SubscriptionAuditRuleDetail {
  merchantName: string;
  category: string;
  monthlyCost: number;
  annualizedCost: number;
  isDuplicateCategoryService: boolean;
  cancellationRecommendation: string;
  annualSavingsIfCancelled: number;
}

export class RecurringSubscriptionAuditRuleEngine {
  public static auditSubscriptions(expenses: ExpenseItem[]): {
    totalSubscriptionsCount: number;
    totalAnnualizedSpend: number;
    totalPotentialAnnualSavings: number;
    flaggedSubscriptions: SubscriptionAuditRuleDetail[];
  } {
    const subExpenses = expenses.filter(
      (e) =>
        e.category === 'Subscriptions' ||
        e.category === 'Entertainment' ||
        e.title.toLowerCase().includes('netflix') ||
        e.title.toLowerCase().includes('spotify') ||
        e.title.toLowerCase().includes('prime') ||
        e.title.toLowerCase().includes('disney') ||
        e.title.toLowerCase().includes('youtube') ||
        e.title.toLowerCase().includes('gym')
    );

    const categorySeen: Record<string, boolean> = {};
    let totalAnnualizedSpend = 0;
    let totalPotentialAnnualSavings = 0;

    const flaggedSubscriptions: SubscriptionAuditRuleDetail[] = subExpenses.map((e) => {
      const monthlyCost = e.amount;
      const annualizedCost = monthlyCost * 12;
      totalAnnualizedSpend += annualizedCost;

      const isDuplicate = !!categorySeen[e.category];
      categorySeen[e.category] = true;

      let annualSavingsIfCancelled = 0;
      let cancellationRecommendation = 'Active subscription under regular utilization.';

      if (isDuplicate) {
        annualSavingsIfCancelled = annualizedCost;
        totalPotentialAnnualSavings += annualizedCost;
        cancellationRecommendation = `Duplicate ${e.category} subscription detected. Consider consolidating to a single service.`;
      } else if (e.title.toLowerCase().includes('unused') || e.title.toLowerCase().includes('gym')) {
        annualSavingsIfCancelled = annualizedCost;
        totalPotentialAnnualSavings += annualizedCost;
        cancellationRecommendation = 'Low utilization service. Cancel to eliminate recurring overhead.';
      }

      return {
        merchantName: e.title,
        category: e.category,
        monthlyCost,
        annualizedCost,
        isDuplicateCategoryService: isDuplicate,
        cancellationRecommendation,
        annualSavingsIfCancelled,
      };
    });

    return {
      totalSubscriptionsCount: subExpenses.length,
      totalAnnualizedSpend: Math.round(totalAnnualizedSpend),
      totalPotentialAnnualSavings: Math.round(totalPotentialAnnualSavings),
      flaggedSubscriptions,
    };
  }
}
