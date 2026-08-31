export interface SubscriptionSharingSplit {
  serviceTitle: string;
  individualPlanCost: number;
  familyPlanCost: number;
  memberCount: number;
  perMemberShareMonthly: number;
  annualSavingsPerMember: number;
}

export class SubscriptionSharingSplitterEngine {
  public static calculateSplit(
    serviceTitle = 'YouTube Premium Family',
    individualPlanCost = 149,
    familyPlanCost = 299,
    memberCount = 5
  ): SubscriptionSharingSplit {
    const perMemberShareMonthly = memberCount > 0 ? familyPlanCost / memberCount : familyPlanCost;
    const monthlySavings = Math.max(0, individualPlanCost - perMemberShareMonthly);
    const annualSavingsPerMember = monthlySavings * 12;

    return {
      serviceTitle,
      individualPlanCost,
      familyPlanCost,
      memberCount,
      perMemberShareMonthly: parseFloat(perMemberShareMonthly.toFixed(2)),
      annualSavingsPerMember: Math.round(annualSavingsPerMember),
    };
  }
}
