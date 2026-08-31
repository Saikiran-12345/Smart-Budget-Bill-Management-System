import { TaxSlabCalculator, DetailedTaxComparison } from '../math/taxSlabCalculator';
import { TaxOptimizationEngine, TaxOptimizationSuggestions } from '../math/taxOptimizationEngine';
import { IncomeService } from './incomeService';
import { ExpenseService } from './expenseService';
import { calculateTotalIncome } from '../math/incomeMath';
import { calculateTaxDeductibleExpensesTotal } from '../math/expenseMath';

export class TaxService {
  public static getTaxComparisonForCurrentUser(): DetailedTaxComparison {
    const incomes = IncomeService.getAll();
    const expenses = ExpenseService.getAll();

    const grossIncome = calculateTotalIncome(incomes);
    const taxDeductibleExpenses = calculateTaxDeductibleExpensesTotal(expenses);

    return TaxSlabCalculator.compareTaxRegimes(
      grossIncome,
      150000,
      25000,
      taxDeductibleExpenses,
      50000
    );
  }

  public static getTaxOptimizationHeadroom(): TaxOptimizationSuggestions {
    const incomes = IncomeService.getAll();
    const expenses = ExpenseService.getAll();

    const grossIncome = calculateTotalIncome(incomes);
    const taxDeductibleExpenses = calculateTaxDeductibleExpensesTotal(expenses);

    return TaxOptimizationEngine.calculateTaxOptimizationHeadroom(
      50000,
      30000,
      20000,
      15000,
      taxDeductibleExpenses,
      grossIncome * 0.5
    );
  }
}
