export interface ChildcareExpensePlan {
  childName: string;
  monthlyDaycareCost: number;
  annualSchoolTuition: number;
  monthlyExtracurricularCost: number;
  annualSchoolSupplies: number;
  totalAnnualChildcareExpense: number;
  monthlyAverageExpense: number;
  taxDeduction80CSectionEstimate: number; // School tuition fee deductible under 80C
}

export class ChildcareEducationExpenseEngine {
  public static calculateChildcareExpenses(
    childName: string,
    monthlyDaycareCost = 8000,
    annualSchoolTuition = 60000,
    monthlyExtracurricularCost = 3000,
    annualSchoolSupplies = 10000
  ): ChildcareExpensePlan {
    const totalDaycare = monthlyDaycareCost * 12;
    const totalExtracurricular = monthlyExtracurricularCost * 12;
    const totalAnnualChildcareExpense = totalDaycare + annualSchoolTuition + totalExtracurricular + annualSchoolSupplies;

    const monthlyAverageExpense = totalAnnualChildcareExpense / 12;
    const taxDeduction80CSectionEstimate = Math.min(150000, annualSchoolTuition);

    return {
      childName,
      monthlyDaycareCost,
      annualSchoolTuition,
      monthlyExtracurricularCost,
      annualSchoolSupplies,
      totalAnnualChildcareExpense: Math.round(totalAnnualChildcareExpense),
      monthlyAverageExpense: Math.round(monthlyAverageExpense),
      taxDeduction80CSectionEstimate,
    };
  }
}
