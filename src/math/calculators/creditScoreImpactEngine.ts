export interface CreditScoreImpactFactor {
  factorName: string;
  weightPercentage: number;
  currentValueText: string;
  impactScorePoints: number;
  recommendationText: string;
}

export class CreditScoreImpactEngine {
  public static evaluateScoreFactors(
    onTimePaymentPercentage: number,
    creditUtilizationPercentage: number,
    oldestAccountAgeYears: number,
    hardInquiriesCount: number
  ): {
    totalEstimatedScore: number; // 300 - 850
    factors: CreditScoreImpactFactor[];
  } {
    // 1. Payment History (35% -> 297 pts max)
    const paymentPoints = Math.round((onTimePaymentPercentage / 100) * 297);

    // 2. Credit Utilization (30% -> 255 pts max)
    let utilPoints = 255;
    if (creditUtilizationPercentage > 80) utilPoints = 40;
    else if (creditUtilizationPercentage > 50) utilPoints = 120;
    else if (creditUtilizationPercentage > 30) utilPoints = 180;
    else if (creditUtilizationPercentage > 10) utilPoints = 230;

    // 3. Length of Credit History (15% -> 127 pts max)
    const agePoints = Math.min(127, Math.round((oldestAccountAgeYears / 10) * 127));

    // 4. Credit Mix & Inquiries (20% -> 171 pts max)
    const inquiryDeduction = hardInquiriesCount * 15;
    const mixPoints = Math.max(50, 171 - inquiryDeduction);

    const totalEstimatedScore = 300 + Math.min(550, paymentPoints + utilPoints + agePoints + mixPoints);

    const factors: CreditScoreImpactFactor[] = [
      {
        factorName: 'Payment History',
        weightPercentage: 35,
        currentValueText: `${onTimePaymentPercentage}% On-Time`,
        impactScorePoints: paymentPoints,
        recommendationText: 'Maintain 100% on-time bill payments to maximize score.',
      },
      {
        factorName: 'Credit Utilization',
        weightPercentage: 30,
        currentValueText: `${creditUtilizationPercentage}% Utilized`,
        impactScorePoints: utilPoints,
        recommendationText: 'Keep credit utilization below 30% across all active cards.',
      },
      {
        factorName: 'Credit History Length',
        weightPercentage: 15,
        currentValueText: `${oldestAccountAgeYears} Years`,
        impactScorePoints: agePoints,
        recommendationText: 'Keep your oldest credit account open to preserve history length.',
      },
      {
        factorName: 'Recent Inquiries',
        weightPercentage: 20,
        currentValueText: `${hardInquiriesCount} Hard Inquiries`,
        impactScorePoints: mixPoints,
        recommendationText: 'Avoid applying for multiple new credit cards within short windows.',
      },
    ];

    return {
      totalEstimatedScore: Math.round(totalEstimatedScore),
      factors,
    };
  }
}
