import { TaxRegimeOptimizerEngine, TaxRegimeComparison } from '../math/calculators/taxRegimeOptimizerEngine';
import { TaxBracketOptimizer, TaxDeductionBreakdown } from '../math/calculators/taxBracketOptimizer';
import { IncomeService } from './incomeService';
import { ExpenseService } from './expenseService';
import { calculateTotalIncome } from '../math/incomeMath';
import { calculateTaxDeductibleExpensesTotal } from '../math/expenseMath';

export class TaxOptimizationService {
  public static getTaxComparison(): TaxRegimeComparison {
    const incomes = IncomeService.getAll();
    const expenses = ExpenseService.getAll();

    const grossAnnual = calculateTotalIncome(incomes);
    const taxDeductible = calculateTaxDeductibleExpensesTotal(expenses);

    return TaxRegimeOptimizerEngine.compareRegimes(
      grossAnnual,
      150000,
      25000,
      taxDeductible,
      50000,
      150000
    );
  }

  public static getDeductionBreakdown(): TaxDeductionBreakdown {
    const expenses = ExpenseService.getAll();
    const taxDeductible = calculateTaxDeductibleExpensesTotal(expenses);

    return TaxBracketOptimizer.calculateDeductionMatrix(
      50000,
      60000,
      20000,
      15000,
      15000,
      30000,
      taxDeductible
    );
  }
}
