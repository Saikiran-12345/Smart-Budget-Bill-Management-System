export interface SubscriptionSharingDetail {
  subscriptionName: string;
  totalPlanMonthlyCost: number;
  sharingMembersCount: number;
  individualShareMonthly: number;
  annualSavingsPerMember: number;
}

export class SubscriptionSharerEngine {
  public static calculateSharing(
    subscriptionName: string,
    singleUserPlanCost: number,
    familyPlanCost: number,
    sharingMembersCount: number
  ): SubscriptionSharingDetail {
    const individualShareMonthly = sharingMembersCount > 0 ? familyPlanCost / sharingMembersCount : familyPlanCost;
    const monthlySavings = Math.max(0, singleUserPlanCost - individualShareMonthly);
    const annualSavingsPerMember = monthlySavings * 12;

    return {
      subscriptionName,
      totalPlanMonthlyCost: familyPlanCost,
      sharingMembersCount,
      individualShareMonthly: parseFloat(individualShareMonthly.toFixed(2)),
      annualSavingsPerMember: Math.round(annualSavingsPerMember),
    };
  }
}
