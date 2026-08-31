import { IncomeItem, IncomeCategorySummary, IncomeCategoryType } from '../types/income';

export const calculateTotalIncome = (incomes: IncomeItem[]): number => {
  return incomes.reduce((sum, item) => sum + (item.amount || 0), 0);
};

export const filterIncomesByDateRange = (
  incomes: IncomeItem[],
  startDate: string,
  endDate: string
): IncomeItem[] => {
  return incomes.filter((item) => {
    if (!item.date) return false;
    return item.date >= startDate && item.date <= endDate;
  });
};

export const calculateIncomeCategorySummaries = (incomes: IncomeItem[]): IncomeCategorySummary[] => {
  const total = calculateTotalIncome(incomes);
  const categoryMap: Record<string, { totalAmount: number; count: number }> = {};

  incomes.forEach((item) => {
    const cat = item.category || 'Other';
    if (!categoryMap[cat]) {
      categoryMap[cat] = { totalAmount: 0, count: 0 };
    }
    categoryMap[cat].totalAmount += item.amount;
    categoryMap[cat].count += 1;
  });

  return Object.entries(categoryMap).map(([category, data]) => ({
    category: category as IncomeCategoryType,
    totalAmount: data.totalAmount,
    count: data.count,
    percentage: total > 0 ? (data.totalAmount / total) * 100 : 0,
    averageAmount: data.count > 0 ? data.totalAmount / data.count : 0,
  })).sort((a, b) => b.totalAmount - a.totalAmount);
};

export const calculateMonthlyIncomeTrend = (
  incomes: IncomeItem[],
  year: number
): { monthName: string; month: number; totalAmount: number; count: number }[] => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  return months.map((monthName, idx) => {
    const monthNumber = idx + 1;
    const monthStr = String(monthNumber).padStart(2, '0');
    const prefix = `${year}-${monthStr}`;

    const monthIncomes = incomes.filter((inc) => inc.date && inc.date.startsWith(prefix));
    const totalAmount = monthIncomes.reduce((acc, curr) => acc + curr.amount, 0);

    return {
      monthName,
      month: monthNumber,
      totalAmount,
      count: monthIncomes.length,
    };
  });
};

export const calculateProjectedAnnualIncome = (incomes: IncomeItem[]): number => {
  const recurringIncomes = incomes.filter((inc) => inc.isRecurring && inc.status === 'RECEIVED');
  let annualProjected = 0;

  recurringIncomes.forEach((inc) => {
    switch (inc.frequency) {
      case 'MONTHLY':
        annualProjected += inc.amount * 12;
        break;
      case 'QUARTERLY':
        annualProjected += inc.amount * 4;
        break;
      case 'WEEKLY':
        annualProjected += inc.amount * 52;
        break;
      case 'YEARLY':
        annualProjected += inc.amount;
        break;
      default:
        annualProjected += inc.amount;
    }
  });

  return annualProjected;
};
