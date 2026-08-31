import { ExpenseItem } from '../types/expense';
import { IncomeItem } from '../types/income';

export interface Expense503020Breakdown {
  totalIncome: number;
  needsAmount: number; // 50% Needs
  needsPercentage: number;
  wantsAmount: number; // 30% Wants
  wantsPercentage: number;
  savingsAmount: number; // 20% Savings
  savingsPercentage: number;
  is503020Balanced: boolean;
  recommendations: string[];
}

export class ExpenseRatioAnalyzer {
  public static analyze503020Rule(
    incomes: IncomeItem[],
    expenses: ExpenseItem[]
  ): Expense503020Breakdown {
    const totalIncome = incomes.reduce((s, i) => s + i.amount, 0);

    const needsCategories = ['Housing', 'Utilities', 'Healthcare', 'Food', 'Debt Payment', 'Insurance'];
    const wantsCategories = ['Shopping', 'Entertainment', 'Subscriptions', 'Travel', 'Personal Care', 'Other'];

    let needsAmount = 0;
    let wantsAmount = 0;

    expenses.forEach((e) => {
      if (needsCategories.includes(e.category)) {
        needsAmount += e.amount;
      } else {
        wantsAmount += e.amount;
      }
    });

    const savingsAmount = Math.max(0, totalIncome - (needsAmount + wantsAmount));

    const needsPercentage = totalIncome > 0 ? parseFloat(((needsAmount / totalIncome) * 100).toFixed(1)) : 0;
    const wantsPercentage = totalIncome > 0 ? parseFloat(((wantsAmount / totalIncome) * 100).toFixed(1)) : 0;
    const savingsPercentage = totalIncome > 0 ? parseFloat(((savingsAmount / totalIncome) * 100).toFixed(1)) : 0;

    const is503020Balanced = needsPercentage <= 55 && wantsPercentage <= 35 && savingsPercentage >= 20;

    const recommendations: string[] = [];
    if (needsPercentage > 50) {
      recommendations.push(`Essential Needs expenses consume ${needsPercentage}% of income (ideal: <= 50%). Review fixed bills.`);
    }
    if (wantsPercentage > 30) {
      recommendations.push(`Discretionary Wants consume ${wantsPercentage}% of income (ideal: <= 30%). Trim shopping & entertainment.`);
    }
    if (savingsPercentage < 20) {
      recommendations.push(`Savings rate is ${savingsPercentage}% (ideal: >= 20%). Automate savings at beginning of month.`);
    }
    if (recommendations.length === 0) {
      recommendations.push('Your 50/30/20 budget ratio is perfectly balanced!');
    }

    return {
      totalIncome,
      needsAmount,
      needsPercentage,
      wantsAmount,
      wantsPercentage,
      savingsAmount,
      savingsPercentage,
      is503020Balanced,
      recommendations,
    };
  }
}
