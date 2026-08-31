import { ExpenseItem } from '../types/expense';

export interface SubscriptionAuditItem {
  id: string;
  serviceName: string;
  category: string;
  monthlyCost: number;
  annualizedCost: number;
  usageFrequencyRating: 'HIGH' | 'MEDIUM' | 'UNUSED';
  cancellationSavingsPotential: number;
}

export class SubscriptionAuditEngine {
  public static auditSubscriptions(expenses: ExpenseItem[]): {
    subscriptions: SubscriptionAuditItem[];
    totalMonthlySubscriptionSpend: number;
    totalAnnualizedSubscriptionSpend: number;
    potentialAnnualSavingsIfCancelled: number;
  } {
    const subExpenses = expenses.filter(
      (e) =>
        e.category === 'Subscriptions' ||
        e.category === 'Entertainment' ||
        e.title.toLowerCase().includes('netflix') ||
        e.title.toLowerCase().includes('spotify') ||
        e.title.toLowerCase().includes('prime') ||
        e.title.toLowerCase().includes('cloud')
    );

    let totalMonthly = 0;
    let potentialAnnualSavings = 0;

    const subscriptions: SubscriptionAuditItem[] = subExpenses.map((exp) => {
      const monthlyCost = exp.amount;
      const annualizedCost = monthlyCost * 12;
      totalMonthly += monthlyCost;

      let usageRating: 'HIGH' | 'MEDIUM' | 'UNUSED' = 'MEDIUM';
      if (exp.title.toLowerCase().includes('gym') || exp.title.toLowerCase().includes('unused')) {
        usageRating = 'UNUSED';
        potentialAnnualSavings += annualizedCost;
      } else if (exp.amount > 2000) {
        usageRating = 'HIGH';
      }

      return {
        id: exp.id,
        serviceName: exp.title,
        category: exp.category,
        monthlyCost,
        annualizedCost,
        usageFrequencyRating: usageRating,
        cancellationSavingsPotential: usageRating === 'UNUSED' ? annualizedCost : 0,
      };
    });

    return {
      subscriptions,
      totalMonthlySubscriptionSpend: totalMonthly,
      totalAnnualizedSubscriptionSpend: totalMonthly * 12,
      potentialAnnualSavingsIfCancelled: potentialAnnualSavings,
    };
  }
}
