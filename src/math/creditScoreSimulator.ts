import { BillItem } from '../types/bill';
import { ExpenseItem } from '../types/expense';
import { calculateBillPaymentCompletionRate } from './billMath';

export interface CreditScoreSimulationResult {
  estimatedScore: number; // 300 to 850
  creditGrade: 'EXCELLENT' | 'VERY_GOOD' | 'GOOD' | 'FAIR' | 'POOR';
  utilizationRatioPercentage: number;
  onTimePaymentPercentage: number;
  scoreFactors: {
    paymentHistoryScore: number; // max 35% (297 pts)
    creditUtilizationScore: number; // max 30% (255 pts)
    creditLengthScore: number; // max 15% (127 pts)
    mixAndInquiriesScore: number; // max 20% (171 pts)
  };
  improvementTips: string[];
}

export class CreditScoreSimulator {
  public static simulateScore(
    bills: BillItem[],
    expenses: ExpenseItem[],
    creditLimit = 150000
  ): CreditScoreSimulationResult {
    // 1. Payment History (35%)
    const billMetrics = calculateBillPaymentCompletionRate(bills);
    const onTimePaymentPercentage = billMetrics.completionPercentage;
    const paymentHistoryScore = Math.round((onTimePaymentPercentage / 100) * 297);

    // 2. Credit Utilization (30%)
    const creditCardExpenses = expenses.filter((e) => e.paymentMethod === 'Credit Card');
    const totalCreditCardSpent = creditCardExpenses.reduce((s, e) => s + e.amount, 0);
    const utilizationRatioPercentage = creditLimit > 0 ? (totalCreditCardSpent / creditLimit) * 100 : 0;

    let creditUtilizationScore = 255;
    if (utilizationRatioPercentage > 80) creditUtilizationScore = 50;
    else if (utilizationRatioPercentage > 50) creditUtilizationScore = 120;
    else if (utilizationRatioPercentage > 30) creditUtilizationScore = 190;
    else if (utilizationRatioPercentage > 10) creditUtilizationScore = 240;

    // 3. Length of Credit History & Mix (35%)
    const creditLengthScore = 110;
    const mixAndInquiriesScore = 150;

    const totalRawScore = 300 + Math.min(550, paymentHistoryScore + creditUtilizationScore + creditLengthScore + mixAndInquiriesScore);
    const estimatedScore = Math.round(totalRawScore);

    let creditGrade: 'EXCELLENT' | 'VERY_GOOD' | 'GOOD' | 'FAIR' | 'POOR' = 'GOOD';
    if (estimatedScore >= 780) creditGrade = 'EXCELLENT';
    else if (estimatedScore >= 720) creditGrade = 'VERY_GOOD';
    else if (estimatedScore >= 660) creditGrade = 'GOOD';
    else if (estimatedScore >= 600) creditGrade = 'FAIR';
    else creditGrade = 'POOR';

    const improvementTips: string[] = [];
    if (utilizationRatioPercentage > 30) {
      improvementTips.push(`Your credit card utilization is ${utilizationRatioPercentage.toFixed(1)}%. Keep it below 30% to improve score.`);
    }
    if (billMetrics.overdueCount > 0) {
      improvementTips.push(`Clear ${billMetrics.overdueCount} overdue bills to prevent negative score hits.`);
    }
    if (improvementTips.length === 0) {
      improvementTips.push('Your credit behavior is exemplary! Maintain timely payments and low balance utilization.');
    }

    return {
      estimatedScore,
      creditGrade,
      utilizationRatioPercentage: parseFloat(utilizationRatioPercentage.toFixed(1)),
      onTimePaymentPercentage: parseFloat(onTimePaymentPercentage.toFixed(1)),
      scoreFactors: {
        paymentHistoryScore,
        creditUtilizationScore,
        creditLengthScore,
        mixAndInquiriesScore,
      },
      improvementTips,
    };
  }
}
