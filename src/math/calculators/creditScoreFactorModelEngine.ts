export interface CreditScoreFactorDetail {
  factorTitle: string;
  weightPercent: number;
  currentMetricValue: string;
  pointsEarned: number;
  maxPoints: number;
  recommendation: string;
}

export class CreditScoreFactorModelEngine {
  public static evaluateScore(
    onTimePaymentPct = 100,
    utilizationPct = 25,
    oldestAccountAgeYears = 6,
    hardInquiriesCount = 1
  ): {
    totalCalculatedScore: number;
    factors: CreditScoreFactorDetail[];
  } {
    // 1. Payment History (35% -> 297 pts max)
    const paymentPts = Math.round((onTimePaymentPct / 100) * 297);

    // 2. Credit Utilization (30% -> 255 pts max)
    let utilPts = 255;
    if (utilizationPct > 80) utilPts = 40;
    else if (utilizationPct > 50) utilPts = 120;
    else if (utilizationPct > 30) utilPts = 180;
    else if (utilizationPct > 10) utilPts = 230;

    // 3. Length of Credit History (15% -> 127 pts max)
    const agePts = Math.min(127, Math.round((oldestAccountAgeYears / 10) * 127));

    // 4. Hard Inquiries (20% -> 171 pts max)
    const inqPts = Math.max(50, 171 - hardInquiriesCount * 15);

    const totalCalculatedScore = 300 + Math.min(550, paymentPts + utilPts + agePts + inqPts);

    const factors: CreditScoreFactorDetail[] = [
      {
        factorTitle: 'On-Time Payment Track Record',
        weightPercent: 35,
        currentMetricValue: `${onTimePaymentPct}% On-Time`,
        pointsEarned: paymentPts,
        maxPoints: 297,
        recommendation: 'Maintain 100% prompt bill payments to safeguard score.',
      },
      {
        factorTitle: 'Credit Limit Utilization',
        weightPercent: 30,
        currentMetricValue: `${utilizationPct}% Utilized`,
        pointsEarned: utilPts,
        maxPoints: 255,
        recommendation: 'Keep aggregate credit utilization below 30%.',
      },
      {
        factorTitle: 'Credit History Tenure',
        weightPercent: 15,
        currentMetricValue: `${oldestAccountAgeYears} Years`,
        pointsEarned: agePts,
        maxPoints: 127,
        recommendation: 'Keep your oldest credit card active.',
      },
      {
        factorTitle: 'Recent Hard Credit Inquiries',
        weightPercent: 20,
        currentMetricValue: `${hardInquiriesCount} Inquiries`,
        pointsEarned: inqPts,
        maxPoints: 171,
        recommendation: 'Avoid applying for multiple credit cards in short succession.',
      },
    ];

    return {
      totalCalculatedScore: Math.round(totalCalculatedScore),
      factors,
    };
  }
}
