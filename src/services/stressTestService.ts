import { CashFlowStressTestEngine, StressTestScenarioResult } from '../math/calculators/cashFlowStressTestEngine';
import { IncomeService } from './incomeService';
import { ExpenseService } from './expenseService';
import { BillService } from './billService';
import { SavingsService } from './savingsService';
import { calculateTotalIncome } from '../math/incomeMath';
import { calculateTotalExpenses } from '../math/expenseMath';

export class StressTestService {
  public static getStressTestResults(): {
    baselineRunwayMonths: number;
    scenarios: StressTestScenarioResult[];
  } {
    const incomes = IncomeService.getAll();
    const expenses = ExpenseService.getAll();
    const bills = BillService.getAll();
    const goals = SavingsService.getAllGoals();

    const monthlyIncome = calculateTotalIncome(incomes);
    const totalExpenses = calculateTotalExpenses(expenses);
    const debtEMI = bills.filter((b) => b.category === 'Debt Payment').reduce((s, b) => s + b.amount, 0);

    const liquidSavings = goals.reduce((s, g) => s + g.currentAmount, 0);

    return CashFlowStressTestEngine.runStressTests(
      monthlyIncome,
      totalExpenses - debtEMI,
      debtEMI,
      liquidSavings
    );
  }
}
