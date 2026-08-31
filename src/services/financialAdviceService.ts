import { IncomeService } from './incomeService';
import { ExpenseService } from './expenseService';
import { BillService } from './billService';
import { SavingsService } from './savingsService';
import { calculateFinancialHealthScore } from '../math/financialHealthMath';
import { FinancialRatioEngine } from '../math/financialRatioEngine';

export interface AutomatedFinancialAdvice {
  id: string;
  category: 'SAVINGS' | 'BUDGET' | 'BILLS' | 'TAX' | 'DEBT';
  title: string;
  recommendation: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  potentialMonthlySavings?: number;
}

export class FinancialAdviceService {
  public static generateAdvice(): AutomatedFinancialAdvice[] {
    const incomes = IncomeService.getAll();
    const expenses = ExpenseService.getAll();
    const bills = BillService.getAll();
    const goals = SavingsService.getAllGoals();

    const health = calculateFinancialHealthScore(incomes, expenses, bills, goals);
    const adviceList: AutomatedFinancialAdvice[] = [];

    const totalIncome = incomes.reduce((s, i) => s + i.amount, 0);
    const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
    const housingExpenses = expenses.filter((e) => e.category === 'Housing').reduce((s, e) => s + e.amount, 0);
    const debtPayments = bills.filter((b) => b.category === 'Debt Payment').reduce((s, b) => s + b.amount, 0);
    const totalSavings = goals.reduce((s, g) => s + g.currentAmount, 0);

    const ratios = FinancialRatioEngine.calculateRatios(
      totalIncome,
      totalExpenses,
      housingExpenses,
      debtPayments,
      totalSavings,
      totalSavings * 0.5
    );

    if (ratios.savingsToIncomeRatioPercentage < 20) {
      adviceList.push({
        id: 'adv_sav_1',
        category: 'SAVINGS',
        title: 'Boost Monthly Savings Rate',
        recommendation: `Your current savings rate is ${ratios.savingsToIncomeRatioPercentage}%. Increasing savings to 20% would add ₹${Math.round(totalIncome * 0.20 - (totalIncome - totalExpenses))} to your wealth creation every month.`,
        priority: 'HIGH',
        potentialMonthlySavings: Math.round(totalIncome * 0.20 - (totalIncome - totalExpenses)),
      });
    }

    if (ratios.housingCostRatioPercentage > 30) {
      adviceList.push({
        id: 'adv_bud_1',
        category: 'BUDGET',
        title: 'High Housing Overhead',
        recommendation: `Housing expenses consume ${ratios.housingCostRatioPercentage}% of your total income (recommended limit: 30%). Review utility and rent commitments.`,
        priority: 'MEDIUM',
      });
    }

    const overdueBills = bills.filter((b) => b.status === 'OVERDUE');
    if (overdueBills.length > 0) {
      adviceList.push({
        id: 'adv_bill_1',
        category: 'BILLS',
        title: 'Clear Overdue Bills Immediately',
        recommendation: `You have ${overdueBills.length} overdue bill(s). Pay immediately to avoid late payment penalties and protect your credit score.`,
        priority: 'HIGH',
      });
    }

    if (ratios.emergencyFundCoverageMonths < 6) {
      adviceList.push({
        id: 'adv_sav_2',
        category: 'SAVINGS',
        title: 'Expand Emergency Cushion',
        recommendation: `Your emergency liquid reserve covers ${ratios.emergencyFundCoverageMonths} months of living costs. Target 6 full months of runway.`,
        priority: 'HIGH',
      });
    }

    return adviceList;
  }
}
