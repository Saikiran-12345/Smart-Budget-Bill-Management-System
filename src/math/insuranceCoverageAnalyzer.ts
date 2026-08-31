export interface InsurancePolicy {
  id: string;
  policyName: string;
  type: 'LIFE' | 'HEALTH' | 'MOTOR' | 'HOME' | 'DISABILITY';
  coverageAmount: number;
  annualPremium: number;
  expiryDate: string;
}

export interface InsuranceGapAnalysis {
  recommendedLifeCover: number;
  currentLifeCover: number;
  lifeCoverGap: number;
  recommendedHealthCover: number;
  currentHealthCover: number;
  healthCoverGap: number;
  isAdequatelyInsured: boolean;
  actionTips: string[];
}

export class InsuranceCoverageAnalyzer {
  public static analyzeCoverage(
    policies: InsurancePolicy[],
    annualIncome: number,
    totalLiabilities: number,
    dependentsCount: number
  ): InsuranceGapAnalysis {
    // Standard Rule of Thumb: Life Cover = 10x Annual Income + Liabilities
    const recommendedLifeCover = Math.round(annualIncome * 10 + totalLiabilities);

    // Standard Health Cover: Minimum ₹10 Lakhs + ₹2 Lakhs per dependent
    const recommendedHealthCover = Math.round(1000000 + dependentsCount * 200000);

    const currentLifeCover = policies
      .filter((p) => p.type === 'LIFE')
      .reduce((s, p) => s + p.coverageAmount, 0);

    const currentHealthCover = policies
      .filter((p) => p.type === 'HEALTH')
      .reduce((s, p) => s + p.coverageAmount, 0);

    const lifeCoverGap = Math.max(0, recommendedLifeCover - currentLifeCover);
    const healthCoverGap = Math.max(0, recommendedHealthCover - currentHealthCover);

    const isAdequatelyInsured = lifeCoverGap === 0 && healthCoverGap === 0;

    const actionTips: string[] = [];
    if (lifeCoverGap > 0) {
      actionTips.push(`Your life insurance cover has a gap of ₹${(lifeCoverGap / 100000).toFixed(1)} Lakhs. Consider taking a term insurance policy.`);
    }
    if (healthCoverGap > 0) {
      actionTips.push(`Your health cover has a shortfall of ₹${(healthCoverGap / 100000).toFixed(1)} Lakhs. Super top-up health plans offer cost-effective coverage.`);
    }
    if (isAdequatelyInsured) {
      actionTips.push('Your insurance portfolio provides robust protection for your family and liabilities.');
    }

    return {
      recommendedLifeCover,
      currentLifeCover,
      lifeCoverGap,
      recommendedHealthCover,
      currentHealthCover,
      healthCoverGap,
      isAdequatelyInsured,
      actionTips,
    };
  }
}
